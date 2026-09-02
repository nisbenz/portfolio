import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  contentHtml: string;
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypePrettyCode, {
    theme: { light: "github-light", dark: "github-dark" },
    keepBackground: false,
  })
  .use(rehypeStringify, { allowDangerousHtml: true });

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

async function readPost(slug: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const frontmatter = data as {
    title?: unknown;
    date?: unknown;
    description?: unknown;
    tags?: unknown;
  };

  const processed = await processor.process(content);

  return {
    slug,
    title: String(frontmatter.title ?? slug),
    date: normalizeDate(frontmatter.date),
    description: String(frontmatter.description ?? ""),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
    contentHtml: processed.toString(),
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await readPost(slug);
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => readPost(slug)));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
