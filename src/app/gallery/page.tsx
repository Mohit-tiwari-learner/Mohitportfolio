import InfiniteGallery from "@/components/ui/3d-gallery-photography";

export default function DemoOne() {
    const projectImages = [
        { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww', alt: 'Financial Resilience ML Pipeline' },
        { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWl8ZW58MHx8MHx8fDA%3D', alt: 'Smart Interview AI' },
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW90fGVufDB8fDB8fHww', alt: 'Vehicle Parking Management' },
        { src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8M2QfGVufDB8fDB8fHww', alt: '3D Infinite Gallery' },
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfHw%3D', alt: 'Data Analytics' },
        { src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VjdXJpdHl8ZW58MHx8MHx8fDA%3D', alt: 'Cybersecurity Solutions' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR8ZW58MHx8MHx8fDA%3D', alt: 'Cloud Computing' },
        { src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww', alt: 'Mobile Development' },
    ];

    return (
        <main className="min-h-screen h-full w-full">
            <InfiniteGallery
                images={projectImages}
                speed={1.2}
                zSpacing={3}
                visibleCount={12}
                falloff={{ near: 0.8, far: 14 }}
                className="h-screen w-full rounded-lg overflow-hidden"
            />
            <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
                <h1 className="font-serif text-4xl md:text-7xl tracking-tight">
                    <span className="italic">Shadway</span>
                </h1>
            </div>

            <div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold">
                <p>Use mouse wheel, arrow keys, or touch to navigate</p>
                <p className=" opacity-60">
                    Auto-play resumes after 3 seconds of inactivity
                </p>
            </div>
        </main>
    );
}