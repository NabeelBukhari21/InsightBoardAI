"use client";

import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    onClick?: () => void;
}

export default function Card({ children, className = "", hover: _hover, glow = false, onClick }: CardProps) {
    return (
        <div
            className={`glass-card p-6 ${glow ? "glow" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
