import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.instagram.com https://instagram.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
