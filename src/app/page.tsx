"use client";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/SectionDivider";
import { About } from "@/components/About";
import { FeaturedWorkSection } from "@/components/FeaturedWork/FeaturedWorkSection";
import { Blog } from "@/components/Blog";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
    return (
        <>
            <LoadingScreen />
            <Navbar />
            <main className="min-h-screen bg-background text-foreground">
                <Hero />
                <SectionDivider />
                <section id="about">
                    <About />
                </section>
                <section id="projects">
                    <FeaturedWorkSection />
                </section>
                <section id="blog-header">
                    <Blog />
                </section>
                <Testimonials />
                <Footer />
            </main>
        </>
    );
}

