"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Phone() {
    const { scene } = useGLTF("/phone.glb");
    return (
        <primitive
            object={scene}
            scale={0.15}
            position={[0, -1, 0]}
            rotation={[0.2, 0, 0]}
        />
    );
}

export default function PhoneModel() {
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
                    <Phone />
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
