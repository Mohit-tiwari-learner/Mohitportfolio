"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ReversibleFallingText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const text = "I collaborate with businesses, brands, and entrepreneurs to create digital products and achieve their goals.";
    const words = text.split(" ");

    return (
        <section 
            ref={containerRef}
            className="py-20 px-6 bg-[#F3F3F3] dark:bg-[#0a0a0a] flex items-center justify-center min-h-[60vh]"
        >
            <div className="max-w-4xl mx-auto text-center">
                <div className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.2] flex flex-wrap justify-center gap-x-3 gap-y-2">
                    {words.map((word, i) => {
                        const isHighlight = ["businesses,", "brands,", "entrepreneurs"].includes(word);
                        const delay = i * 0.02;
                        
                        const y = useTransform(
                            scrollYProgress,
                            [0 + delay, 0.5 + delay, 1],
                            [-200, 0, 0]
                        );
                        
                        const opacity = useTransform(
                            scrollYProgress,
                            [0 + delay, 0.3 + delay, 0.7, 1],
                            [0, 1, 1, 1]
                        );
                        
                        const rotate = useTransform(
                            scrollYProgress,
                            [0 + delay, 0.5 + delay],
                            [Math.random() * 40 - 20, 0]
                        );

                        return (
                            <motion.span
                                key={i}
                                style={{ y, opacity, rotate }}
                                className={isHighlight ? "text-gray-400 dark:text-gray-600" : "text-black dark:text-white"}
                            >
                                {word}
                            </motion.span>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
