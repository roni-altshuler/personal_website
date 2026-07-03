import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { NAME, ROLE, SITE_URL } from "../../data/site";

// Read a font as raw bytes from src/app/_fonts. We read from disk (rather than
// `fetch(new URL(..., import.meta.url))`) because webpack rewrites that pattern
// to a relative /_next/static asset path that Node's fetch can't resolve during
// static prerender — it only works on the Edge runtime. Reading from cwd keeps
// these images statically generated at build time on the Node runtime.
const FONT_DIR = join(process.cwd(), "src", "app", "_fonts");
export function readFont(file) {
  return readFile(join(FONT_DIR, file));
}

// Shared renderer for the dynamic Open Graph / Twitter social card. Both
// app/opengraph-image.js and app/twitter-image.js delegate here so the 1200×630
// card stays identical across platforms and lives in one place.
//
// Constraints (Satori, behind next/og's ImageResponse):
//  - CSS subset only: flexbox yes, grid no; every element with >1 child needs
//    display:flex. No `background-clip: text` reliance — the name renders in a
//    solid token color with a violet ombre rule beneath instead.
//  - Fonts must be raw bytes (not next/font). We ship WOFF (Satori does not read
//    WOFF2) and load them via `new URL(..., import.meta.url)` so Next traces them.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${NAME} · ${ROLE}`;

const DOMAIN = SITE_URL.replace(/^https?:\/\//, "");

// Abstract node/network motif — evokes a gene/protein interaction graph without
// being any real data. Hand-placed nodes + nearest-neighbour edges in a 600 box.
const NODES = [
  [90, 110], [210, 70], [150, 200], [280, 150], [340, 70],
  [70, 250], [200, 300], [300, 250], [400, 180], [360, 320],
  [470, 110], [500, 270], [270, 400], [410, 410], [520, 400],
];
const EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [0, 5], [5, 6], [2, 6],
  [6, 7], [3, 7], [7, 8], [4, 8], [8, 10], [8, 9], [9, 11], [7, 12],
  [9, 13], [12, 13], [11, 14], [13, 14], [10, 11], [6, 12],
];

function motifDataUri() {
  const lines = EDGES.map(([a, b]) => {
    const [x1, y1] = NODES[a];
    const [x2, y2] = NODES[b];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#a78bfa" stroke-width="1.4" stroke-opacity="0.35" />`;
  }).join("");
  const dots = NODES.map(([x, y], i) => {
    const r = 3 + (i % 3) * 2;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#a78bfa" fill-opacity="0.9" />`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">${lines}${dots}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

async function loadFonts() {
  const [regular, semibold, bold] = await Promise.all([
    readFont("Inter-Regular.woff"),
    readFont("Inter-SemiBold.woff"),
    readFont("Inter-Bold.woff"),
  ]);
  return [
    { name: "Inter", data: regular, weight: 400, style: "normal" },
    { name: "Inter", data: semibold, weight: 600, style: "normal" },
    { name: "Inter", data: bold, weight: 700, style: "normal" },
  ];
}

export async function renderOgImage() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#010102",
          backgroundImage:
            "radial-gradient(1100px 620px at 82% 12%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(760px 520px at 6% 104%, rgba(167,139,250,0.14), transparent 55%)",
          padding: 80,
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori (next/og) requires a plain <img>; next/image is unavailable here */}
        <img
          alt=""
          width={620}
          height={620}
          src={motifDataUri()}
          style={{ position: "absolute", top: -70, right: -110 }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#8a8f98",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: "#a78bfa" }} />
          <div>PhD · Ron-Harel Lab · Technion</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: "#f7f8f8",
              lineHeight: 1.0,
              letterSpacing: -4,
            }}
          >
            {NAME}
          </div>
          <div
            style={{
              marginTop: 26,
              width: 132,
              height: 7,
              borderRadius: 4,
              backgroundImage: "linear-gradient(90deg, #c4b5fd 0%, #7c3aed 100%)",
            }}
          />
          <div
            style={{
              marginTop: 26,
              fontSize: 42,
              fontWeight: 500,
              color: "#d0d6e0",
              letterSpacing: -0.5,
              maxWidth: 760,
            }}
          >
            Building tools where biology meets code
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 500, color: "#8a8f98" }}>{ROLE}</div>
          <div style={{ fontSize: 26, fontWeight: 500, color: "#62666d" }}>{DOMAIN}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
