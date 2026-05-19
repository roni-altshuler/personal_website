import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RECAPTCHA_MIN_SCORE = 0.5;

const rateLimitBuckets = new Map();

function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }
  bucket.count += 1;
  rateLimitBuckets.set(ip, bucket);
  return bucket.count <= RATE_LIMIT_MAX;
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  if (!token) return { ok: false, reason: 'missing-token' };

  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = await res.json();
  if (!data.success) return { ok: false, reason: 'failed' };
  if (typeof data.score === 'number' && data.score < RECAPTCHA_MIN_SCORE) {
    return { ok: false, reason: 'low-score' };
  }
  return { ok: true };
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429 }
      );
    }

    const { name, email, message, recaptchaToken } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
    }

    const captcha = await verifyRecaptcha(recaptchaToken);
    if (!captcha.ok) {
      return new Response(
        JSON.stringify({ error: 'reCAPTCHA verification failed. Please try again.' }),
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['roni.altshuler@gmail.com'],
      subject: `New Message from ${name} via Personal Website`,
      reply_to: email,
      html: `<p>You have a new message from:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
