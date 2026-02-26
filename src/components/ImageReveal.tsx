"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

interface ImageRevealProps {
    parentImage: string;
    childImage: string;
    parentAlt?: string;
    childAlt?: string;
}

export function ImageReveal({
    parentImage,
    childImage,
    parentAlt = "Main image",
    childAlt = "Revealed image",
}: ImageRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const spotlightPos = useRef({ x: 0.5, y: 0.5 });
    const spotlightRadius = useRef(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const rafId = useRef<number>(0);

    // Smooth GSAP quickTo targets
    const qx = useRef<gsap.QuickToFunc | null>(null);
    const qy = useRef<gsap.QuickToFunc | null>(null);
    const qr = useRef<gsap.QuickToFunc | null>(null);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Initialize GSAP quickTo for buttery smooth interpolation and shorten on mobile
    useEffect(() => {
        const dur = isMobile ? 0.22 : 0.4;
        const rDur = isMobile ? 0.22 : 0.3;
        qx.current = gsap.quickTo(spotlightPos.current, "x", {
            duration: dur,
            ease: "power2.out",
        });
        qy.current = gsap.quickTo(spotlightPos.current, "y", {
            duration: dur,
            ease: "power2.out",
        });
        qr.current = gsap.quickTo(spotlightRadius.current ? spotlightRadius : { value: 0 }, "value", {
            duration: rDur,
            ease: "power2.out",
        });
    }, [isMobile]);

    // Render loop for clip-path updates
    useEffect(() => {
        const render = () => {
            if (revealRef.current) {
                const x = spotlightPos.current.x * 100;
                const y = spotlightPos.current.y * 100;
                const r = spotlightRadius.current;
                revealRef.current.style.clipPath = `circle(${r}px at ${x}% ${y}%)`;
            }
            rafId.current = requestAnimationFrame(render);
        };
        rafId.current = requestAnimationFrame(render);
        return () => cancelAnimationFrame(rafId.current);
    }, []);

    const getRelativePos = useCallback(
        (clientX: number, clientY: number) => {
            if (!containerRef.current) return { x: 0.5, y: 0.5 };
            const rect = containerRef.current.getBoundingClientRect();
            return {
                x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
                y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
            };
        },
        []
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const pos = getRelativePos(e.clientX, e.clientY);
            qx.current?.(pos.x);
            qy.current?.(pos.y);
        },
        [getRelativePos]
    );

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
        gsap.to(spotlightRadius, {
            current: isMobile ? 100 : 150,
            duration: 0.5,
            ease: "power3.out",
        });
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        gsap.to(spotlightRadius, {
            current: 0,
            duration: 0.4,
            ease: "power2.in",
        });
    }, []);

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (!e.touches[0]) return;
            const pos = getRelativePos(e.touches[0].clientX, e.touches[0].clientY);
            qx.current?.(pos.x);
            qy.current?.(pos.y);
        },
        [getRelativePos]
    );

    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            setIsHovering(true);
            gsap.to(spotlightRadius, {
                current: 100,
                duration: isMobile ? 0.28 : 0.4,
                ease: "power3.out",
            });
            if (e.touches[0]) {
                const pos = getRelativePos(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                );
                spotlightPos.current.x = pos.x;
                spotlightPos.current.y = pos.y;
            }
        },
        [getRelativePos]
    );

    const handleTouchEnd = useCallback(() => {
        setIsHovering(false);
        gsap.to(spotlightRadius, {
            current: 0,
            duration: 0.35,
            ease: "power2.in",
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[3/4] overflow-hidden rounded-xl cursor-none select-none"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Base / Parent Image */}
            <Image
                src={parentImage}
                alt={parentAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 340px, 380px"
                priority
            />

            {/* Revealed / Child Image — masked with clip-path */}
            <div
                ref={revealRef}
                className="absolute inset-0"
                style={{
                    clipPath: "circle(0px at 50% 50%)",
                    willChange: "clip-path",
                }}
            >
                <Image
                    src={childImage}
                    alt={childAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 340px, 380px"
                />
            </div>

            {/* Spotlight ring glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background:
                        "radial-gradient(circle 180px at var(--mx) var(--my), rgba(139,92,246,0.08) 0%, transparent 70%)",
                }}
            />

            {/* Hover hint text */}
            <motion.div
                className="absolute bottom-4 left-0 right-0 text-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 0 : 0.6 }}
                transition={{ duration: 0.4, delay: 0.8 }}
            >
                <span className="text-sm md:text-xs tracking-[0.2em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {isMobile ? "Touch to reveal" : "Hover to reveal"}
                </span>
            </motion.div>
        </div>
    );
}
