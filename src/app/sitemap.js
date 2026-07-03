import { SITE_URL } from "../data/site";

// The six real routes. Redirect sources (/research, /experience, /build, /cv)
// are deliberately excluded — they 301 elsewhere and shouldn't be indexed.
const PATHS = ["", "/education", "/work-experience", "/projects", "/skills", "/contact"];

export default function sitemap() {
  const lastModified = new Date();
  return PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
