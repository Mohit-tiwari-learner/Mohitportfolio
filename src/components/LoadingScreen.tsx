"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
 * Premium preloader inspired by veronicazubakova.com
 * Features:
 *   – Dark background with large animated counter (0 → 100)
 *   – Ultra-thin horizontal progress line
 *   – Elegant staggered text reveal
 *   – Two-panel vertical curtain split exit
 *   – Scroll-locked during loading
 *   – Fully responsive, no layout shift
 */

const WORDS = ["Creating", "experience"];

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<
        "loading" | "text-reveal" | "curtain" | "done"
    >("loading");

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const startTime = Date.now();
        const duration = 2800;

        const tick = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            // cubic ease-out for natural deceleration near 100
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.min(Math.round(eased * 100), 100));
            if (t >= 1) clearInterval(tick);
        }, 25);

        const startReveal = () => {
            clearInterval(tick);
            setProgress(100);
            // Phase 1 — show text reveal
            setTimeout(() => setPhase("text-reveal"), 300);
            // Phase 2 — curtain split
            setTimeout(() => setPhase("curtain"), 1200);
            // Phase 3 — fully done
            setTimeout(() => {
                setPhase("done");
                setIsLoading(false);
                document.body.style.overflow = "";
            }, 2100);
        };

        if (document.readyState === "complete") {
            const remaining = duration - (Date.now() - startTime);
            setTimeout(startReveal, Math.max(0, remaining));
        } else {
            const onLoad = () => {
                const remaining = duration - (Date.now() - startTime);
                setTimeout(startReveal, Math.max(0, remaining));
            };
            window.addEventListener("load", onLoad);
            // cleanup in case component unmounts
            const cleanup = () =>
                window.removeEventListener("load", onLoad);
            // Fallback
            const fallback = setTimeout(() => {
                startReveal();
            }, 5500);

            return () => {
                cleanup();
                clearInterval(tick);
                clearTimeout(fallback);
                document.body.style.overflow = "";
            };
        }

        const fallback = setTimeout(startReveal, 5500);
        return () => {
            clearInterval(tick);
            clearTimeout(fallback);
            document.body.style.overflow = "";
        };
    }, []);

    const isRevealing = phase === "curtain" || phase === "done";
    const showContent = phase === "loading";
    const showText = phase === "text-reveal";

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        overflow: "hidden",
                        fontFamily:
                            "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    }}
                >
                    {/* ── Curtain panels ── */}
                    <motion.div
                        animate={{ y: isRevealing ? "-100%" : "0%" }}
                        transition={{
                            duration: 0.85,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "50.1%",
                            background: "#000",
                            zIndex: 2,
                        }}
                    />
                    <motion.div
                        animate={{ y: isRevealing ? "100%" : "0%" }}
                        transition={{
                            duration: 0.85,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "50.1%",
                            background: "#000",
                            zIndex: 2,
                        }}
                    />
                    {/* Divider seam hider */}
                    <motion.div
                        animate={{ scaleY: isRevealing ? 0 : 1 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{
                            position: "absolute",
                            top: "calc(50% - 1px)",
                            left: 0,
                            right: 0,
                            height: "2px",
                            background: "#000",
                            zIndex: 3,
                        }}
                    />

                    {/* ── Counter phase ── */}
                    <motion.div
                        animate={{
                            opacity: showContent ? 1 : 0,
                            scale: showContent ? 1 : 0.92,
                        }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#000",
                            pointerEvents: showContent ? "auto" : "none",
                        }}
                    >
                        {/* Video — uncropped, natural aspect ratio */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.1,
                            }}
                            style={{
                                width: "min(220px, 50vw)",
                                marginBottom: "clamp(20px, 3vw, 40px)",
                            }}
                        >
                            <video
                                src="/loading/0220.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                    display: "block",
                                    background: "#000",
                                    mixBlendMode: "screen",
                                }}
                            />
                        </motion.div>

                        {/* Counter */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                userSelect: "none",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "clamp(80px, 16vw, 180px)",
                                    fontWeight: 100,
                                    letterSpacing: "-0.05em",
                                    color: "#fff",
                                    lineHeight: 1,
                                    fontVariantNumeric: "tabular-nums",
                                    transition: "opacity 0.3s",
                                }}
                            >
                                {String(progress).padStart(3, "\u00A0")}
                            </span>
                        </div>

                        {/* Progress line */}
                        <div
                            style={{
                                marginTop: "clamp(24px, 4vw, 48px)",
                                width: "min(320px, 70vw)",
                                height: "1px",
                                background: "rgba(255,255,255,0.08)",
                                overflow: "hidden",
                            }}
                        >
                            <motion.div
                                animate={{ width: `${progress}%` }}
                                transition={{
                                    duration: 0.35,
                                    ease: "easeOut",
                                }}
                                style={{
                                    height: "100%",
                                    background: "rgba(255,255,255,0.5)",
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* ── Text-reveal phase ── */}
                    <motion.div
                        animate={{
                            opacity:
                                showText ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "clamp(4px, 1vw, 8px)",
                            background: "#000",
                            pointerEvents: showText ? "auto" : "none",
                        }}
                    >
                        {WORDS.map((word, wIdx) => (
                            <div
                                key={wIdx}
                                style={{
                                    overflow: "hidden",
                                    display: "flex",
                                }}
                            >
                                {word.split("").map((char, cIdx) => (
                                    <motion.span
                                        key={cIdx}
                                        initial={{ y: "110%" }}
                                        animate={
                                            showText
                                                ? { y: "0%" }
                                                : { y: "110%" }
                                        }
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay:
                                                wIdx * 0.08 + cIdx * 0.025,
                                        }}
                                        style={{
                                            display: "inline-block",
                                            fontSize: "clamp(36px, 7vw, 72px)",
                                            fontWeight: 200,
                                            letterSpacing: "-0.02em",
                                            color: "#fff",
                                            lineHeight: 1.15,
                                            fontStyle: wIdx === 1 ? "italic" : "normal",
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
