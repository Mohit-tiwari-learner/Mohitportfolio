"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollisionFallingText from "./CollisionFallingText";
import { ImageReveal } from "./ImageReveal";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    const smoothEasing = [0.65, 0, 0.35, 1];

    useEffect(() => {
        if (!textRef.current) return;
        const words = textRef.current.querySelectorAll(".word");
        words.forEach((word, i) => {
            gsap.fromTo(word,
                { y: 0, rotation: 0, opacity: 1 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=800",
                        scrub: 0.5,
                    },
                    y: () => 300 + Math.random() * 100 + Math.sin(i * 0.5) * 50,
                    x: () => (Math.random() - 0.5) * 40,
                    rotation: () => (Math.random() - 0.5) * 45,
                    opacity: 0.9,
                    ease: "power2.inOut",
                    delay: i * 0.015,
                }
            );
        });
        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    const stats = [
        { value: "10+", label: "Projects" },
        { value: "2+", label: "Years Exp." },
        { value: "5+", label: "Tech Stack" },
    ];

    return (
        <section
            ref={containerRef}
            id="about"
            className="py-20 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto min-h-[80vh] md:min-h-screen flex items-center bg-background text-foreground overflow-hidden relative"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 sm:gap-14 lg:gap-20 items-center relative z-10 w-full">

                {/* ─── Left Column: Text ─── */}
                <div className="space-y-8 sm:space-y-10 md:space-y-12 order-2 lg:order-1">

                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-8 h-px bg-violet-500" />
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-500">
                            About Me
                        </span>
                    </motion.div>

                    <CollisionFallingText
                        text="I collaborate with businesses, brands, and entrepreneurs to create digital products and achieve their goals."
                        className="font-black tracking-tight text-foreground leading-[1.18] fluid-heading break-keep [word-break:keep-all]"
                        navbarHeight={80}
                        highlightedWords={["businesses", "brands", "entrepreneurs", "digital products"]}
                        onCollision={() => console.log("Text collision detected!")}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.15, ease: smoothEasing }}
                        className="space-y-5 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-xl text-muted-foreground"
                    >
                        <p>
                            I create unique experiences that transform how users interact with the digital world. Each project is an opportunity to blend{" "}
                            <span className="underline decoration-2 underline-offset-4 decoration-violet-500 text-foreground">aesthetics</span> and{" "}
                            <span className="underline decoration-2 underline-offset-4 decoration-violet-500 text-foreground">functionality</span>.
                        </p>
                        <p>
                            As a Data Scientist and ML Engineer, I don&apos;t just crunch numbers — I tell stories with data. I build systems that simplify complexity and provide solutions that inspire and enrich.
                        </p>
                    </motion.div>

                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex gap-2.5 sm:gap-3 flex-wrap"
                    >
                        {["Data Science", "Machine Learning", "NLP", "Deep Learning", "Strategy"].map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex gap-8 sm:gap-12 pt-4 border-t border-border/40"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ─── Right Column: Image Reveal ─── */}
                <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]"
                    >
                        <ImageReveal
                            parentImage="/abouthero.png"
                            childImage="/child.png"
                            parentAlt="Mohit Tiwari — Data Scientist & ML Engineer"
                            childAlt="Young Mohit Tiwari"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
