'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function TrackOnMount({ event, data }) {
  useEffect(() => {
    track(event, data);
  }, [event, data]);
  return null;
}
