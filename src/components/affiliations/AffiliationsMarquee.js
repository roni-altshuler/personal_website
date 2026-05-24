"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

/*
 * AffiliationsMarquee — institutional logo cloud, marquee on desktop,
 * static grid on reduced-motion. Logos live on a soft off-white tile
 * (Linear style) so their baked-in white backgrounds don't punch out
 * of the canvas. CSS animation defined in tailwind.config.js (`animate-marquee`).
 */

const AFFILIATIONS = [
  { name: "Technion", src: "/logo/Technion_logo.svg", w: 120, h: 40 },
  { name: "CZ Biohub", src: "/logo/CZ-Biohub-SF-Color-RGB.png", w: 132, h: 40 },
  { name: "UCSC Baskin Engineering", src: "/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg", w: 200, h: 40 },
  { name: "CRISPR Therapeutics", src: "/logo/CRISPR Therapeutics_idsoX7FvVl_1.svg", w: 160, h: 32 },
  { name: "UCSC Genomics Institute", src: "/logo/GenomicsInstitute.png", w: 140, h: 40 },
];

function LogoTile({ logo }) {
  return (
    <div className="flex h-14 shrink-0 items-center justify-center rounded-md border border-hairline bg-[#f5f6f6] px-6 py-2 md:h-16 md:px-8">
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.w}
        height={logo.h}
        className="h-7 w-auto object-contain opacity-90 md:h-9"
      />
    </div>
  );
}

export default function AffiliationsMarquee() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="grid grid-cols-2 items-center gap-3 md:grid-cols-5">
        {AFFILIATIONS.map((l) => (
          <LogoTile key={l.name} logo={l} />
        ))}
      </div>
    );
  }

  // Duplicate the list so the keyframe (translateX 0 → -50%) loops seamlessly.
  const doubled = [...AFFILIATIONS, ...AFFILIATIONS];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max gap-4 animate-marquee md:gap-6">
        {doubled.map((l, i) => (
          <LogoTile key={`${l.name}-${i}`} logo={l} />
        ))}
      </div>
    </div>
  );
}
