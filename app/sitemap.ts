import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ansoredu.uz";

  const routes = [
    "",
    "/about",
    "/services",
    "/universities",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // In production, you would fetch all dynamic paths from DB too:
  // const unis = await getUnis();
  // const uniRoutes = unis.map(u => ({ url: `${baseUrl}/universities/${u.slug}`, ... }));

  return routes;
}
