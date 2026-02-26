"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useInView,
    MotionValue,
} from "framer-motion";
import {
    Github,
    ArrowUpRight,
    Image as ImageIcon,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";

/* ================================================================
   DATA
   ================================================================ */

interface Project {
    title: string;
    tagline: string;
    category: string;
    description: string;
    tech: string[];
    link: string;
    github?: string;
    image: string;
    gallery?: string[];
    accentColor: string;   // CSS color for card-specific glow
}

const projects: Project[] = [
    {
        title: "Smart Interview AI",
        category: "AI / ML",
        tagline: "AI-powered interview coach that analyzes spoken responses in real-time using OpenAI Whisper & GPT-4.",
        description:
            "Engineered an NLP-based speech analysis system to provide structured, objective feedback — boosting user confidence by +35% across 2k+ active users.",
        tech: ["Python", "OpenAI Whisper", "GPT-4", "React", "FastAPI"],
        link: "#",
        github: "#",
        image: "/projects images/smart interview ai.png",
        accentColor: "139, 92, 246",   // violet
    },
    {
        title: "Financial Resilience Stress Test",
        category: "FinTech",
        tagline: "Predicting banking stability under adverse economic scenarios with 92% accuracy.",
        description:
            "Built an end-to-end ML pipeline aggregating RBI & NFHS datasets using ensemble regression models to forecast Credit-Deposit Ratios.",
        tech: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "Streamlit"],
        link: "#",
        image: "/projects images/finance resilience/finance resilence image.png",
        gallery: [
            "/projects images/finance resilience/finance resilence image.png",
            "/projects images/finance resilience/Screenshot 1.png",
            "/projects images/finance resilience/Screenshot 2.png",
            "/projects images/finance resilience/Screenshot 3.png",
            "/projects images/finance resilience/Screenshot 4.png",
            "/projects images/finance resilience/Screenshot 5.png",
            "/projects images/finance resilience/Screenshot 6.png",
            "/projects images/finance resilience/Screenshot 7.png",
        ],
        accentColor: "16, 185, 129",   // emerald
    },
    {
        title: "Vehicle Parking Management",
        category: "IoT",
        tagline: "Smart city solution for real-time parking slot detection and reservations.",
        description:
            "Built a scalable IoT-cloud architecture integrating sensor data with a mobile app — reducing parking search time by 30% with 99.9% uptime.",
        tech: ["IoT", "AWS", "Node.js", "React Native", "MQTT"],
        link: "#",
        github: "#",
        image: "/projects images/vehicle parking.png",
        accentColor: "249, 115, 22",   // orange
    },
];

/* ================================================================
   GALLERY MODAL
   ================================================================ */

