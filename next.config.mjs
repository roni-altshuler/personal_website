import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  async redirects() {
    return [
      // Phase 3.5 IA: Research split into Education + Work Experience,
      // /build renamed to /projects, /cv renamed to /resume.
      { source: "/research", destination: "/work-experience", permanent: true },
      { source: "/research/:slug", destination: "/work-experience/:slug", permanent: true },
      { source: "/experience", destination: "/work-experience", permanent: true },
      { source: "/build", destination: "/projects", permanent: true },
      { source: "/cv", destination: "/resume", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
