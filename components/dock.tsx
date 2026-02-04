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
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed top-8 left-1/2 z-50 -translate-x-1/2"
        >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-xl sm:gap-4 sm:px-8 sm:py-4">
                {dockItems.map((item) => (
                    <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.href)}
                        className="group relative flex flex-col items-center gap-1"
                        whileHover={{ y: 8 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        {/* Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-white/10 sm:h-12 sm:w-12">
                            <item.icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-white sm:h-6 sm:w-6" />
                        </div>

                        {/* Label on Hover */}
                        <span className="absolute -bottom-10 whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                            {item.label}
                        </span>
                    </motion.button>
                ))}
            </div>
        </motion.nav>
    );
}
