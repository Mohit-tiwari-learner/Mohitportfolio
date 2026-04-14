"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ─────────── Reveal Item ─────────── */
const RevealItem = ({ children, progress, index, total }: { children: React.ReactNode, progress: MotionValue<number>, index: number, total: number }) => {
    const start = index / total;
    const end = (index + 1.5) / total;
    const opacity = useTransform(progress, [Math.max(0, start - 0.1), Math.min(1, end)], [0.15, 1]);
    return <motion.div style={{ opacity }} className="inline-block relative">{children}</motion.div>;
};

/* ─────────── Section Header ─────────── */
function BlogSectionHeader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | HTMLSpanElement | null)[]>([]);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.85", "center center"]
    });

    useEffect(() => {
        if (!containerRef.current || itemsRef.current.length === 0) return;

        const triggerFallingAnimation = () => {
            const fallDistance = window.innerHeight;
            itemsRef.current.forEach((item, index) => {
                if (!item) return;
                gsap.set(item, { y: 0, x: 0, rotationZ: 0, opacity: 1, filter: 'blur(0px)' });
                const randomX = (Math.random() - 0.5) * 500;
                const randomRotation = (Math.random() - 0.5) * 720;
                const randomDelay = index * 0.1;
                const fallDuration = 1.0 + Math.random() * 0.8;
                gsap.to(item, { y: fallDistance, x: randomX, rotationZ: randomRotation, opacity: 0, filter: 'blur(8px)', duration: fallDuration, delay: randomDelay, ease: 'power3.in' });
            });
        };

        const reverseFallingAnimation = () => {
            itemsRef.current.forEach((item, index) => {
                if (!item) return;
                const randomDelay = index * 0.015;
                gsap.to(item, { y: 0, x: 0, rotationZ: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, delay: randomDelay, ease: 'power2.out' });
            });
        };

        let animationStarted = false;
        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top -15%",
            onEnter: () => { animationStarted = true; triggerFallingAnimation(); },
            onLeaveBack: () => { if (animationStarted) { animationStarted = false; reverseFallingAnimation(); } }
        });

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); scrollTrigger.kill(); };
    }, []);

    const visualContent = [
        { type: "text", text: "BLOG" },
        { type: "text", text: "&" },
        { type: "image", src: "/gallery/IMG_1.png" },
        { type: "text", text: "INSIGHTS" },
        { type: "text", text: "THOUGHTS" },
        { type: "image", src: "/gallery/IMG_2.png" },
        { type: "text", text: "ON" },
        { type: "text", text: "AI," },
        { type: "text", text: "DATA" },
        { type: "image", src: "/gallery/IMG_3.jpg" },
        { type: "text", text: "SCIENCE," },
        { type: "text", text: "&" },
        { type: "text", text: "ENGINEERING" },
        { type: "image", src: "/gallery/20260222_155343_896.jpg.jpeg" },
    ];
    const totalItems = visualContent.length;

    return (
        <div ref={containerRef} className="pb-10 flex flex-col items-center">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-8 md:mb-12">
                Explore More
            </motion.p>
            <div className="text-center font-black uppercase tracking-tight leading-none text-[15vw] sm:text-[12vw] md:text-[8vw] text-foreground flex flex-wrap justify-center items-center gap-x-5 gap-y-6 md:gap-x-6 md:gap-y-6 max-w-[95%] mx-auto" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
                {visualContent.map((item, i) => {
                    if (item.type === "text") {
                        return (
                            <RevealItem key={i} progress={scrollYProgress} index={i} total={totalItems}>
                                <div ref={(el) => { itemsRef.current[i] = el; }} className="inline-block origin-bottom will-change-transform">
                                    <span className="inline-block transform scale-y-110 md:scale-y-125 origin-bottom">{item.text}</span>
                                </div>
                            </RevealItem>
                        );
                    } else {
                        return (
                            <RevealItem key={i} progress={scrollYProgress} index={i} total={totalItems}>
                                <div ref={(el) => { itemsRef.current[i] = el; }} className="relative inline-block w-[1.5em] h-[0.7em] md:h-[0.75em] md:w-[1.8em] rounded-[0.2em] md:rounded-[0.25em] overflow-hidden align-middle mx-1 shadow-2xl transition-transform duration-500 hover:scale-105 hover:-translate-y-2 will-change-transform">
                                    <img src={item.src} alt="Gallery Image" className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 scale-110 hover:scale-100" />
                                </div>
                            </RevealItem>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export function Blog() {
    return (
        <section id="blog" className="relative bg-background text-foreground overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            </div>
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 lg:pt-36">
                <BlogSectionHeader />
            </div>
        </section>
    );
}
