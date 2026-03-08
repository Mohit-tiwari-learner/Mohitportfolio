"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone, Linkedin, Github, Twitter, Instagram, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
const WebGLShader = dynamic(() => import("@/components/ui/web-gl-shader").then(m => m.WebGLShader), { ssr: false });
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ContactForm } from "@/components/ContactForm";
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export function Footer() {
    const currentYear = new Date().getFullYear();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const socialLinks = [
        { icon: Twitter, href: "https://x.com/Mohit_4_you", label: "TWITTER" },
        { icon: Instagram, href: "https://www.instagram.com/mohit____tiwari______/?hl=en", label: "INSTAGRAM" },
        { icon: Linkedin, href: "https://linkedin.com/in/mohit-tiwari-426598338", label: "LINKEDIN" },
        { icon: Github, href: "https://github.com/username", label: "GITHUB" },
    ];

    const navLinks = [
        { label: "HOME", href: "#" },
        { label: "ABOUT", href: "#about" },
        { label: "PROJECTS", href: "#projects" },
        { label: "BLOG", href: "#blog" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#050505] pt-20 md:pt-24 pb-8 border-t border-white/5 overflow-hidden" id="contact">
            {/* Background Shader */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <WebGLShader />
            </div>


            <div className="relative z-10 w-full flex flex-col h-full justify-end max-w-[1400px] mx-auto px-6 md:px-12 pt-8">

                {/* All Text Content Stacked Tightly Together */}
                <div className="w-full flex-shrink-0 flex flex-col items-start mt-auto z-20 relative pb-8 lg:pb-12 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-[12vw] sm:text-[10vw] md:text-[10vw] lg:text-[8vw] font-black uppercase text-white leading-[0.85] tracking-tighter transition-colors duration-500">
                            LET&apos;S BUILD <br className="hidden lg:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 animate-gradient-x bg-[length:200%_auto]">
                                SOMETHING EPIC.
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-lg md:text-2xl text-white/50 leading-[1.8] font-light max-w-lg text-left mt-12 mb-10 lg:mt-16 break-words pointer-events-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        I&apos;m currently available for freelance projects and open to full-time opportunities. If you have an idea that needs to be realized, let&apos;s talk.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative w-full flex justify-start pointer-events-auto"
                    >
                        {/* Huge Ambient Violet Glow Behind Button */}
                        <div className="absolute top-1/2 left-0 lg:left-24 -translate-y-1/2 w-[200px] h-[100px] bg-violet-600/30 blur-[80px] rounded-full pointer-events-none" />

                        <div onClick={() => setIsFormOpen(true)} className="group relative cursor-pointer inline-block z-10">
                            {/* Magnetic Button Surface Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-indigo-500/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <LiquidButton
                                variant="default"
                                size="default"
                                className="relative bg-white text-black font-bold text-base md:text-xl px-10 py-8 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_80px_30px_rgba(139,92,246,0.3)] transition-all duration-500 group-hover:scale-[1.02]"
                            >
                                <span className="relative z-10 flex items-center gap-3 tracking-wide">
                                    Let&apos;s Connect
                                    <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" strokeWidth={2.5} />
                                </span>
                            </LiquidButton>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Massive Spline 3D Robot Integration (Absolute) */}
                <div className="absolute right-0 bottom-24 lg:bottom-12 w-full lg:w-1/2 h-[400px] lg:h-[500px] pointer-events-none z-10 flex flex-col items-center justify-center lg:justify-end">
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-auto mix-blend-screen"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        {/* Overflow hidden container touching the right edge. Box size reduced but robot scaled up internally. */}
                        <div className="relative w-[100%] h-[100%] lg:w-[80%] lg:h-[100%] -right-[15%] lg:-right-[15%] -bottom-[-10%] lg:-bottom-[10%] overflow-hidden pointer-events-none">
                            {/* Scaling the canvas up heavily and pushing it up slightly for crop. */}
                            <div className="absolute inset-0 scale-[1.0] md:scale-[2.1] -translate-x-[30%] md:-translate-x-[50%] -translate-y-[20%] md:-translate-y-[30%] pointer-events-auto">
                                <Spline scene="https://prod.spline.design/VigyHXd46nnSxAPl/scene.splinecode" />
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Bottom Row: Minimalist Navigation & Copyright */}
            <div className="w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10 uppercase tracking-[0.15em] text-[10px] md:text-xs text-white/40 font-semibold w-full">

                    {/* Copyright & Location (Left) */}
                    <div className="flex items-center gap-4 text-center lg:text-left shrink-0">
                        <span>© {currentYear} MOHIT TIWARI</span>
                        <span className="opacity-30 hidden sm:inline">—</span>
                        <span className="hidden sm:inline">INDIA</span>
                    </div>

                    {/* Social Links (Center) */}
                    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-2 hover:text-white transition-colors duration-300"
                            >
                                <social.icon size={16} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform duration-300" />
                                <span className="hidden sm:inline-block">{social.label}</span>
                            </a>
                        ))}
                    </div>

                    {/* Navigation Stack (Right) */}
                    <div className="flex flex-wrap items-center justify-center gap-6 shrink-0 z-20">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="hover:text-white transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 ml-4 pl-4 border-l border-white/10"
                        >
                            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
                            TOP
                        </button>
                    </div>
                </div>
            </div>

            <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </footer>
    );
}