function ProjectGallery({
    images, isOpen, onClose, projectTitle,
}: { images: string[]; isOpen: boolean; onClose: () => void; projectTitle: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((p) => (p + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((p) => (p - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (!isOpen) return;
        const fn = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [isOpen, nextImage, prevImage, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 md:p-8"
                    role="dialog" aria-modal="true" aria-label={`${projectTitle} Gallery`}
                >
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
                    <div className="relative w-full max-w-6xl flex items-center justify-between mb-4 z-10" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <p className="text-white/50 text-xs uppercase tracking-widest">Gallery</p>
                            <h3 className="text-white font-bold text-lg">{projectTitle}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-white/40 text-sm">{currentIndex + 1} / {images.length}</span>
                            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 text-white" aria-label="Close Gallery">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full max-w-6xl flex items-center justify-center z-10" onClick={(e) => e.stopPropagation()}>
                        {images.length > 1 && (
                            <button onClick={prevImage} className="absolute left-0 md:-left-14 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all border border-white/10 backdrop-blur-sm" aria-label="Previous Image">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}
                        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <Image src={images[currentIndex]} alt={`${projectTitle} — Screenshot ${currentIndex + 1}`} fill className="object-contain" sizes="(max-width: 768px) 100vw, 90vw" priority />
                        </motion.div>
                        {images.length > 1 && (
                            <button onClick={nextImage} className="absolute right-0 md:-right-14 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all border border-white/10 backdrop-blur-sm" aria-label="Next Image">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="relative flex gap-2 mt-6 z-10 flex-wrap justify-center" onClick={(e) => e.stopPropagation()}>
                            {images.map((img, idx) => (
                                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${idx === currentIndex ? "border-white opacity-100 scale-110" : "border-white/20 opacity-40 hover:opacity-70"}`} aria-label={`Go to image ${idx + 1}`}>
                                    <Image src={img} alt="" fill className="object-cover" sizes="56px" loading="lazy" decoding="async" />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ================================================================
   MAGNETIC BUTTON
   ================================================================ */

function MagneticButton({ children, className, href, onClick, ...props }:
    React.ComponentProps<typeof motion.button> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href?: string;
        onClick?: (e: React.MouseEvent) => void;
    }) {
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.1 });
    const my = useSpring(y, { stiffness: 200, damping: 20, mass: 0.1 });

    const onMove = (e: React.MouseEvent<HTMLElement>) => {
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) * 0.22);
        y.set((e.clientY - (top + height / 2)) * 0.22);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
    const C = href ? motion.a : motion.button;

    return (
        <C ref={ref as any} href={href} onClick={onClick as any}
            {...(!isTouchDevice ? { onMouseMove: onMove, onMouseLeave: onLeave } : {})}
            style={{ x: mx, y: my }} className={className} {...(props as any)}>
            {children}
        </C>
    );
}

/* ================================================================
   SIDE PROGRESS INDICATOR
   ================================================================ */

function SideProgress({ count, sectionProgress }: { count: number; sectionProgress: MotionValue<number> }) {
    const [active, setActive] = useState(0);
    const opacity = useTransform(sectionProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

    useEffect(() => {
        return sectionProgress.on("change", (v) => {
            const idx = Math.min(Math.floor(v * count), count - 1);
            setActive(idx);
        });
    }, [sectionProgress, count]);

    return (
        <motion.div style={{ opacity }} className="hidden lg:flex fixed right-8 xl:right-12 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3">
            {projects.map((p, i) => (
                <div key={i} className="flex items-center gap-3 group/dot">
                    {/* Label */}
                    <motion.span
                        animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : 8 }}
                        transition={{ duration: 0.35 }}
                        className="text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap"
                    >
                        {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    {/* Dot */}
                    <motion.div
                        animate={{
                            width: active === i ? 28 : 6,
                            backgroundColor: active === i
                                ? `rgb(${p.accentColor})`
                                : "rgba(255,255,255,0.2)",
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-[3px] rounded-full"
                    />
                </div>
            ))}
        </motion.div>
    );
}

/* ================================================================
   SCROLL PROGRESS BAR  (horizontal, red, top of sticky zone)
   ================================================================ */

function ScrollProgressBar({ sectionProgress }: { sectionProgress: MotionValue<number> }) {
    const scaleX = useTransform(sectionProgress, [0, 1], [0, 1]);

    return (
        <div className="absolute top-0 left-0 right-0 h-[2px] z-50 bg-white/5 overflow-hidden">
            <motion.div
                style={{ scaleX, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-red-600 via-red-400 to-red-600 origin-left"
            />
        </div>
    );
}

/* ================================================================
   INDIVIDUAL STICKY CARD
   ================================================================ */

function StickyCard({
    project, index, totalCount, sectionProgress,
}: {
    project: Project;
    index: number;
    totalCount: number;
    sectionProgress: MotionValue<number>;
}) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const isLast = index === totalCount - 1;
    const n = totalCount;

    // ---- Scroll window for this card (0–1 slice of total progress) ----
    const cardStart = index / n;
    const cardEnd = (index + 1) / n;

    // Entry: prev card is 55% through its window → this card starts entering
    const entryStart = Math.max(0, (index - 0.45) / n);
    const entryEnd = cardStart;

    // Exit: this card starts shrinking at 60% through its window
    const exitStart = (index + 0.6) / n;
    const exitEnd = cardEnd;

    // -- Combined Y (entry slide-up + exit lift) as numbers (px) --
    // Entry: slides up from +900px → 0
    const rawEntryY = useTransform(
        sectionProgress,
        [Math.max(0, entryStart), Math.min(1, entryEnd)],
        index === 0 ? [0, 0] : [1200, 0]
    );
    // Exit: lift upward slightly -80px for more dramatic effect
    const rawExitY = useTransform(
        sectionProgress,
        isLast ? [0, 1] : [exitStart, Math.min(1, exitEnd)],
        isLast ? [0, 0] : [0, -100]
    );

    // Spring the total Y for buttery physics - enhanced for premium feel
    const combinedY = useTransform(
        [rawEntryY, rawExitY] as MotionValue<number>[],
        ([ey, xy]: number[]) => ey + xy
    );
    const springY = useSpring(combinedY, { stiffness: 60, damping: 20, mass: 1.2 });

    // Enhanced 3D rotation on entry
    const entryRotateY = useTransform(
        sectionProgress,
        [Math.max(0, entryStart), Math.min(1, entryEnd)],
        index === 0 ? [0, 0] : [12, 0]
    );

    const entryRotateX = useTransform(
        sectionProgress,
        [Math.max(0, entryStart), Math.min(1, entryEnd)],
        index === 0 ? [0, 0] : [6, 0]
    );

    // Scale: shrink from 1 → 0.82 on exit for more depth
    const exitScale = useTransform(
        sectionProgress,
        isLast ? [0, 1] : [exitStart, Math.min(1, exitEnd)],
        isLast ? [1, 1] : [1, 0.82]
    );

    // Opacity: fade to 0.1 on exit for more dramatic depth
    const exitOpacity = useTransform(
        sectionProgress,
        isLast ? [0, 1] : [(index + 0.65) / n, Math.min(1, exitEnd)],
        isLast ? [1, 1] : [1, 0.1]
    );

    // Enhanced blur effect
    const exitBlur = useTransform(
        sectionProgress,
        isLast ? [0, 1] : [exitStart, Math.min(1, exitEnd)],
        isLast ? [0, 0] : [0, 12]
    );
    const filterValue = useTransform(exitBlur, (b: number) => `blur(${b}px)`);

    // Enhanced glow effect that scales with exit
    const glowOpacity = useTransform(
        sectionProgress,
        isLast ? [0, 1] : [exitStart, Math.min(1, exitEnd)],
        isLast ? [0.2, 0.2] : [0.2, 0.05]
    );

    // Image parallax (numeric px) - enhanced
    const imageParallax = useTransform(
        sectionProgress,
        [cardStart, cardEnd],
        [0, -120]
    );

    const num = String(index + 1).padStart(2, "0");
    const rgb = project.accentColor;

    return (
        <>
            <div
                className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
                style={{ zIndex: 10 + index }}
            >
                <motion.div
                    style={{
                        y: springY,
                        scale: exitScale,
                        opacity: exitOpacity,
                        filter: filterValue,
                        rotateX: entryRotateX,
                        rotateY: entryRotateY,
                        transformOrigin: "top center",
                        transformPerspective: 2000,
                    }}
                    className="group relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10"
                >
                    {/* ── Multi-layer glow ring (accent color per project) ── */}
                    <motion.div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                            boxShadow: useTransform(
                                glowOpacity,
                                (o) => `0 0 0 1px rgba(${rgb}, 0.2), 0 0 40px rgba(${rgb}, ${0.3 * o}), 0 32px 120px -16px rgba(${rgb}, ${0.3 * o})`
                            ),
                        }}
                    />

                    {/* ── Card Shell with enhanced backdrop blur ── */}
                    <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl" style={{
                        backgroundColor: "rgba(14, 14, 14, 0.85)",
                        backdropFilter: "blur(12px)"
                    }}>

                        {/* ── Image Area ── */}
                        <div
                            className="relative overflow-hidden cursor-pointer"
                            style={{ height: "clamp(260px, 52vh, 560px)" }}
                            onClick={() => project.gallery && setIsGalleryOpen(true)}
                        >
                            {/* Parallax image wrapper */}
                            <motion.div
                                style={{ y: imageParallax }}
                                className="absolute inset-[-8%] w-[116%] h-[116%]"
                            >
                                <Image
                                    src={project.image}
                                    alt={`${project.title} — project screenshot`}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 90vw"
                                    priority={index === 0}
                                />
                            </motion.div>

                            {/* Enhanced multi-layer gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-transparent z-10" />

                            {/* Light leak effect - animates on hover */}
                            <div
                                className="absolute top-0 right-0 w-96 h-96 opacity-0 group-hover:opacity-20 transition-all duration-1000 pointer-events-none z-15"
                                style={{
                                    background: `radial-gradient(ellipse at center, rgba(${rgb},0.3) 0%, transparent 70%)`,
                                    filter: "blur(40px)",
                                }}
                            />

                            {/* Side light leak - accent color */}
                            <div
                                className="absolute -bottom-32 -right-32 w-96 h-96 opacity-0 group-hover:opacity-15 transition-opacity duration-1000 pointer-events-none z-10"
                                style={{
                                    background: `radial-gradient(ellipse at center, rgba(${rgb},0.4) 0%, transparent 70%)`,
                                    filter: "blur(60px)",
                                }}
                            />

                            {/* Enhanced accent color vignette */}
                            <div
                                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{
                                    background: `radial-gradient(ellipse 800px at bottom 20%, rgba(${rgb},0.15) 0%, transparent 80%)`,
                                }}
                            />

                            {/* Enhanced top accent line — slides in with gradient on hover */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-1 z-20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                                style={{
                                    background: `linear-gradient(to right, rgb(${rgb}), rgba(${rgb},0.4), transparent)`,
                                    boxShadow: `0 0 20px rgba(${rgb},0.5)`
                                }}
                            />

                            {/* Enhanced watermark number with scale animation */}
                            <motion.div
                                className="absolute top-4 right-5 md:top-6 md:right-8 z-20 select-none pointer-events-none leading-none"
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.4 }}
                            >
                                <span
                                    className="text-[70px] md:text-[110px] lg:text-[140px] font-black text-transparent bg-clip-text transition-all duration-700"
                                    style={{
                                        lineHeight: 1,
                                        backgroundImage: `linear-gradient(135deg, rgba(${rgb},0.15), rgba(${rgb},0.05))`
                                    }}
                                >
                                    {num}
                                </span>
                            </motion.div>

                            {/* Enhanced gallery hover pill with glow */}
                            {project.gallery && (
                                <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                                    <motion.div
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/30 text-white font-medium text-sm shadow-2xl transition-all"
                                        style={{
                                            boxShadow: `0 0 30px rgba(${rgb}, 0.4), inset 0 0 20px rgba(${rgb}, 0.1)`
                                        }}
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        <span>View {project.gallery.length} Screenshots</span>
                                    </motion.div>
                                </div>
                            )}
                        </div>

                        {/* ── Content Area with staggered reveals ── */}
                        <div
                            className="relative px-6 pb-7 pt-1 md:px-10 md:pb-9 -mt-12 z-20"
                        >

                            {/* Category pill — reveal first */}
                            <div
                                className="mb-4"
                            >
                                <motion.span
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border backdrop-blur-sm transition-all"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        color: `rgb(${rgb})`,
                                        borderColor: `rgba(${rgb}, 0.4)`,
                                        backgroundColor: `rgba(${rgb}, 0.12)`,
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: `rgba(${rgb}, 0.18)`
                                    }}
                                >
                                    {project.category}
                                </motion.span>
                            </div>

                            {/* Title with gradient effect — reveal second */}
                            <motion.div
                                className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-5"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <h3
                                    className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight"
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, white 0%, rgba(${rgb}, 0.8) 100%)`,
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    } as React.CSSProperties}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    className="text-white/50 text-sm leading-relaxed md:text-right md:max-w-[38%]"
                                >
                                    {project.tagline}
                                </p>
                            </motion.div>

                            {/* Description — reveal third */}
                            <motion.p
                                className="text-white/45 text-sm md:text-base leading-relaxed max-w-2xl mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                            >
                                {project.description}
                            </motion.p>

                            {/* Bottom row with staggered tech pills and buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {/* Tech pills with individual animations — reveal fourth */}
                                <motion.div className="flex gap-2 flex-wrap">
                                    {project.tech.map((t, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.4, delay: 0.25 + (i * 0.05) }}
                                            whileHover={{ scale: 1.08, y: -2 }}
                                        >
                                            <motion.span
                                                className="px-4 py-2 bg-white/[0.06] rounded-full text-xs font-medium border border-white/[0.12] text-white/50 hover:text-white/90 backdrop-blur-sm transition-all duration-200 cursor-default inline-block"
                                                whileHover={{
                                                    backgroundColor: "rgba(255,255,255,0.12)",
                                                    borderColor: "rgba(255,255,255,0.2)",
                                                    boxShadow: `inset 0 0 20px rgba(255,255,255,0.05)`,
                                                }}
                                            >
                                                {t}
                                            </motion.span>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* CTAs with elevation and enhanced effects — reveal fifth */}
                                <motion.div
                                    className="flex items-center gap-3 flex-shrink-0"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <MagneticButton
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all duration-300 backdrop-blur-sm"
                                        style={{
                                            background: `linear-gradient(135deg, rgb(${rgb}), rgba(${rgb},0.6))`,
                                            boxShadow: `0 8px 32px rgba(${rgb},0.35), inset 0 1px 0 rgba(255,255,255,0.2)`,
                                        } as React.CSSProperties}
                                        whileHover={{
                                            y: -4,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Live
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                    </MagneticButton>

                                    {project.github && (
                                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                                            <MagneticButton
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/github inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-white/20 text-white/70 hover:text-white backdrop-blur-sm transition-all duration-300"
                                                onMouseEnter={(e: any) => {
                                                    (e.currentTarget as any).style.borderColor = "rgba(255,255,255,0.4)";
                                                    (e.currentTarget as any).style.backgroundColor = "rgba(255,255,255,0.08)";
                                                }}
                                                onMouseLeave={(e: any) => {
                                                    (e.currentTarget as any).style.borderColor = "rgba(255,255,255,0.2)";
                                                    (e.currentTarget as any).style.backgroundColor = "transparent";
                                                }}
                                            >
                                                <Github className="w-4 h-4 transition-transform group-hover/github:rotate-12" />
                                                Code
                                            </MagneticButton>
                                        </motion.div>
                                    )}

                                    {project.gallery && project.gallery.length > 0 && (
                                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                                            <MagneticButton
                                                onClick={() => setIsGalleryOpen(true)}
                                                className="group/gal inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border backdrop-blur-sm transition-all duration-300"
                                                style={{
                                                    border: `1.5px solid rgba(${rgb}, 0.4)`,
                                                    color: `rgba(${rgb}, 0.95)`,
                                                    backgroundColor: `rgba(${rgb}, 0.08)`,
                                                } as React.CSSProperties}
                                                onMouseEnter={(e: any) => {
                                                    (e.currentTarget as any).style.backgroundColor = `rgba(${rgb}, 0.15)`;
                                                }}
                                                onMouseLeave={(e: any) => {
                                                    (e.currentTarget as any).style.backgroundColor = `rgba(${rgb}, 0.08)`;
                                                }}
                                            >
                                                <ImageIcon className="w-4 h-4 transition-transform group-hover/gal:scale-110" />
                                                Gallery
                                            </MagneticButton>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Enhanced bottom accent glow line */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                                background: `linear-gradient(to right, transparent, rgba(${rgb},0.8), transparent)`,
                                boxShadow: `0 0 30px rgba(${rgb}, 0.6)`,
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Gallery Modal */}
            {project.gallery && (
                <ProjectGallery
                    images={project.gallery}
                    isOpen={isGalleryOpen}
                    onClose={() => setIsGalleryOpen(false)}
                    projectTitle={project.title}
                />
            )}
        </>
    );
}

/* ================================================================
   SECTION HEADER
   ================================================================ */

function SectionHeader() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 lg:pt-36 pb-16 md:pb-20">
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 tracking-[0.25em] uppercase text-xs mb-8"
            >
                <motion.span
                    className="w-8 h-px bg-gradient-to-r from-red-600 to-red-400"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                />
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent font-semibold">Selected Works</span>
            </motion.p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.88]"
                    style={{
                        backgroundImage: "linear-gradient(135deg, white 0%, rgba(255,255,255,0.7) 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    } as React.CSSProperties}
                >
                    Projects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white/45 text-sm md:text-base max-w-xs leading-relaxed md:text-right"
                >
                    A curated selection of projects that solve real&#8209;world problems through data &amp; intelligent systems.
                </motion.p>
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className="mt-10 h-1 origin-left rounded-full"
                style={{
                    background: "linear-gradient(to right, #dc2626, #f97316, rgba(220,38,38,0.2), transparent)",
                    boxShadow: "0 0 20px rgba(220,38,38,0.4)"
                }}
            />

            {/* Enhanced scroll hint with animation */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 1 }}
                className="mt-12 flex items-center gap-3 text-white/45"
            >
                <motion.div
                    className="flex flex-col gap-1"
                    animate={isInView ? { y: [0, 8, 0] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity }}
                >
                    <div className="w-5 h-px bg-gradient-to-r from-white/60 via-white/40 to-transparent" />
                    <div className="w-3 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
                </motion.div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll to explore</span>
            </motion.div>
        </div>
    );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */

export function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const n = projects.length;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    return (
        <section id="projects" className="relative" style={{ backgroundColor: "#0a0a0a" }}>
            {/* Border lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>

            {/* Section heading */}
            <SectionHeader />

            {/*
             ── STICKY SCROLL ZONE ──
              Height = n × 100vh so each card "owns" one full screen of scroll.
            */}
            <div
                ref={sectionRef}
                className="relative"
                style={{ height: `${n * 100}vh` }}
            >
                {/* Horizontal progress bar */}
                <ScrollProgressBar sectionProgress={scrollYProgress} />

                {/* Side dot progress */}
                <SideProgress count={n} sectionProgress={scrollYProgress} />

                {projects.map((project, index) => (
                    <StickyCard
                        key={project.title}
                        project={project}
                        index={index}
                        totalCount={n}
                        sectionProgress={scrollYProgress}
                    />
                ))}
            </div>

            {/* Bottom padding */}
            <div className="h-20 lg:h-28" />
        </section>
    );
}
