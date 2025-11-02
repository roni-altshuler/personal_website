'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './contact.module.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const token = recaptchaRef.current.getValue();
    if (!token) {
        setStatus('Please verify you are not a robot.');
        return;
    }

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, token }),
    });

    recaptchaRef.current.reset();

    if (res.ok) {
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      const data = await res.json();
      setStatus(data.error || 'Failed to send message. Please try again later.');
    }
  };

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>Contact Me</h1>
        {siteKey ? (
          <>
            <p>Have a question or want to work together? Fill out the form below.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required></textarea>
              </div>
              
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                theme="dark" // Using dark theme to match the website
              />

              <button type="submit" className={styles.button} disabled={status === 'Sending...'}>
                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
              </button>
              {status && <p className={styles.statusMessage}>{status}</p>}
            </form>
          </>
        ) : (
          <p>The contact form is currently unavailable. Please try again later.</p>
        )}
      </section>
    </div>
  );

}
