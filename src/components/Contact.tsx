"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Twitter, Instagram, ArrowRight } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "https://linkedin.com/in/mohit-tiwari-426598338", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/username", label: "GitHub" }
    ];

    return (
        <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16 lg:gap-24">

                {/* Left Column: Heading & CTA */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6">
                            Let's build <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 animate-gradient-x bg-[length:200%_auto]">
                                something epic.
                            </span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            I'm currently available for freelance projects and open to full-time opportunities. If you have an idea that needs to be realized, let's talk.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                    >
                        <div onClick={() => setIsFormOpen(true)} className="group relative cursor-pointer">
                            {/* Background Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-indigo-500/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <LiquidButton
                                variant="default"
                                size="xl"
                                className="relative bg-gradient-to-br from-foreground/90 to-foreground text-background font-bold text-lg px-8 py-6 rounded-full group-hover:shadow-[0_0_60px_20px_rgba(139,92,246,0.3)] transition-all duration-500 group-hover:scale-105 backdrop-blur-sm border border-border/20"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Let's Connect
                                    <ArrowRight className="ml-1 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                                </span>
                            </LiquidButton>
                        </div>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-lg hover:border-border transition-all text-muted-foreground hover:text-violet-500"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} strokeWidth={1.5} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Contact Cards */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="w-full max-w-md space-y-6"
                >
                    <a href="mailto:mohit200409tiwari@gmail.com" className="block group" aria-label="Send email">
                        <div className="p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-xl bg-violet-500/10 text-violet-500">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Email Me</p>
                                    <h3 className="text-base md:text-lg font-bold text-foreground break-words">
                                        mohit200409tiwari@gmail.com
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>

                    <div className="p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg relative overflow-hidden">
                        <div className="flex items-center gap-6">
                            <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-500">
                                <Phone size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Call Me</p>
                                <h3 className="text-base md:text-lg font-bold text-foreground">
                                    +91-9424406811
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-5 text-center border border-border/30 mt-6">
                        <p className="text-sm text-muted-foreground">
                            Based in <span className="text-foreground font-semibold">India</span> • Available Worldwide
                        </p>
                    </div>
                </motion.div>
            </div>

            <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </section>
    );
}
