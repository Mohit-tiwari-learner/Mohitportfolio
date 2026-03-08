"use client";

import Spline from "@splinetool/react-spline";

interface SplineRobotProps {
    scene: string;
    className?: string;
}

export default function SplineRobot({ scene, className }: SplineRobotProps) {
    return (
        <Spline
            scene={scene}
            className={className}
        />
    );
}
