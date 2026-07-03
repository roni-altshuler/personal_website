import { ImageResponse } from "next/og";
import { readFont } from "./_og/renderOg";

// Programmatic favicon: a violet-ombre rounded square with a white "R",
// echoing the footer brand mark. No binary asset to maintain.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const bold = await readFont("Inter-Bold.woff");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
          color: "#ffffff",
          fontSize: 46,
          fontWeight: 700,
          fontFamily: "Inter",
          borderRadius: 14,
        }}
      >
        R
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: bold, weight: 700, style: "normal" }] }
  );
}
