import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  async redirects() {
    return [
      { source: "/education", destination: "/research", permanent: true },
      { source: "/experience", destination: "/research", permanent: true },
      { source: "/projects", destination: "/build", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
