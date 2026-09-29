import { fileURLToPath } from 'node:url';
/** @type {import('next').NextConfig} */
const localPreviewHost = '(?:localhost|127\\.0\\.0\\.1)(?::[0-9]+)?';
const nextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  async redirects() {
    return [
      { source: "/work-experience", destination: "/research", permanent: true },
      { source: "/experience", destination: "/research", permanent: true },
      { source: "/education", destination: "/about#education", permanent: true },
      { source: "/skills", destination: "/about#skills", permanent: true },
      { source: "/build", destination: "/projects", permanent: true },
    ];
  },
  async headers() {
    const commonPolicy = "object-src 'none'; base-uri 'self'";
    return [
      { source: '/(.*)', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ] },
      { source: '/(.*)', missing: [{ type: 'host', value: localPreviewHost }], headers: [
        { key: 'Content-Security-Policy', value: `frame-ancestors 'none'; ${commonPolicy}` },
      ] },
      // Permit local editor previews without changing public-site framing rules.
      { source: '/(.*)', has: [{ type: 'host', value: localPreviewHost }], headers: [
        { key: 'Content-Security-Policy', value: `frame-ancestors 'self' vscode-webview: https://*.vscode-cdn.net; ${commonPolicy}` },
      ] },
    ];
  },
};
export default nextConfig;
