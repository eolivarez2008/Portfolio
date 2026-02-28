import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/private/"],
      crawlDelay: 1,
    },
    sitemap: "https://eolivarez.site/sitemap.xml",
  };
}
