import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "./_og/renderOg";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = OG_ALT;

export default async function OpengraphImage() {
  return renderOgImage();
}
