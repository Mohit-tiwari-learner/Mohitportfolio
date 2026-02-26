"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

function AnimatedSphere({ isDark }: { isDark: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Dynamic material properties based on theme
    const materialColor = isDark ? "#4338ca" : "#a5b4fc"; // Indigo-700 : Indigo-300
    const roughness = isDark ? 0.3 : 0.4;
    const metalness = isDark ? 0.8 : 0.5;

    useFrame((state) => {
        if (!meshRef.current) return;

        // Use R3F's normalized mouse coordinates (-1 to 1)
        const { mouse, viewport } = state;

        // Smooth rotation based on mouse position
        const targetX = (mouse.y * viewport.height) / 4;
        const targetY = (mouse.x * viewport.width) / 4;

        // Lerp for smooth movement
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.1);

        // Breathing animation
        const time = state.clock.elapsedTime;
        const scaleBase = 2.2;
        const scaleVar = Math.sin(time * 0.8) * 0.1;
        meshRef.current.scale.setScalar(scaleBase + scaleVar);

        // Subtle position drift
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 0.5, 0.05);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 0.5, 0.05);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]} ref={meshRef}>
                <MeshDistortMaterial
                    color={materialColor}
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={roughness}
                    metalness={metalness}
                    envMapIntensity={isDark ? 0.8 : 1.2}
                />
            </Sphere>
        </Float>
    );
}

function Scene({ isDark }: { isDark: boolean }) {
    return (
        <>
            <Environment preset={isDark ? "city" : "studio"} />
            <ambientLight intensity={isDark ? 0.2 : 0.8} />
            <directionalLight position={[10, 10, 5]} intensity={isDark ? 2 : 1} color={isDark ? "#818cf8" : "#ffffff"} />
            <spotLight position={[-10, -10, -5]} intensity={1} color={isDark ? "#ec4899" : "#ffffff"} />
            <AnimatedSphere isDark={isDark} />
        </>
    );
}

export function InteractiveShape() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === 'dark';

    // Use a ref for the container to act as event source if needed
    // But for global mouse tracking (even over overlay), best to just not set eventSource manually if default works, 
    // or use window.
    // However, if we put `pointer-events-none` on the Canvas container, default R3F events (pointermove on canvas) won't fire.
    // So we need to set `eventSource={document.getElementById('root')}` or similar if we want interaction through overlay.
    // Or just `eventSource={document.body}` after mount.

    const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

    useEffect(() => {
        setEventSource(document.body);
    }, []);

    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                shadows={false}
                eventSource={eventSource}
                eventPrefix="client"
                className="pointer-events-none"
            >
                <Suspense fallback={null}>
                    <Scene isDark={isDark} />
                </Suspense>
            </Canvas>
        </div>
    );
}
