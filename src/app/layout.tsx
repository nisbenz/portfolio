import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { siteConfig } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    types: { "application/rss+xml": `${siteConfig.siteUrl}/rss.xml` },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <body>
        <header>
          <div className="shell header-row">
            <Link href="/" className="site-name">
              {siteConfig.handle}
            </Link>
            <nav>
              <Link href="/blog">blog</Link>
              <Link href="/projects">projects</Link>
              <Link href="/about">about</Link>
              <a href={siteConfig.rssPath}>rss</a>
            </nav>
          </div>
        </header>
        <main className="shell">{children}</main>
        <footer>
          <div className="shell footer-row">
            <span>
              © {year} {siteConfig.name}
            </span>
            <span>
              <a href={siteConfig.repo}>view source</a>
              <span aria-hidden="true"> · </span>
              <a href={siteConfig.rssPath}>rss</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
