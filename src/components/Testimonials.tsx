"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "The seamless integration of cutting-edge technology and beautiful design is unparalleled. It completely transformed our workflow.",
        name: "Vedant Vyas",
        role: "CTO, TechNova"
    },
    {
        id: 2,
        quote: "An absolute game changer. The attention to detail in every micro-interaction blew us away. Highly recommended for scalable projects.",
        name: "Rajat Jhade",
        role: "Lead Engineer"
    },
    {
        id: 3,
        quote: "Delivery was fast, reliable, and exactly to spec. The architecture handles our high-traffic days without breaking a sweat.",
        name: "Sushil Singh",
        role: "Product Manager"
    },
    {
        id: 4,
        quote: "Brilliant execution of complex UI states and deeply robust scalable data pipelines. A rare mix of deep engineering and art.",
        name: "Ritik Mishra",
        role: "Founder & CEO"
    },
    {
        id: 5,
        quote: "We've seen immediate improvements in our deployment speed and overall user engagement. The code quality is top tier.",
        name: "Kalpana Pal",
        role: "VP of Engineering"
    }
];

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderWidth, setSliderWidth] = useState(0);

    // Track horizontal drag position
    const x = useMotionValue(0);

    // Get the smoothed velocity of x
    const xVelocity = useVelocity(x);
    const smoothVelocity = useSpring(xVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to a rotation value (the "swing" effect).
    // More real-world swing: less aggressive max degree, wider velocity constraint
    const transformRotation = useTransform(smoothVelocity, [-2000, 0, 2000], [6, 0, -6]);

    // Add an elastic spring to the rotation so it settles realistically without endless spinning
    const rotation = useSpring(transformRotation, {
        damping: 15,
        stiffness: 120,
        mass: 0.5
    });

    // Calculate maximum drag constraint based on container vs viewport
    useEffect(() => {
        if (!containerRef.current) return;
        const calcWidth = () => {
            const scrollWidth = containerRef.current?.scrollWidth || 0;
            const viewportWidth = window.innerWidth;
            // Subtracting viewport to prevent overscroll; a little extra padding added
            setSliderWidth(scrollWidth - viewportWidth + window.innerWidth * 0.1);
        };
        calcWidth();
        window.addEventListener("resize", calcWidth);
        return () => window.removeEventListener("resize", calcWidth);
    }, []);

    // Also support mouse wheel scrolling natively over the draggable area?
    const handleWheel = (e: React.WheelEvent) => {
        if (e.deltaY !== 0) {
            // Optional: convert vertical scroll to horizontal scroll inside bounds
            // This allows desktop users to just scroll normally and map it horizontally
            const currentX = x.get();
            const newX = currentX - e.deltaY;
            if (newX <= 0 && newX >= -sliderWidth) {
                x.set(newX);
            } else if (newX > 0) {
                x.set(0);
            } else {
                x.set(-sliderWidth);
            }
        }
    };

    return (
        <section id="testimonials" className="py-24 md:py-36 bg-background text-foreground overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent z-20" />

            {/* Immersive Fluid Background Orbs (Water Effect Base) */}
            <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-500/30 dark:hidden blur-[130px] pointer-events-none z-0" />
            <div className="absolute top-0 right-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-cyan-400/20 dark:hidden blur-[110px] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] right-[30%] w-[35vw] h-[35vw] max-w-[700px] max-h-[700px] rounded-full bg-teal-400/20 dark:hidden blur-[140px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16 md:mb-24">
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-6 md:mb-8"
                >
                    Testimonials
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] max-w-2xl"
                >
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500">Pioneers</span>
                </motion.h2>
            </div>

            {/* The Draggable Wrapper */}
            <div className="w-full relative cursor-grab active:cursor-grabbing pl-5 sm:pl-8 lg:pl-12" style={{ touchAction: "pan-y" }}>
                <motion.div
                    ref={containerRef}
                    drag="x"
                    dragConstraints={{ right: 0, left: -sliderWidth }}
                    dragElastic={0.15}
                    dragTransition={{ bounceStiffness: 250, bounceDamping: 35 }} // Smooth Inertia
                    onWheel={handleWheel}
                    style={{ x }}
                    className="flex gap-6 sm:gap-8 lg:gap-10 items-stretch w-max pr-5 sm:pr-8 lg:pr-12 pointer-events-auto pb-10"
                >
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ x: "80vw", opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "0px 1000px 0px 0px" }}
                            transition={{
                                type: "spring",
                                delay: index * 0.15,
                                damping: 25,
                                stiffness: 90
                            }}
                            className="w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0"
                            style={{
                                zIndex: testimonials.length - index,
                                perspective: "1200px"
                            }}
                        >
                            <motion.div
                                style={{
                                    rotate: rotation,
                                    transformOrigin: "center 50px", // Swing origin similar to code snippet connector
                                }}
                                className="relative bg-white/10 dark:bg-black/50 backdrop-blur-[40px] backdrop-saturate-150 border border-white/50 dark:border-white/5 rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between h-[450px] shadow-[0_8px_32px_0_rgba(31,38,135,0.1),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-1px_4px_rgba(255,255,255,0.2)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.2),inset_0_2px_5px_rgba(255,255,255,0.9),inset_0_-1px_5px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/20 dark:hover:bg-black/60 hover:border-white/70 dark:hover:border-white/10 transition-all duration-500 group overflow-hidden"
                            >
                                {/* Liquid Specular Highlight (High Brightness Water Refraction / Dark Ocean mode) */}
                                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/30 dark:from-white/5 to-transparent pointer-events-none rounded-t-[2.5rem] z-0" />
                                {/* Drag indicator badge on hover */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 text-[10px] sm:text-xs uppercase font-bold tracking-widest text-muted-foreground z-30 pointer-events-none shadow-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500/80 animate-pulse" />
                                    Drag
                                </div>

                                {/* Hardware mounting aesthetic component / hole connector */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-16 h-8 bg-background border border-border rounded-full shadow-inner flex items-center justify-center z-10 before:absolute before:inset-1 before:rounded-full before:bg-card/50">
                                    <div className="w-3 h-3 rounded-full bg-border shadow-inner z-20" />
                                </div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border/80 z-0" />

                                <div className="z-10 relative mt-4">
                                    <Quote className="w-10 h-10 text-violet-500/20 mb-8 transform -scale-x-100 group-hover:scale-110 group-hover:-scale-x-110 transition-transform duration-300" />
                                    <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-medium mb-8">
                                        &quot;{t.quote}&quot;
                                    </p>
                                </div>

                                <div className="flex items-center gap-5 mt-auto pt-6 border-t border-border/30">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-background shadow-md bg-gradient-to-br from-violet-500 to-indigo-500 text-white font-bold text-2xl uppercase">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground sm:text-lg">{t.name}</h4>
                                        <p className="text-sm text-violet-400 font-medium">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Testimonials;
