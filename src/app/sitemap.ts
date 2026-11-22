import type { MetadataRoute } from "next";
import { SOLUTIONS, INITIAL_DEMO_CARDS } from "@/data/senecarteData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.senecarte.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/realisations`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/commander`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/portail-ipm`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tarifs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/app`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const demoCardRoutes: MetadataRoute.Sitemap = INITIAL_DEMO_CARDS.map((c) => ({
    url: `${baseUrl}/c/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...solutionRoutes, ...demoCardRoutes];
}
