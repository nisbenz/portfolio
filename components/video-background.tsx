"use client";

export default function VideoBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src="/background.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        </div>
    );
}
