"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Heart, ArrowUp } from "lucide-react";
import { WebGLShader } from "@/components/ui/web-gl-shader";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "https://linkedin.com/in/mohit-tiwari-426598338", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/username", label: "GitHub" },
    ];

    const navLinks = [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Blog", href: "#blog" },
        { label: "Contact", href: "#contact" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative overflow-hidden border-t border-white/10">
            {/* WebGL Shader Background — fully visible in both modes */}
            <div className="absolute inset-0 z-0">
                <WebGLShader />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h3 className="text-2xl font-black tracking-tighter text-white">
                            Mohit
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                                .
                            </span>
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                            Full-stack developer crafting digital experiences with passion and precision.
                        </p>
                    </motion.div>

                    {/* Navigation Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Quick Links
                        </h4>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-white/50 hover:text-violet-400 transition-colors duration-300 w-fit"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Social Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg bg-white/10 border border-white/10 text-white/60 hover:text-violet-400 hover:border-violet-400/30 hover:bg-violet-500/15 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40">
                        © {currentYear} Mohit Tiwari. Built with{" "}
                        <Heart className="inline-block w-3 h-3 text-red-500 fill-red-500 mx-0.5" />{" "}
                        and Next.js
                    </p>

                    {/* Back to top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-xs text-white/40 hover:text-violet-400 transition-colors duration-300"
                        aria-label="Back to top"
                    >
                        Back to top
                        <ArrowUp
                            size={14}
                            className="group-hover:-translate-y-1 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
}
