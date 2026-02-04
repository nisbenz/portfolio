"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";
import { socialLinks } from "@/lib/data";

export default function Contact() {
    const links = [
        {
            name: "GitHub",
            icon: Github,
            href: socialLinks.github,
            color: "hover:text-purple-400",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: socialLinks.linkedin,
            color: "hover:text-blue-400",
        },
    ];

    return (
        <section
            id="contact"
            className="relative min-h-screen py-20 sm:py-32"
        >
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
                        Let&apos;s Connect
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-lg text-white/60"
                    >
                        Feel free to reach out for collaborations or opportunities
                    </motion.p>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12"
                >
                    {/* Social Links */}
                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className={`group flex items-center gap-3 text-white/70 transition-colors ${link.color}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="rounded-lg bg-white/5 p-3 transition-colors group-hover:bg-white/10"
                                >
                                    <link.icon className="h-6 w-6" />
                                </motion.div>
                                <span className="text-lg font-medium">{link.name}</span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="my-8 h-px origin-center bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />

                    {/* Download CV Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-8 flex justify-center"
                    >
                        <motion.a
                            href="/cv.pdf"
                            download="Mohamed_Anis_Ben_Azza_CV.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-white transition-all hover:border-white/40 hover:bg-white/20"
                        >
                            <motion.div
                                whileHover={{ y: 2 }}
                                transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                            >
                                <Download className="h-5 w-5" />
                            </motion.div>
                            <span className="text-lg font-medium">Download CV</span>
                        </motion.a>
                    </motion.div>

                    {/* Footer Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <p className="text-sm text-white/50">
                            Built with Next.js, Tailwind CSS, and Framer Motion
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
