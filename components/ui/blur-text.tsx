"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export default function BlurText({
    text,
    className = "",
    delay = 0,
    duration = 1,
}: BlurTextProps) {
    const letters = useMemo(() => text.split(""), [text]);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration / letters.length, delayChildren: delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
        },
    };

    return (
        <motion.div
            style={{ display: "inline-flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ display: letter === " " ? "inline-block" : "inline" }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
}
