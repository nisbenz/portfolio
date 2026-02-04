import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Mohamed Anis Ben Azza | AI Engineering & Full Stack Developer",
    description:
        "Portfolio of Mohamed Anis Ben Azza - AI Engineering Student & Full Stack Developer specializing in Agentic AI, RAG, and Scalable Web Applications.",
    keywords: [
        "Mohamed Anis Ben Azza",
        "AI Engineer",
        "Full Stack Developer",
        "RAG",
        "Agentic AI",
        "Next.js",
        "Python",
    ],
    authors: [{ name: "Mohamed Anis Ben Azza" }],
    openGraph: {
        title: "Mohamed Anis Ben Azza | AI Engineering & Full Stack Developer",
        description:
            "Portfolio showcasing expertise in AI Engineering, RAG systems, and Full Stack Development",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
