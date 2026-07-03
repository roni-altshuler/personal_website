import { ImageResponse } from "next/og";
import { readFont } from "./_og/renderOg";

// Apple touch icon (home-screen). Same violet-ombre "R" mark, sized for iOS
// with a filled background (Apple masks its own rounded corners).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "Inter",
        }}
      >
        R
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: bold, weight: 700, style: "normal" }] }
  );
}
