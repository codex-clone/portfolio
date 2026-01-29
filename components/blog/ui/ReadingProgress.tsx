"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ReadingProgressProps {
    className?: string;
}

export function ReadingProgress({ className }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);

    const updateProgress = useCallback(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, scrollProgress)));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();

        return () => window.removeEventListener("scroll", updateProgress);
    }, [updateProgress]);

    return (
        <div className={className}>
            {/* Progress bar at top of page */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-600"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Circular progress indicator (optional - shown when scrolled) */}
            {progress > 5 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-6 left-6 z-40"
                >
                    <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-zinc-200 dark:text-zinc-700"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${progress * 1.256} 125.6`}
                            />
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8B5CF6" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default ReadingProgress;
