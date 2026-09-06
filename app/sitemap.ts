import type { MetadataRoute } from "next";
import { profile } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/now"];

  return routes.map((route) => ({
    url: `${profile.siteUrl}${route}`,
    lastModified: new Date("2026-09-06"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
