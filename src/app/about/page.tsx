import type { Metadata } from "next";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>
        I&apos;m Mohamed Anis Ben Azza, a computer science undergraduate at
        USTHB (Université des Sciences et de la Technologie Houari Boumediene)
        in Algiers, Algeria, specializing in artificial intelligence. I&apos;m
        currently in my 4th year of the engineering cycle, working toward the
        State Engineering Degree in Computer Science.
      </p>
      <p>
        Most of what I know about machine learning, I learned by building it
        from scratch: an autograd engine in C, a transformer trained on Darija,
        an I-JEPA reimplementation, a GPT-2 inference engine in C++. Reading
        papers is easy; making them run is where the understanding is. The
        rest  operating systems, software engineering, algorithms  I&apos;m
        learning the normal way, in class.
      </p>

      <h2>Education</h2>
      <p>
        State Engineering Degree in Computer Science (AI specialty), USTHB,
        Oct. 2023 – present. Coursework I keep coming back to: algorithms,
        machine learning, operating systems, software engineering.
      </p>

      <h2>Experience</h2>
      <p>
        In May–June 2026 I interned at DecodeLabs (remote), where I built and
        trained an OCR model to extract and structure text from scanned
        documents and images.
      </p>
      <p>
        Since October 2025 I&apos;ve been a member of the Development
        Department of{" "}
        <a
          href="https://github.com/MicroClub-USTHB"
          target="_blank"
          rel="noreferrer"
        >
          Micro Club USTHB
        </a>
        , contributing to open-source club projects and competing in the
        internal BuildIT hackathon and ideathon with rapid-prototyped AI
        concepts. mAIcro, our AI knowledge-management service, grew out of
        that work.
      </p>

      <h2>Certifications</h2>
      <p>
        Machine Learning Specialization (DeepLearning.AI): supervised learning,
        advanced learning algorithms, unsupervised learning, recommender
        systems, and reinforcement learning.
      </p>

      <h2>Languages</h2>
      <p>Arabic (native), French (fluent), English (fluent).</p>

      <h2>Elsewhere</h2>
      <p>
        I post code on{" "}
        <a href={siteConfig.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        , and you can reach me by{" "}
        <a href={`mailto:${siteConfig.email}`}>email</a> or on{" "}
        <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
}
