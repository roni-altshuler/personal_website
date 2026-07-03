'use client';

import dynamic from 'next/dynamic';

// Swap the imported module to change the ambient background. NetworkField is the
// current signature background; ./ParticleField (the earlier violet wave) is
// preserved for rollback/A-B.
const NetworkField = dynamic(() => import('./NetworkField'), { ssr: false });

export default function ParticleFieldLoader() {
  return <NetworkField />;
}
