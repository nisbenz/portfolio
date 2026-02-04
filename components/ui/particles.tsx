"use client";

import { useEffect, useRef, useState } from "react";

interface ParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    refresh?: boolean;
}

export default function Particles({
    className = "",
    quantity = 50,
    staticity = 50,
    ease = 50,
    refresh = false,
}: ParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const circles = useRef<any[]>([]);
    const mousePosition = useRef({ x: 0, y: 0 });
    const mouseMoveRef = useRef(false);
    const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

    useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext("2d");
        }
        initCanvas();
        animate();
        window.addEventListener("resize", initCanvas);

        return () => {
            window.removeEventListener("resize", initCanvas);
        };
    }, [canvasSize.w, canvasSize.h]);

    useEffect(() => {
        onMouseMove();
    }, [mousePosition.current.x, mousePosition.current.y]);

    useEffect(() => {
        initCanvas();
    }, [refresh]);

    const initCanvas = () => {
        resizeCanvas();
        drawParticles();
    };

    const onMouseMove = () => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const { w, h } = canvasSize;
            const x = mousePosition.current.x - rect.left - w / 2;
            const y = mousePosition.current.y - rect.top - h / 2;
            const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
            if (inside) {
                mouseMoveRef.current = true;
                circles.current.forEach((circle: any) => {
                    const dx = circle.x - x;
                    const dy = circle.y - y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = canvasSize.w / 8;
                    const force = (maxDistance - d) / maxDistance;
                    const directionX = dx / d;
                    const directionY = dy / d;
                    const forceDirectionX = directionX * force * ease * 0.1;
                    const forceDirectionY = directionY * force * ease * 0.1;

                    if (d < maxDistance) {
                        circle.vx += forceDirectionX;
                        circle.vy += forceDirectionY;
                    }
                });
            } else {
                mouseMoveRef.current = false;
            }
        }
    };

    const resizeCanvas = () => {
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            circles.current.length = 0;
            canvasRef.current.width = canvasContainerRef.current.offsetWidth * dpr;
            canvasRef.current.height = canvasContainerRef.current.offsetHeight * dpr;
            canvasRef.current.style.width = `${canvasContainerRef.current.offsetWidth}px`;
            canvasRef.current.style.height = `${canvasContainerRef.current.offsetHeight}px`;
            context.current.scale(dpr, dpr);
            setCanvasSize({
                w: canvasContainerRef.current.offsetWidth,
                h: canvasContainerRef.current.offsetHeight,
            });
        }
    };

    const circleParams = (): {
        x: number;
        y: number;
        translateX: number;
        translateY: number;
        size: number;
        alpha: number;
        targetAlpha: number;
        dx: number;
        dy: number;
        vx: number;
        vy: number;
        draw: () => void;
    } => {
        const x = Math.floor(Math.random() * canvasSize.w);
        const y = Math.floor(Math.random() * canvasSize.h);
        const translateX = 0;
        const translateY = 0;
        const size = Math.floor(Math.random() * 2) + 1;
        const alpha = 0;
        const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        const vx = 0;
        const vy = 0;
        const draw = () => {
            if (!context.current) {
                return;
            }
            context.current.translate(translateX, translateY);
            context.current.beginPath();
            context.current.arc(x, y, size, 0, 2 * Math.PI);
            context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            context.current.fill();
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, vx, vy, draw };
    };

    const drawParticles = () => {
        circles.current.length = 0;
        for (let i = 0; i < quantity; i++) {
            circles.current.push(circleParams());
        }
    };

    const clearContext = () => {
        if (context.current) {
            context.current.clearRect(0, 0, canvasSize.w, canvasSize.h);
        }
    };

    const drawCircle = (circle: any, update = false) => {
        if (update) {
            circle.x += circle.dx + circle.vx;
            circle.y += circle.dy + circle.vy;

            if (circle.x < 0 || circle.x > canvasSize.w) {
                circle.vx = 0;
                circle.dx = -circle.dx;
            }

            if (circle.y < 0 || circle.y > canvasSize.h) {
                circle.vy = 0;
                circle.dy = -circle.dy;
            }

            circle.vx *= 0.99;
            circle.vy *= 0.99;

            if (circle.alpha < circle.targetAlpha) {
                circle.alpha += 0.02;
            } else if (circle.alpha > circle.targetAlpha) {
                circle.alpha -= 0.02;
            }

            if (circle.alpha < 0.005) {
                circle.alpha = 0;
            }
        }
        circle.draw();
    };

    const animate = () => {
        clearContext();
        circles.current.forEach((circle: any) => {
            drawCircle(circle, true);
        });
        window.requestAnimationFrame(animate);
    };

    return (
        <div className={className} ref={canvasContainerRef} aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
}
