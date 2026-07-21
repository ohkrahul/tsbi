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
  // Serve AVIF (then WebP) from next/image — much smaller than the source JPEG/PNG/WebP.
  // remotePatterns lets us run the YouTube case-study thumbnails through the optimizer too.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

export default nextConfig;
