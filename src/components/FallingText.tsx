import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

interface FallingTextProps {
    className?: string;
    text?: string;
    highlightWords?: string[];
    highlightClass?: string;
    trigger?: 'auto' | 'scroll' | 'click' | 'hover';
    triggerThreshold?: number; // New prop for custom threshold
    backgroundColor?: string;
    wireframes?: boolean;
    gravity?: number;
    mouseConstraintStiffness?: number;
    fontSize?: string;
    baseTextClass?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
    className = '',
    text = '',
    highlightWords = [],
    highlightClass = 'highlighted',
    trigger = 'auto',
    triggerThreshold = 0.1, // Default threshold
    backgroundColor = 'transparent',
    wireframes = false,
    gravity = 1,
    mouseConstraintStiffness = 0.2,
    fontSize, // No default value to allow CSS classes to control size
    baseTextClass = 'text-black dark:text-white'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    const [effectStarted, setEffectStarted] = useState(false);

    useEffect(() => {
        if (!textRef.current) return;
        const words = text.split(' ');
        const newHTML = words
            .map(word => {
                const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
                return `<span class="word ${isHighlighted ? highlightClass : baseTextClass}">${word}</span>`;
            })
            .join(' ');
        textRef.current.innerHTML = newHTML;
    }, [text, highlightWords, highlightClass, baseTextClass]);

    useEffect(() => {
        if (trigger === 'auto') {
            setEffectStarted(true);
            return;
        }
        if (trigger === 'scroll' && containerRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= triggerThreshold) {
                        setEffectStarted(true);
                        observer.disconnect();
                    }
                },
                { threshold: triggerThreshold }
            );
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [trigger, triggerThreshold]);

    useEffect(() => {
        if (!effectStarted) return;
        if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return;

        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

        const containerRect = containerRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) {
            return;
        }

        // Prevent container collapse when children become absolute
        containerRef.current.style.height = `${height}px`;
        containerRef.current.style.width = `${width}px`;

        const engine = Engine.create();
        engine.world.gravity.y = gravity;

        const render = Render.create({
            element: canvasContainerRef.current,
            engine,
            options: {
                width,
                height,
                background: backgroundColor,
                wireframes
            }
        });

        const boundaryOptions = {
            isStatic: true,
            render: { fillStyle: 'transparent' }
        };
        const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

        const wordSpans = textRef.current.querySelectorAll('.word');
        const wordBodies = Array.from(wordSpans).map(elem => {
            const rect = elem.getBoundingClientRect();

            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;

            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                render: { fillStyle: 'transparent' },
                restitution: 0.8,
                frictionAir: 0.01,
                friction: 0.2
            });

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 5,
                y: 0
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

            return { elem: elem as HTMLElement, body };
        });

        wordBodies.forEach(({ elem, body }) => {
            elem.style.position = 'absolute';
            elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
            elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
            elem.style.transform = 'none';
        });

        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: mouseConstraintStiffness,
                render: { visible: false }
            }
        });
        render.mouse = mouse;

        World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        const updateLoop = () => {
            wordBodies.forEach(({ body, elem }) => {
                const { x, y } = body.position;
                elem.style.left = `${x}px`;
                elem.style.top = `${y}px`;
                elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
            });
            Matter.Engine.update(engine);
            requestAnimationFrame(updateLoop);
        };
        updateLoop();

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas && canvasContainerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                canvasContainerRef.current.removeChild(render.canvas);
            }
            World.clear(engine.world);
            Engine.clear(engine);
        };
    }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

    const handleTrigger = () => {
        if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
            setEffectStarted(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className="falling-text-container"
            onClick={trigger === 'click' ? handleTrigger : undefined}
            onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
            style={{
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div
                ref={textRef}
                className={`falling-text-target ${className}`}
                style={{
                    fontSize: fontSize, // Only apply if provided
                    lineHeight: 1
                }}
            />
            <div ref={canvasContainerRef} className="falling-text-canvas" />
        </div>
    );
};

export default FallingText;
