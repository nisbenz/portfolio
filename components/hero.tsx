"use client";

import BlurText from "./ui/blur-text";
import Particles from "./ui/particles";
import { heroData } from "@/lib/data";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >            {/* Glass Container */}
            <div className="relative z-10 mx-4 max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl sm:p-16 md:p-20">
                <div className="flex flex-col items-center text-center">
                    {/* Name with BlurText */}
                    <BlurText
                        text={heroData.name}
                        className="mb-6 whitespace-nowrap text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                        delay={0.2}
                        duration={1.2}
                    />

                    {/* Title with BlurText */}
                    <BlurText
                        text={heroData.title}
                        className="mb-4 text-xl font-medium text-white/80 sm:text-2xl md:text-3xl"
                        delay={0.8}
                        duration={1}
                    />

                    {/* Subtitle */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/60 sm:text-base md:text-lg">
                        {heroData.subtitle.split(", ").map((item, index) => (
                            <span key={index} className="flex items-center">
                                {item}
                                {index < heroData.subtitle.split(", ").length - 1 && (
                                    <span className="mx-2 h-1 w-1 rounded-full bg-white/40" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
