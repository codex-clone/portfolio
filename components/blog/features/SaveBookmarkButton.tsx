"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { isPostSaved, savePost, unsavePost } from "@/lib/blog/api";

interface SaveBookmarkButtonProps {
    slug: string;
    className?: string;
    showLabel?: boolean;
    size?: "sm" | "md" | "lg";
}

export function SaveBookmarkButton({
    slug,
    className,
    showLabel = false,
    size = "md"
}: SaveBookmarkButtonProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setIsSaved(isPostSaved(slug));
    }, [slug]);

    const handleToggle = useCallback(() => {
        if (isSaved) {
            unsavePost(slug);
            setIsSaved(false);
        } else {
            savePost(slug);
            setIsSaved(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    }, [slug, isSaved]);

    const sizeClasses = {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-3",
    };

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
                className={cn(
                    "flex items-center gap-2 rounded-lg border transition-all duration-200",
                    isSaved
                        ? "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-purple-300 dark:hover:border-purple-700",
                    sizeClasses[size],
                    className
                )}
                aria-label={isSaved ? "Remove from saved" : "Save post"}
            >
                <AnimatePresence mode="wait">
                    {isSaved ? (
                        <motion.span
                            key="saved"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <BookmarkCheck className={iconSizes[size]} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="unsaved"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <Bookmark className={iconSizes[size]} />
                        </motion.span>
                    )}
                </AnimatePresence>
                {showLabel && (
                    <span className="text-sm font-medium">
                        {isSaved ? "Saved" : "Save"}
                    </span>
                )}
            </motion.button>

            {/* Toast notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-50"
                    >
                        Post saved!
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SaveBookmarkButton;
