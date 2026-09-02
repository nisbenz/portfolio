import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return [
    { url: `${siteConfig.siteUrl}/` },
    { url: `${siteConfig.siteUrl}/blog/` },
    { url: `${siteConfig.siteUrl}/projects/` },
    { url: `${siteConfig.siteUrl}/about/` },
    ...posts.map((post) => ({
      url: `${siteConfig.siteUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
    })),
  ];
}
