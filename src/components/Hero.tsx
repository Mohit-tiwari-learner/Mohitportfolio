"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { Download } from "lucide-react";

export function Hero() {
    return (
        <div className="flex flex-col overflow-hidden pb-0 pt-24 sm:pt-28 md:pt-32 relative">
            <div className="absolute inset-0 z-0">
                <WebGLShader />
            </div>
            <div className="relative z-10">
                <ContainerScroll
                    titleComponent={
                        <>
                            <div className="flex flex-col items-center">
                                <span className="text-xs sm:text-sm md:text-xl font-medium text-muted-foreground tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                                    Mohit Tiwari
                                </span>
                                <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[7.5rem] font-black leading-[0.85] text-center tracking-tighter text-[#4b4b4b] dark:text-foreground mb-6 sm:mb-8 md:mb-10">
                                    Data Scientist <span className="text-[#6b6b6b] dark:text-muted-foreground/60 font-thin px-2">&</span> <br />
                                    <span className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#808080,35%,#e5e5e5,50%,#808080,65%,#808080)] dark:bg-[linear-gradient(110deg,hsl(var(--foreground)),45%,hsl(var(--muted-foreground)),55%,hsl(var(--foreground)))] bg-[length:250%_100%] animate-shimmer drop-shadow-sm">
                                        ML Engineer
                                    </span>
                                </h1>
                            </div>
                        </>
                    }
                >
                    <div className="relative h-full w-full bg-muted/40 dark:bg-muted/10 mx-auto rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center border border-border/40 dark:border-border/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_8px_25px_-8px_rgba(139,92,246,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">

                        {/* Left Content: Typography */}
                        <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 z-20 pt-6 sm:pt-8 lg:pt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[0.9] mb-3 sm:mb-4">
                                    DATA<br />
                                    DRIVEN<br />
                                    <span className="text-muted-foreground/70">INSIGHTS</span>
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium mb-5 sm:mb-6 md:mb-8 max-w-sm leading-relaxed">
                                    Turning Data into Smart Decisions.
                                </p>

                                {/* CTA row: View Projects + Resume side by side */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                                    <a href="#projects" className="inline-block group">
                                        <LiquidButton
                                            variant="default"
                                            size="lg"
                                            className="text-foreground font-semibold flex items-center gap-2"
                                        >
                                            View Projects
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </LiquidButton>
                                    </a>
                                    <a
                                        href="/resume_pf.pdf"
                                        download="Mohit_Tiwari_Resume.pdf"
                                        className="inline-block group"
                                    >
                                        <LiquidButton
                                            variant="default"
                                            size="lg"
                                            className="text-foreground font-semibold"
                                        >
                                            <span className="flex items-center gap-2">
                                                Resume
                                                <Download className="w-4 h-4" />
                                            </span>
                                        </LiquidButton>
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Content: Portrait */}
                        <div className="flex-1 h-full w-full relative flex items-end justify-center md:justify-end overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative h-[90%] w-full max-w-[500px] md:mr-8 aspect-[3/4] md:aspect-auto"
                            >
                                <Image
                                    src="/hero.png"
                                    alt="Mohit Tiwari — Data Scientist portrait"
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    draggable={false}
                                    priority
                                />
                            </motion.div>
                        </div>

                    </div>
                </ContainerScroll>
            </div>
        </div>
    );
}
