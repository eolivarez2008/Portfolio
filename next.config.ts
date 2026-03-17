import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://umami.eolivarez.site https://static.cloudflareinsights.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self' https://umami.eolivarez.site https://challenges.cloudflare.com",
            "frame-src 'self' blob: https://challenges.cloudflare.com",
            "object-src 'self' data: blob:",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
