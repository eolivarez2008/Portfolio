import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",

  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.jsdelivr.net" }],
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
            "connect-src 'self' https://umami.eolivarez.site https://challenges.cloudflare.com https://status.eolivarez.site",
            "frame-src 'self' blob: https://challenges.cloudflare.com",
            "object-src 'self' data: blob:",
            "worker-src 'self' blob:",
          ].join("; "),
        },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=()",
        },
      ],
    },
    {
      source: "/_next/static/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/Bulletins/:path*",
      headers: [
        { key: "Content-Type", value: "application/pdf" },
        { key: "X-Robots-Tag", value: "noindex" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    },
    {
      source: "/:file(.*\\.pdf)",
      headers: [
        { key: "Content-Type", value: "application/pdf" },
        { key: "X-Robots-Tag", value: "noindex" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    },
  ],
};

export default nextConfig;
