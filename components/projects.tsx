"use client";

import { motion } from "framer-motion";
import SpotlightCard from "./ui/spotlight-card";
import { projects } from "@/lib/data";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function Projects() {
    return (
        <section
            id="work"
            className="relative min-h-screen py-20 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                    >
                        Featured Work
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-lg text-white/60"
                    >
                        Selected projects showcasing my expertise
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-6 sm:gap-8 md:grid-cols-2"
                >
                    {projects.map((project, index) => (
                        <motion.div key={project.id} variants={item}>
                            <SpotlightCard className="group h-full">
                                <div className="space-y-4">
                                    {/* Project Subtitle */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-sm font-medium uppercase tracking-wider text-white/50"
                                    >
                                        {project.subtitle}
                                    </motion.div>

                                    {/* Project Title */}
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-2xl font-bold text-white transition-colors group-hover:text-white/90 sm:text-3xl"
                                    >
                                        {project.title}
                                    </motion.h3>

                                    {/* Project Description */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-base leading-relaxed text-white/70 sm:text-lg"
                                    >
                                        {project.description}
                                    </motion.p>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
