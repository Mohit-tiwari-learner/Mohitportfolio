"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneRef = useRef<{
        scene: THREE.Scene | null
        camera: THREE.OrthographicCamera | null
        renderer: THREE.WebGLRenderer | null
        mesh: THREE.Mesh | null
        uniforms: any
        animationId: number | null
    }>({
        scene: null,
        camera: null,
        renderer: null,
        mesh: null,
        uniforms: null,
        animationId: null,
    })

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const { current: refs } = sceneRef

        const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

        const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

        const initScene = () => {
            refs.scene = new THREE.Scene()
            refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true }) // Added alpha: true
            refs.renderer.setPixelRatio(window.devicePixelRatio)
            // refs.renderer.setClearColor(new THREE.Color(0x000000)) // Removed to allow transparency if needed, or keeping it black? Footer background is complicated.
            // Keeping it black as per original snippet effectively, but maybe we want it transparent?
            // Original snippet had setClearColor(0x000000). The shader draws over it.
            refs.renderer.setClearColor(new THREE.Color(0x000000), 0) // Make background transparent so it sits on footer?
            // Wait, the shader draws opaque colors? "gl_FragColor = vec4(r, g, b, 1.0);"
            // So it's opaque.
            // The snippet sets clear color 0x000000.
            refs.renderer.setClearColor(new THREE.Color(0x000000))

            refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

            refs.uniforms = {
                resolution: { value: [canvas.width, canvas.height] }, // Use canvas width/height not window
                time: { value: 0.0 },
                xScale: { value: 1.0 },
                yScale: { value: 0.5 },
                distortion: { value: 0.05 },
            }

            const position = [
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                -1.0, 1.0, 0.0,
                1.0, -1.0, 0.0,
                -1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
            ]

            const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute("position", positions)

            const material = new THREE.RawShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: refs.uniforms,
                side: THREE.DoubleSide,
            })

            refs.mesh = new THREE.Mesh(geometry, material)
            refs.scene.add(refs.mesh)

            handleResize()
        }

        const animate = () => {
            if (refs.uniforms) refs.uniforms.time.value += 0.01
            if (refs.renderer && refs.scene && refs.camera) {
                refs.renderer.render(refs.scene, refs.camera)
            }
            refs.animationId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            if (!refs.renderer || !refs.uniforms || !containerRef.current) return
            // We need to size it to the container, not the window, if we want it in the footer
            const container = containerRef.current
            const width = container.clientWidth
            const height = container.clientHeight
            refs.renderer.setSize(width, height, false)
            refs.uniforms.resolution.value = [width, height]
        }

        // Need a container ref or assume parent?
        // The snippet uses window.innerWidth.
        // I want to use it in the Footer.
        // I'll wrap the canvas in a div that fills the parent, and size the canvas to that div.

        initScene()
        animate()
        window.addEventListener("resize", handleResize)

        return () => {
            if (refs.animationId) cancelAnimationFrame(refs.animationId)
            window.removeEventListener("resize", handleResize)
            if (refs.mesh) {
                refs.scene?.remove(refs.mesh)
                refs.mesh.geometry.dispose()
                if (refs.mesh.material instanceof THREE.Material) {
                    refs.mesh.material.dispose()
                }
            }
            refs.renderer?.dispose()
        }
    }, [])

    // Create a local ref for the container to measure size
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
        </div>
    )
}
