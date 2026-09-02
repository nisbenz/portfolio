const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteConfig = {
  name: "Mohamed Anis Ben Azza",
  handle: "nisbenz",
  description:
    "4th-year CS undergraduate at USTHB (Algiers) specializing in AI. I build things from scratch — deep learning libraries, transformers, inference engines — and write about how they work.",
  email: "nisbenz.pro@gmail.com",
  github: "https://github.com/nisbenz",
  linkedin: "https://www.linkedin.com/in/mohamed-anis-ben-azza-a51760359/",
  repo: "https://github.com/nisbenz/portfolio",
  repoBranch: "main",
  siteUrl: "https://nisbenz.github.io/portfolio",
  basePath,
  rssPath: `${basePath}/rss.xml`,
};

export function editUrlForPost(slug: string): string {
  return `${siteConfig.repo}/edit/${siteConfig.repoBranch}/content/posts/${slug}.md`;
}
