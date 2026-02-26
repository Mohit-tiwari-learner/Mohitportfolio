'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

export default function ZoomParallaxDemo() {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
            alt: 'Abstract Digital Chaos',
            title: 'Complexity',
            description: 'Navigating through the noise of unstructured raw data.',
        },
        {
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            alt: 'Data Dashboard',
            title: 'Analysis',
            description: 'Structure emerges from rigorously analyzing key metrics.',
        },
        {
            src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
            alt: 'Neural Network',
            title: 'Pattern Recognition',
            description: 'Identifying hidden correlations using advanced algorithms.',
        },
        {
            src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
            alt: 'Abstract Light/Clarity',
            title: 'Insight',
            description: 'The moment complexity crystallizes into clear understanding.',
        },
        {
            src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
            alt: 'Futuristic Interface',
            title: 'Smart Decision',
            description: 'Actionable intelligence driving future-proof strategies.',
        },
        {
            src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop',
            alt: 'Flowing Data Stream',
            title: 'Vision',
            description: 'Seeing the future through the lens of data.',
        },
        {
            src: '/data to insight/finance resilence image.png',
            alt: 'Financial Resilience Dashboard',
            title: 'Resilience',
            description: 'Simulating adverse scenarios to ensure system stability.',
        },
    ];

    return (
        <main className="min-h-screen w-full bg-background">
            <div className="relative flex h-[40vh] flex-col items-center justify-center px-4">
                {/* Radial spotlight */}
                <div
                    aria-hidden="true"
                    className={cn(
                        'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
                        'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_70%)]',
                        'blur-[30px]',
                    )}
                />
                <h2 className="text-center text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                    From Data to <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-indigo-500">Insight</span>
                </h2>
                <p className="max-w-xl text-center text-lg text-muted-foreground font-light leading-relaxed">
                    Turning complexity into clarity through structured thinking and intelligent systems.
                </p>
            </div>
            <ZoomParallax images={images} />
            <div className="h-[20vh]" />
        </main>
    );
}