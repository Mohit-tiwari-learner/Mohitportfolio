"use client";
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './CollisionFallingText.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface CollisionFallingTextProps {
    text: string;
    className?: string;
    navbarHeight?: number;
    onCollision?: () => void;
    highlightedWords?: string[];
}

const CollisionFallingText: React.FC<CollisionFallingTextProps> = ({
    text,
    className = '',
    navbarHeight = 80,
    onCollision,
    highlightedWords = [],
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<HTMLSpanElement[]>([]);
    const [letters, setLetters] = useState<Array<{ char: string; isHighlighted: boolean; isSpace: boolean }>>([]);
    const animationStartedRef = useRef(false);
    const animationActiveRef = useRef(false);

    // Parse text and identify highlighted words
    useEffect(() => {
        const words = text.split(/(\s+)/); // Split by spaces but keep them
        const letterArray: Array<{ char: string; isHighlighted: boolean; isSpace: boolean }> = [];

        words.forEach((word) => {
            const isSpace = /^\s+$/.test(word);
            const isHighlighted = !isSpace && highlightedWords.some(hw =>
                word.toLowerCase().includes(hw.toLowerCase())
            );

            for (let i = 0; i < word.length; i++) {
                letterArray.push({
                    char: word[i],
                    isHighlighted,
                    isSpace
                });
            }
        });

        setLetters(letterArray);
    }, [text, highlightedWords]);

    // Initialize the falling animation
    useEffect(() => {
        if (!textRef.current || letters.length === 0) return;

        const textElement = textRef.current;
        const containerElement = containerRef.current;
        if (!containerElement) return;

        const updateCollisionDetection = () => {
            if (!textElement) return;

            const textRect = textElement.getBoundingClientRect();
            const textTop = textRect.top;
            const collisionPoint = navbarHeight;

            if (textTop <= collisionPoint && !animationStartedRef.current) {
                animationStartedRef.current = true;
                animationActiveRef.current = true;
                onCollision?.();
                triggerFallingAnimation();
            } else if (textTop > collisionPoint && animationStartedRef.current && animationActiveRef.current) {
                reverseFallingAnimation();
                animationStartedRef.current = false;
                animationActiveRef.current = false;
            }
        };

        const triggerFallingAnimation = () => {
            // Fall off-screen and disappear
            const fallDistance = window.innerHeight;

            lettersRef.current.forEach((letter, index) => {
                if (!letter) return;

                gsap.set(letter, {
                    y: 0,
                    x: 0,
                    opacity: 1,
                    rotationZ: 0,
                    filter: 'blur(0px)'
                });

                const randomX = (Math.random() - 0.5) * 300;
                const randomRotation = (Math.random() - 0.5) * 720;
                const randomDelay = index * 0.03;
                const fallDuration = 1.2 + Math.random() * 0.6;

                gsap.to(letter, {
                    y: fallDistance,
                    x: randomX,
                    rotationZ: randomRotation,
                    opacity: 0,
                    filter: 'blur(4px)',
                    duration: fallDuration,
                    delay: randomDelay,
                    ease: 'power3.in',
                });
            });
        };

        const reverseFallingAnimation = () => {
            lettersRef.current.forEach((letter, index) => {
                if (!letter) return;

                const randomDelay = index * 0.02;

                gsap.to(letter, {
                    y: 0,
                    x: 0,
                    rotationZ: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    delay: randomDelay,
                    ease: 'power2.out'
                });
            });
        };

        const scrollTrigger = ScrollTrigger.create({
            onUpdate: () => {
                updateCollisionDetection();
            }
        });

        window.addEventListener('scroll', updateCollisionDetection, true);

        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', updateCollisionDetection, true);
            window.removeEventListener('resize', handleResize);
            scrollTrigger.kill();
        };
    }, [letters, navbarHeight, onCollision]);

    return (
        <div
            ref={containerRef}
            className={`collision-falling-text-container ${className}`}
            style={{
                position: 'relative',
                display: 'block',
                perspective: '1200px',
                fontFamily: 'inherit',
                maxWidth: '100%',
                width: '100%'
            }}
        >
            <div
                ref={textRef}
                className="collision-falling-text"
                style={{
                    display: 'block',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    fontFamily: 'inherit',
                    fontWeight: '700',
                    fontSize: 'clamp(28px, 6vw, 42px)',
                    letterSpacing: '0.4px',
                    lineHeight: '1.18',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                    wordBreak: 'normal',
                    hyphens: 'none'
                }}
            >
                {(() => {
                    // Group letters back into words so each word stays on one line
                    const wordGroups: Array<{ letters: typeof letters; isSpace: boolean }> = [];
                    let current: typeof letters = [];
                    let currentIsSpace = letters[0]?.isSpace ?? false;

                    letters.forEach((l) => {
                        if (l.isSpace !== currentIsSpace) {
                            if (current.length) wordGroups.push({ letters: current, isSpace: currentIsSpace });
                            current = [l];
                            currentIsSpace = l.isSpace;
                        } else {
                            current.push(l);
                        }
                    });
                    if (current.length) wordGroups.push({ letters: current, isSpace: currentIsSpace });

                    let globalIdx = 0;
                    return wordGroups.map((group, gi) => {
                        const groupSpans = group.letters.map((letterObj) => {
                            const idx = globalIdx++;
                            return (
                                <span
                                    key={idx}
                                    ref={(el) => { if (el) lettersRef.current[idx] = el; }}
                                    className={`falling-letter ${letterObj.isHighlighted ? 'highlighted' : ''} ${letterObj.isSpace ? 'space-char' : ''}`}
                                    style={{
                                        display: 'inline-block',
                                        position: 'relative',
                                        willChange: 'transform, opacity, filter',
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)',
                                        fontFamily: 'inherit',
                                        fontWeight: 700,
                                        fontSize: 'inherit',
                                        color: letterObj.isHighlighted ? 'rgb(107, 114, 128)' : 'currentColor',
                                        letterSpacing: '0.4px',
                                        lineHeight: '1.18',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {letterObj.char}
                                </span>
                            );
                        });

                        // Spaces render inline (allow wrapping after them)
                        if (group.isSpace) {
                            return <React.Fragment key={`g${gi}`}>{groupSpans}</React.Fragment>;
                        }

                        // Words get a nowrap wrapper so they never split
                        return (
                            <span key={`g${gi}`} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                                {groupSpans}
                            </span>
                        );
                    });
                })()}
            </div>
        </div>
    );
};

export default CollisionFallingText;
