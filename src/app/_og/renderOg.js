import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { NAME, ROLE, SITE_URL } from "../../data/site";
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${NAME} · ${ROLE} · PhD student, Technion`;
export async function renderOgImage() {
  const font = await readFile(join(process.cwd(), "src/app/_fonts/Inter-Regular.woff"));
  const bold = await readFile(join(process.cwd(), "src/app/_fonts/Inter-SemiBold.woff"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", padding: 76, background: "#ffffff", color: "#0b0d12", display: "flex", flexDirection: "column", fontFamily: "Inter", justifyContent: "space-between" }}>
      <div style={{ color: "#2454ff", fontSize: 24, letterSpacing: 2 }}>PHD STUDENT · RON-HAREL LAB · TECHNION</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 86, fontWeight: 600, letterSpacing: -3 }}>{NAME}</div><div style={{ fontSize: 38, marginTop: 24, color: "#2454ff" }}>Experimental Biology & Computation</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, color: "#505663", borderTop: "1px solid #e1e4eb", paddingTop: 24 }}><div>{ROLE}</div><div>{SITE_URL.replace("https://www.", "")}</div></div>
    </div>, { ...OG_SIZE, fonts: [{ name: "Inter", data: font, weight: 400 }, { name: "Inter", data: bold, weight: 600 }] }
  );
}
