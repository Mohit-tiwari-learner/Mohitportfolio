"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectData, ProjectCard } from "./ProjectCard";

// Using the same data as before but mapping it to ProjectData
const projectsData: ProjectData[] = [
    {
        id: "1",
        title: "Smart Interview AI",
        category: "AI / ML",
        image: "/projects images/smart interview ai.png",
        link: "#", // Replaced with actual link or keep as "#"
    },
    {
        id: "2",
        title: "Financial Resilience",
        category: "FinTech",
        image: "/projects images/finance resilience/finance resilence image.png",
        link: "#",
    },
    {
        id: "3",
        title: "Vehicle Parking",
        category: "IoT",
        image: "/projects images/vehicle parking.png",
        link: "#",
    },
    {
        id: "4",
        title: "Others",
        category: "Various",
        image: "/projects images/vehicle parking.png", // Using a placeholder image from existing since none provided
        link: "#",
    },
];

export function FeaturedWorkSection() {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <section
            id="projects"
            className="relative bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-700 pt-24 md:pt-32 pb-32"
        >
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full">

                {/* 
                  Split Screen Architecture:
                  On Desktop: 2 Columns (Grid). 
                  Left Col: Sticky
                  Right Col: Scrolling vertical stack
                */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative items-start">

                    {/* LEFT COLUMN - STICKY TITLE */}
                    <div className="lg:col-span-5 lg:sticky lg:top-[20vh]" ref={ref}>
                        <div className="flex flex-col max-w-lg mt-8 lg:mt-16">
                            {/* Standard bold sans-serif matching the portfolio font */}
                            <h2 className="text-[4rem] lg:text-[6rem] leading-[0.9] font-black uppercase tracking-tighter mb-6 text-black dark:text-white transition-colors duration-700">
                                SELECTED<br />WORKS .
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-700 text-base md:text-lg leading-relaxed max-w-sm font-medium">
                                A showcase of our defining projects. Digital experiences that push boundaries.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - SCROLLING CARDS */}
                    <div className="lg:col-span-7 flex flex-col gap-16 lg:gap-32 mt-16 lg:mt-0">
                        {projectsData.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isActive={true} // Force active state styling for vertical scroll
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
