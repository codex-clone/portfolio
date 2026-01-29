"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogLayoutProps {
    children: ReactNode;
    showBackButton?: boolean;
    title?: string;
    className?: string;
}

export function BlogLayout({
    children,
    showBackButton = true,
    title,
    className
}: BlogLayoutProps) {
    return (
        <div className={cn("min-h-screen bg-white", className)}>
            {/* Navigation Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-zinc-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            {showBackButton && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        href="/blog"
                                        className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-purple-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Blog
                                    </Link>
                                </motion.div>
                            )}
                            {title && (
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="text-lg font-semibold text-zinc-900 truncate max-w-md"
                                >
                                    {title}
                                </motion.h1>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-purple-600 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Portfolio</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-zinc-500">
                            © {new Date().getFullYear()} Prashant Choudhary. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/blog"
                                className="text-sm text-zinc-500 hover:text-purple-600 transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/#projects"
                                className="text-sm text-zinc-500 hover:text-purple-600 transition-colors"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/#contact"
                                className="text-sm text-zinc-500 hover:text-purple-600 transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default BlogLayout;
