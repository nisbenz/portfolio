import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { editUrlForPost, siteConfig } from "@/config";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </p>
      </header>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <footer className="post-footer">
        <Link href="/blog/">← all posts</Link>
        <span aria-hidden="true"> · </span>
        <a href={editUrlForPost(post.slug)} target="_blank" rel="noreferrer">
          fix typo
        </a>
      </footer>
    </article>
  );
}
