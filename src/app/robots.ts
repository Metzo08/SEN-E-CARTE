import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/super-admin", "/app/prospection-ia"],
    },
    sitemap: "https://www.senecarte.com/sitemap.xml",
    host: "https://www.senecarte.com",
  };
}
