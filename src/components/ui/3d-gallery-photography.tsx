"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, Environment, Fog } from "@react-three/drei";
import * as TWO from "three";
import { cn } from "@/lib/utils";

interface GalleryProps {
    images: { src: string; alt: string }[];
    speed?: number;
    zSpacing?: number;
    visibleCount?: number;
    falloff?: { near: number; far: number };
    className?: string;
}

function GalleryItem({
    index,
    image,
    zSpacing,
    visibleCount,
    speed,
    count,
    falloff
}: {
    index: number;
    image: { src: string; alt: string };
    zSpacing: number;
    visibleCount: number;
    speed: number;
    count: number;
    falloff: { near: number; far: number };
}) {
    const ref = useRef<any>(null);
    const { viewport, camera } = useThree();

    // Calculate initial position
    const position = useMemo(() => {
        const z = -index * zSpacing;
        return new TWO.Vector3(0, 0, z);
    }, [index, zSpacing]);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Move properly along Z
        ref.current.position.z += speed * delta;

        // Reset position for infinite loop effect
        const totalDepth = count * zSpacing;
        if (ref.current.position.z > zSpacing) {
            ref.current.position.z -= totalDepth;
        }

        // Calculate opacity/fade based on distance
        const dist = Math.abs(ref.current.position.z);
        // Simple fade logic (optional, can depend on Fog)
    });

    return (
        <Image
            ref={ref}
            url={image.src}
            transparent
            position={position}
            scale={[3, 2]} // Aspect ratio 3:2 roughly
        // opacity will be handled by fog mostly
        />
    );
}

function GalleryScene({ images, speed, zSpacing, visibleCount, falloff }: Required<Omit<GalleryProps, "className">>) {
    const groupRef = useRef<TWO.Group>(null);

    useFrame((state, delta) => {
        // Global movement if needed, but per-item is easier for infinite loop
    });

    return (
        <group ref={groupRef}>
            {images.map((img, i) => (
                <GalleryItem
                    key={i}
                    index={i}
                    image={img}
                    zSpacing={zSpacing}
                    visibleCount={visibleCount}
                    speed={speed}
                    count={images.length}
                    falloff={falloff}
                />
            ))}
        </group>
    );
}


// Improved Implementation with proper circular buffer logic
function InfiniteGalleryScene({ images, speed, zSpacing, visibleCount, falloff }: any) {
    const { gl, scene } = useThree();

    // Add fog for depth
    scene.fog = new TWO.Fog('#000000', falloff.near, falloff.far);

    return (
        <>
            {images.map((img: any, i: number) => (
                <InfiniteConfig key={i} index={i} total={images.length} image={img} speed={speed} zSpacing={zSpacing} />
            ))}
        </>
    )
}

function InfiniteConfig({ index, total, image, speed, zSpacing }: any) {
    const ref = useRef<any>();
    const { width: w, height: h } = useThree((state) => state.viewport);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Move towards camera
        ref.current.position.z += delta * speed;

        // If passes camera, move to back
        if (ref.current.position.z >= 2) {
            ref.current.position.z = -(total * zSpacing) + 2;
        }
    });

    // Initial Z position
    const initialZ = -(index * zSpacing);

    return (
        <Image
            ref={ref}
            url={image.src}
            transparent
            position={[0, 0, initialZ]}
            scale={[w / 3, w / 3 / 1.5]}
        />
    )
}


export default function InfiniteGallery({
    images,
    speed = 1,
    zSpacing = 3,
    visibleCount = 10,
    falloff = { near: 0, far: 10 },
    className
}: GalleryProps) {
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768);
    const canvasDpr: [number, number] = isTouchDevice ? [1, 1] : [1, 1.5];

    return (
        <div className={cn("relative bg-black", className)}>
            <Canvas gl={{ antialias: false }} dpr={canvasDpr}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', falloff.near, falloff.far]} />
                <InfiniteGalleryImplementation
                    images={images}
                    speed={speed}
                    zSpacing={zSpacing}
                />
            </Canvas>
        </div>
    );
}

function InfiniteGalleryImplementation({ images, speed, zSpacing }: any) {
    const { viewport } = useThree();

    return (
        <>
            {images.map((img: any, i: number) => (
                <GalleryItemImpl
                    key={i}
                    index={i}
                    total={images.length}
                    img={img}
                    speed={speed}
                    zSpacing={zSpacing}
                    viewport={viewport}
                />
            ))}
        </>
    )
}

function GalleryItemImpl({ index, total, img, speed, zSpacing, viewport }: any) {
    const ref = useRef<any>(null);
    const zPos = -(index * zSpacing);

    useFrame((state, delta) => {
        if (!ref.current) return;

        ref.current.position.z += speed * delta * 5; // Multiplier to match prop feel

        // Reset
        const boundary = 2;
        const resetPos = -(total * zSpacing) + boundary;

        if (ref.current.position.z > boundary) {
            ref.current.position.z = resetPos;
        }
    });

    return (
        <Image
            ref={ref}
            url={img.src}
            alt={img.alt}
            position={[0, 0, zPos]}
            scale={[viewport.width / 2.5, viewport.width / 2.5 / 1.5]}
            transparent
        />
    )
}
