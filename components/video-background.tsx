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

            {/* Subtle overlay for slight text contrast - optional, can be removed */}
            <div className="absolute inset-0 bg-black/20" />
        </div>
    );
}
