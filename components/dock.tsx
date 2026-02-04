"use client";

import { motion } from "framer-motion";
import { Home, Code2, Briefcase, Mail } from "lucide-react";

const dockItems = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "stack", label: "Stack", icon: Code2, href: "#stack" },
    { id: "work", label: "Work", icon: Briefcase, href: "#work" },
    { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

export default function Dock() {
    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2">
            <motion.nav
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-3 py-5 backdrop-blur-xl sm:gap-4 sm:px-4 sm:py-6">
                    {dockItems.map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() => scrollToSection(item.href)}
                            className="group relative flex items-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            {/* Icon */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-white/10 lg:h-12 lg:w-12">
                                <item.icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-white lg:h-6 lg:w-6" />
                            </div>

                            {/* Label on Hover - appears above on mobile, to the right on desktop */}
                            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:left-full md:top-1/2 md:ml-3 md:-translate-y-1/2 md:translate-x-0">
                                {item.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </motion.nav>
        </div>
    );
}
