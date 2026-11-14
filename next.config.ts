import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostname selain localhost yang boleh mengakses dev server (hanya hostname, tanpa http:// dan port).
  allowedDevOrigins: ["localhost.com"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
