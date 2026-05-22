/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old IA → current IA, preserved so existing inbound links resolve.
      { source: "/research", destination: "/work-experience", permanent: true },
      { source: "/experience", destination: "/work-experience", permanent: true },
      { source: "/build", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
