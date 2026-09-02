import Link from "next/link";
import { siteConfig } from "@/config";
import { getAllPosts } from "@/lib/posts";

const RECENT_COUNT = 5;

const selectedWork = [
  {
    name: "TensorLib",
    url: "https://github.com/nisbenz/TensorLib",
    desc: "A from-scratch, pure-C deep learning library for CPU-only training — autograd, SIMD matmul, GPT-style decoder.",
  },
  {
    name: "mAIcro",
    url: "https://github.com/MicroClub-USTHB/mAIcro",
    desc: "Open-source AI knowledge-management service for communities: RAG with hybrid search, built with my club.",
  },
  {
    name: "GPT-2 Inference Engine",
    url: "https://github.com/nisbenz/GPT-2-Inference-Engine",
    desc: "Pure C++ GPT-2 inference on ggml with CUDA acceleration and dynamic sampling.",
  },
];

export default async function Home() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, RECENT_COUNT);

  return (
    <div>
      <section className="intro">
        <p className="prompt">$ whoami</p>
        <h1>Mohamed Anis Ben Azza</h1>
        <p>
          I&apos;m a 4th-year computer science undergraduate at{" "}
          <a href="https://www.usthb.dz" target="_blank" rel="noreferrer">
            USTHB
          </a>{" "}
          (Algiers), specializing in AI. I like building things from scratch —
          deep learning libraries in C, transformer models, inference engines —
          because taking something apart is the only way I really understand
          it.
        </p>
        <p>
          This site is my public notebook: what I build, what breaks, and what
          I learn from it.
        </p>
        <div className="link-row">
          <a href={siteConfig.github}>github</a>
          <a href={siteConfig.linkedin}>linkedin</a>
          <a href={`mailto:${siteConfig.email}`}>email</a>
        </div>
      </section>

      <h2 className="sec">recent posts</h2>
      <ul className="post-list">
        {recent.map((post) => (
          <li key={post.slug}>
            <time dateTime={post.date}>[{post.date}]</time>
            <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/blog/" className="more-link">
        all posts →
      </Link>

      <h2 className="sec">selected work</h2>
      <ul className="work-list">
        {selectedWork.map((work) => (
          <li key={work.name}>
            <a href={work.url} target="_blank" rel="noreferrer">
              {work.name}
            </a>
            <p className="desc">{work.desc}</p>
          </li>
        ))}
      </ul>
      <Link href="/projects/" className="more-link">
        all projects →
      </Link>
    </div>
  );
}
