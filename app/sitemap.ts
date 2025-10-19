import type { MetadataRoute } from "next"

import projects from "@/data/projects.json"

const siteUrl = "https://prashant.sbs"

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedAt = process.env.SITE_PUBLISHED_AT
    ? new Date(process.env.SITE_PUBLISHED_AT)
    : new Date()
  const fourteenDays = 1000 * 60 * 60 * 24 * 14
  const now = new Date()
  const changeFrequency: "daily" | "weekly" =
    now.getTime() - publishedAt.getTime() <= fourteenDays ? "daily" : "weekly"

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency,
      priority: 1,
    },
    ...projects.featured.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency,
      priority: 0.8,
    })),
  ]

  return routes
}
