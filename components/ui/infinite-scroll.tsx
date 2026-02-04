"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InfiniteScrollProps {
    items: ReactNode[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}

export default function InfiniteScroll({
    items,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: InfiniteScrollProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const getSpeed = () => {
        switch (speed) {
            case "fast":
                return "20s";
            case "normal":
                return "40s";
            case "slow":
                return "60s";
            default:
                return "40s";
        }
    };

    const getDirection = () => {
        return direction === "left" ? "forwards" : "reverse";
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <div
                className={cn(
                    "flex w-max min-w-full shrink-0 gap-4 py-4",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
                style={{
                    animation: `scroll ${getSpeed()} ${getDirection()} linear infinite`,
                }}
            >
                {items.map((item, idx) => (
                    <div key={idx}>{item}</div>
                ))}
                {items.map((item, idx) => (
                    <div key={`duplicate-${idx}`}>{item}</div>
                ))}
            </div>
        </div>
    );
}

// Add React import
import React from "react";
