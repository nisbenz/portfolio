import VideoBackground from "@/components/video-background";
import Hero from "@/components/hero";
import Dock from "@/components/dock";
import TechStack from "@/components/tech-stack";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-black">
            {/* Video Background */}
            <VideoBackground />

            {/* Hero Section */}
            <Hero />

            {/* Tech Stack Section */}
            <TechStack />

            {/* Projects Section */}
            <Projects />

            {/* Contact Section */}
            <Contact />

            {/* Floating Dock Navigation */}
            <Dock />
        </main>
    );
}
