"use client";
import React, { useEffect, useState } from "react";
import Switch from "@/components/ui/sky-toggle";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Home", "Projects", "About", "Blog", "Contact"];

export function Navbar() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    if (!mounted) return null;

    return (
        <>
            <nav className="fixed top-6 inset-x-0 max-w-3xl mx-auto z-50 p-3 pl-6 pr-3 border border-border/40 rounded-full bg-background/60 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex justify-between items-center transition-all duration-300 hover:bg-background/70 hover:scale-[1.003]">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group" onClick={() => setActiveTab("Home")}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-violet-500/30 transition-shadow">
                        M
                    </div>
                    <div className="text-lg font-bold tracking-tight text-foreground group-hover:text-violet-500 transition-colors hidden sm:block">
                        Mohit Tiwari
                    </div>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-2 items-center bg-muted/30 p-1.5 rounded-full backdrop-blur-sm">
                    <div className="flex">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                                onClick={() => setActiveTab(item)}
                                aria-current={activeTab === item ? "page" : undefined}
                                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 z-10 ${activeTab === item ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                {activeTab === item && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-background dark:bg-muted/60 rounded-full shadow-sm"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{ zIndex: -1 }}
                                    />
                                )}
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="pl-2 border-l border-border/50">
                        <Switch
                            checked={resolvedTheme === "dark"}
                            onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        />
                    </div>
                </div>

                {/* Mobile: toggle + hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <Switch
                        checked={resolvedTheme === "dark"}
                        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-full text-foreground hover:bg-muted/50 transition-colors"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-2"
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item}
                                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                                onClick={() => { setActiveTab(item); setMobileOpen(false); }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                className={`text-3xl font-bold tracking-tight px-8 py-4 rounded-2xl transition-colors ${activeTab === item ? "text-violet-500" : "text-foreground hover:text-violet-500"}`}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
