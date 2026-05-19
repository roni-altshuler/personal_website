'use client';

import { track } from '@vercel/analytics';

export default function ResumeDownloadLink({ href, className, children }) {
  return (
    <a
      href={href}
      download
      rel="noopener"
      className={className}
      onClick={() => track('resume_download')}
    >
      {children}
    </a>
  );
}
