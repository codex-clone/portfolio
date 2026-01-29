"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TableOfContentsItem } from "@/lib/blog/types";

interface TableOfContentsProps {
    items: TableOfContentsItem[];
    className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState(true);

    const handleScroll = useCallback(() => {
        const headings = items.map(item => document.getElementById(item.id)).filter(Boolean);

        const current = headings.find((heading) => {
            if (!heading) return false;
            const rect = heading.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= 200;
        });

        if (current) {
            setActiveId(current.id);
        }
    }, [items]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    if (items.length === 0) {
        return null;
    }

    return (
        <nav className={cn("relative", className)}>
            <div className="sticky top-24">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 mb-4 text-sm font-semibold text-zinc-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                    <motion.span
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </motion.span>
                    Table of Contents
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <ul className="space-y-2 border-l-2 border-zinc-200 dark:border-zinc-700 pl-4">
                                {items.map((item) => (
                                    <li
                                        key={item.id}
                                        style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                                    >
                                        <Link
                                            href={`#${item.id}`}
                                            className={cn(
                                                "block text-sm py-1 transition-all duration-200",
                                                activeId === item.id
                                                    ? "text-purple-600 dark:text-purple-400 font-medium"
                                                    : "text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400"
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const element = document.getElementById(item.id);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: "smooth" });
                                                    setActiveId(item.id);
                                                }
                                            }}
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

export default TableOfContents;
