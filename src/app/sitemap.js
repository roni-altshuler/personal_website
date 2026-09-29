import { SITE_URL } from "../data/site";
export default function sitemap() {
  return ["", "/research", "/projects", "/about", "/contact"].map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
