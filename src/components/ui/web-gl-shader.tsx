"use client"

import { useEffect, useRef } from "react"

export function WebGLShader({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null
        if (!gl) return

        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `

        const fragmentShaderSource = `
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

        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            return shader
        }

        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

        const program = gl.createProgram()!
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        gl.useProgram(program)

        // Full-screen quad
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1])
        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

        const positionLoc = gl.getAttribLocation(program, "position")
        gl.enableVertexAttribArray(positionLoc)
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

        const resolutionLoc = gl.getUniformLocation(program, "resolution")
        const timeLoc = gl.getUniformLocation(program, "time")
        const xScaleLoc = gl.getUniformLocation(program, "xScale")
        const yScaleLoc = gl.getUniformLocation(program, "yScale")
        const distortionLoc = gl.getUniformLocation(program, "distortion")

        let animationId: number
        let startTime = performance.now()

        const resize = () => {
            const w = container.clientWidth
            const h = container.clientHeight
            canvas.width = w
            canvas.height = h
            gl.viewport(0, 0, w, h)
        }

        const animate = () => {
            const elapsed = (performance.now() - startTime) / 1000
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
            gl.uniform1f(timeLoc, elapsed)
            gl.uniform1f(xScaleLoc, 1.0)
            gl.uniform1f(yScaleLoc, 0.5)
            gl.uniform1f(distortionLoc, 0.05)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
            animationId = requestAnimationFrame(animate)
        }

        resize()
        animate()
        window.addEventListener("resize", resize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener("resize", resize)
            gl.deleteProgram(program)
            gl.deleteShader(vertexShader)
            gl.deleteShader(fragmentShader)
            gl.deleteBuffer(buffer)
        }
    }, [])

    return (
        <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className ?? ""}`}>
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    )
}
