"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Calendar,
    Clock,
    ArrowUpRight,
    Sparkles,
    Brain,
    BarChart3,
    Code2,
    Layers,
} from "lucide-react";

interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    categoryIcon: React.ElementType;
    gradient: string;
    glowColor: string;
    href: string;
    featured?: boolean;
}

const blogPosts: BlogPost[] = [
    {
        title: "How I Built an AI Interview Coach with GPT-4 & Whisper",
        excerpt:
            "A deep dive into the architecture behind real-time speech analysis, prompt engineering techniques, and the challenges of sub-2s latency feedback loops.",
        date: "Feb 15, 2026",
        readTime: "8 min read",
        category: "AI / ML",
        categoryIcon: Brain,
        gradient: "from-violet-500 via-purple-500 to-indigo-500",
        glowColor: "rgba(139, 92, 246, 0.15)",
        href: "#",
        featured: true,
    },
    {
        title: "Stress Testing Financial Models with Ensemble ML",
        excerpt:
            "How ensemble regression models can forecast Credit-Deposit Ratios using RBI and NFHS datasets for banking resilience.",
        date: "Jan 28, 2026",
        readTime: "6 min read",
        category: "Data Science",
        categoryIcon: BarChart3,
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        glowColor: "rgba(16, 185, 129, 0.15)",
        href: "#",
    },
    {
        title: "Building Scalable IoT Architectures on AWS",
        excerpt:
            "Lessons learned from building a smart parking system that handles 10k+ concurrent users with 99.9% uptime.",
        date: "Jan 10, 2026",
        readTime: "5 min read",
        category: "Engineering",
        categoryIcon: Layers,
        gradient: "from-orange-500 via-amber-500 to-yellow-500",
        glowColor: "rgba(249, 115, 22, 0.15)",
        href: "#",
    },
    {
        title: "The Art of Prompt Engineering for Production Apps",
        excerpt:
            "Practical strategies for writing reliable, cost-effective prompts that work consistently at scale in production environments.",
        date: "Dec 20, 2025",
        readTime: "7 min read",
        category: "AI / ML",
        categoryIcon: Sparkles,
        gradient: "from-pink-500 via-rose-500 to-red-500",
        glowColor: "rgba(236, 72, 153, 0.15)",
        href: "#",
    },
];

/* ─────────── Section Header ─────────── */
function BlogSectionHeader() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div ref={ref} className="mb-14 md:mb-20">
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-primary font-semibold tracking-[0.25em] uppercase text-xs block mb-5"
            >
                Blog & Insights
            </motion.p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[0.95] max-w-xl"
                >
                    Thoughts &{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500">
                        Learnings
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-muted-foreground text-sm md:text-base max-w-xs leading-relaxed md:text-right"
                >
                    Writing about AI, data science, engineering, and the craft
                    of building intelligent software.
                </motion.p>
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-8 h-px bg-gradient-to-r from-violet-500 via-purple-500 to-transparent origin-left"
            />
        </motion.div>
    );
}

/* ─────────── Featured Card ─────────── */
function FeaturedBlogCard({ post }: { post: BlogPost }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.a
            ref={ref}
            href={post.href}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group relative block mb-10 md:mb-14"
        >
            <div className="relative p-8 md:p-12 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-border hover:shadow-2xl">
                {/* Background glow */}
                <div
                    className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: post.glowColor }}
                />

                {/* Shimmer line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    {/* Left — icon & label */}
                    <div className="flex-shrink-0">
                        <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${post.gradient} flex items-center justify-center shadow-lg`}
                        >
                            <post.categoryIcon className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    {/* Middle — content */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-gradient-to-r ${post.gradient} text-white`}
                            >
                                <Sparkles className="w-3 h-3" />
                                Featured
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {post.date}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {post.readTime}
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-300">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Right — arrow */}
                    <div className="flex-shrink-0 self-end md:self-center">
                        <div className="p-3 rounded-xl border border-border/50 bg-muted/30 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-all duration-300">
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
}

/* ─────────── Regular Card ─────────── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    return (
        <motion.a
            ref={ref}
            href={post.href}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative block"
        >
            <div className="relative h-full p-6 md:p-8 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-border/80 hover:shadow-xl hover:-translate-y-1">
                {/* Hover glow */}
                <div
                    className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: post.glowColor }}
                />

                <div className="relative z-10 space-y-4">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-gradient-to-r ${post.gradient} text-white`}
                        >
                            <post.categoryIcon className="w-3 h-3" />
                            {post.category}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-300">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 pt-2 border-t border-border/30">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                    </div>
                </div>
            </div>
        </motion.a>
    );
}

/* ─────────── Main Export ─────────── */
export function Blog() {
    const featuredPost = blogPosts.find((p) => p.featured);
    const regularPosts = blogPosts.filter((p) => !p.featured);

    return (
        <section
            id="blog"
            className="relative bg-background text-foreground overflow-hidden"
        >
            {/* Section borders */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-36">
                <BlogSectionHeader />

                {/* Featured post */}
                {featuredPost && <FeaturedBlogCard post={featuredPost} />}

                {/* Grid of regular posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post, index) => (
                        <BlogCard key={post.title} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
