"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SmoothScrollPages = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        if (!containerRef.current) return;
        const sections = gsap.utils.toArray(".fullscreen-section") as HTMLElement[];

        // Clear any previous triggers to avoid overlaps
        ScrollTrigger.getAll().forEach(t => t.kill());

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${(sections.length - 1) * window.innerHeight}`,
            snap: {
                snapTo: 1 / (sections.length - 1),
                duration: { min: 0.5, max: 0.8 },
                delay: 0,
                ease: "power2.inOut"
            }
        });

        // Optional: refresh triggers on resize to recalibrate heights
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full relative bg-background">
            {children}
        </div>
    );
};
