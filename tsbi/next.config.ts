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
  // Bare hostnames only — NOT full URLs (no protocol/port), or they won't match.
  allowedDevOrigins: ['192.168.1.2', 'localhost'],
};

export default nextConfig;
