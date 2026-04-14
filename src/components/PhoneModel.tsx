"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useState } from "react";

function Phone({ onClick }: { onClick?: () => void }) {
    const { scene } = useGLTF("/phone.glb");
    const [hovered, setHovered] = useState(false);
    
    // Change cursor dynamically when hovering over the 3D model
    if (typeof window !== "undefined") {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }
    return (
        <primitive
            object={scene}
            scale={0.15}
            position={[0, -1, 0]}
            rotation={[0.2, 0, 0]}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
            }}
        />
    );
}

export default function PhoneModel({ onPhoneClick }: { onPhoneClick?: () => void }) {
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }}
                style={{
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.8} />
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={1.2}
                        castShadow
                    />
                    <pointLight position={[-5, 5, 5]} intensity={0.6} />
                    <Phone onClick={onPhoneClick} />
                    <Environment preset="sunset" />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1}
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
