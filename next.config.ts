import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aptsalt-landing",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
