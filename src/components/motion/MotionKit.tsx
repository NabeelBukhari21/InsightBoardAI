"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion, type Variants, type Transition } from "framer-motion";

// ─── Reduced Motion Hook ─────────────────────────────
export function useMotionSafe() {
    const prefersReduced = useReducedMotion();
    return !prefersReduced;
}

// ─── Viewport Reveal Wrapper ─────────────────────────
// Animates children when they scroll into view (once)
interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    scale?: boolean;
    blur?: boolean;
    once?: boolean;
    threshold?: number;
    stagger?: number;
}

export function Reveal({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    direction = "up",
    distance = 24,
    scale = false,
    blur = false,
    once = true,
    threshold = 0.15,
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });
    const motionSafe = useMotionSafe();

    const dirMap: Record<string, { x?: number; y?: number }> = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    };

    if (!motionSafe) {
        return <div ref={ref} className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                ...dirMap[direction],
                ...(scale ? { scale: 0.95 } : {}),
                ...(blur ? { filter: "blur(8px)" } : {}),
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
            } : undefined}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

// ─── Stagger Container ───────────────────────────────
// Reveals children one by one with stagger delay
interface StaggerProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
    threshold?: number;
}

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0,
        },
    },
};

export function StaggerContainer({
    children,
    className = "",
    stagger = 0.08,
    delay = 0,
    threshold = 0.1,
}: StaggerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const motionSafe = useMotionSafe();

    if (!motionSafe) {
        return <div ref={ref} className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: stagger, delayChildren: delay },
                },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {children}
        </motion.div>
    );
}

// Child item for use inside StaggerContainer
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "left" | "right" | "none";
}

const itemVariants: Record<string, Variants> = {
    up: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    },
    left: {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    },
    right: {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    },
    none: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
    },
};

export function StaggerItem({ children, className = "", direction = "up" }: StaggerItemProps) {
    return (
        <motion.div className={className} variants={itemVariants[direction]}>
            {children}
        </motion.div>
    );
}

// ─── Animated Counter ────────────────────────────────
// Animates a number from 0 to target when in view
interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
    decimals?: number;
}

export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 1.2,
    className = "",
    decimals = 0,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const motionSafe = useMotionSafe();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView || !motionSafe) {
            if (!motionSafe) {
                const timer = setTimeout(() => setDisplay(value), 0);
                return () => clearTimeout(timer);
            }
            return;
        }

        const start = Date.now();
        const dur = duration * 1000;

        const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / dur, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(eased * value);
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [isInView, value, duration, motionSafe]);

    return (
        <span ref={ref} className={className}>
            {prefix}{decimals > 0 ? display.toFixed(decimals) : Math.round(display)}{suffix}
        </span>
    );
}

// ─── Glow Pulse ──────────────────────────────────────
// A soft pulsing glow for key elements
interface GlowPulseProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
}

export function GlowPulse({ children, className = "", color = "rgba(99, 102, 241, 0.15)" }: GlowPulseProps) {
    const motionSafe = useMotionSafe();

    if (!motionSafe) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            animate={{
                boxShadow: [
                    `0 0 20px ${color}`,
                    `0 0 40px ${color}`,
                    `0 0 20px ${color}`,
                ],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}

// ─── Progressive Text Reveal ─────────────────────────
// Typewriter-like effect for headlines
interface TextRevealProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
}

export function TextReveal({ text, className = "", speed = 30, delay = 0 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const motionSafe = useMotionSafe();
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (!isInView || !motionSafe) {
            if (!motionSafe) {
                const timer = setTimeout(() => setDisplayed(text), 0);
                return () => clearTimeout(timer);
            }
            return;
        }

        let i = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                i++;
                setDisplayed(text.slice(0, i));
                if (i >= text.length) clearInterval(interval);
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
    }, [isInView, text, speed, delay, motionSafe]);

    return (
        <span ref={ref} className={className}>
            {displayed}
            {motionSafe && displayed.length < text.length && (
                <motion.span
                    className="inline-block w-[2px] h-[1em] bg-accent-light ml-0.5 align-text-bottom"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            )}
        </span>
    );
}

// ─── Section Wrapper ─────────────────────────────────
// Consistent section reveal with header animation
interface SectionRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
    return (
        <Reveal direction="up" delay={delay} duration={0.5} distance={20} className={className}>
            {children}
        </Reveal>
    );
}

// ─── Smooth Hover Card ───────────────────────────────
// Card with smooth scale + glow on hover
interface HoverCardProps {
    children: React.ReactNode;
    className?: string;
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
    const motionSafe = useMotionSafe();

    if (!motionSafe) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            whileHover={{
                y: -2,
                transition: { duration: 0.25, ease: "easeOut" },
            }}
        >
            {children}
        </motion.div>
    );
}
