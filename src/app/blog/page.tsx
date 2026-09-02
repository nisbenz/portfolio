import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>blog</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <time dateTime={post.date}>[{post.date}]</time>
            <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
