import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Devicon skill icons are served from jsDelivr.
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
