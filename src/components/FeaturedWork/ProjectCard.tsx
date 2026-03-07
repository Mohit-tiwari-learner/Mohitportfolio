import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface ProjectData {
    id: string;
    title: string;
    category: string;
    image: string;
    link: string;
}

interface ProjectCardProps {
    project: ProjectData;
    isActive: boolean;
    onClick?: () => void;
}

export function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
    return (
        <motion.div
            className={`relative w-full flex flex-col justify-center items-center ${isActive ? "cursor-default" : "cursor-pointer"}`}
            onClick={!isActive ? onClick : undefined}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* The Image Wrapper (Vintvate style large cards) */}
            <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[32px] overflow-hidden group shadow-2xl bg-gray-200 dark:bg-[#111] transition-colors duration-700">

                {/* Background Image */}
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority={isActive}
                    quality={90}
                />

                {/* Dark Vignette Overlay for text readability (adjusted for light theme support) */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 dark:from-black/80 dark:via-black/20 to-transparent pointer-events-none transition-colors duration-700" />

                {/* Top Right Circular Button */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 md:w-16 md:h-16 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black hover:scale-110 transition-transform duration-300 shadow-xl"
                    >
                        <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 stroke-[3]" />
                    </a>
                </div>

                {/* Bottom Left Content Overlay */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-fit max-w-[90%]">
                    <div className="flex flex-col gap-2">
                        {/* Bold Category Pill */}
                        <div className="w-fit px-4 py-1 bg-black text-white dark:bg-white dark:text-black transition-colors duration-700 font-bold uppercase tracking-wider text-xs md:text-sm rounded-sm mb-2 shadow-sm">
                            {project.category}
                        </div>

                        {/* Massive Vintvate Typography */}
                        <h3 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black text-black dark:text-white transition-colors duration-700 uppercase tracking-tighter leading-[0.95] drop-shadow-md">
                            {project.title.toUpperCase()}.
                        </h3>
                    </div>
                </div>

                {/* Optional dark overlay for inactive state if clicked logic used elsewhere */}
                {!isActive && (
                    <div className="absolute inset-0 bg-white/40 dark:bg-black/40 z-10 transition-all duration-300" />
                )}

            </div>
        </motion.div>
    );
}
