import type { NextConfig } from "next";

/**
 * Build config used only to verify a change without disturbing a running
 * `next dev`. `next build` writes to the same `.next` the dev server is
 * serving from, which 500s every open route; pointing `distDir` somewhere else
 * keeps the two apart. Overridable so the same file can serve a normal build.
 */
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
