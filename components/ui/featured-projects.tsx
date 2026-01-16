"use client"

import React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"

// Mock data for projects - keeping the grid layout but adapting content
const projects = [
    {
        title: "AI Chat Assistant",
        description:
            "A sophisticated AI chat interface with history, model switching, and multimodal capabilities. Built with Next.js and Vercel AI SDK.",
        githubUrl: "https://github.com",
        demoUrl: "#",
        className: "lg:col-span-3 lg:row-span-2",
    },
    {
        title: "MugShot Studio",
        description:
            "Professional headshot generation platform using advanced SDXL pipelines. Features payments, auth, and cloud storage.",
        githubUrl: "https://github.com",
        demoUrl: "#",
        className: "lg:col-span-2 lg:row-span-2",
    },
    {
        title: "Project Management Dashboard",
        description:
            "Real-time collaborative workspace with kanban boards, calendar views, and team analytics. Uses Supabase for realtime sync.",
        githubUrl: "https://github.com",
        demoUrl: "#",
        className: "lg:col-span-4 lg:row-span-1",
    },
    {
        title: "Content Generator",
        description:
            "LinkedIn and Twitter thread generator optimized for viral engagement.",
        githubUrl: "https://github.com",
        demoUrl: "#",
        className: "lg:col-span-2 lg:row-span-1",
    },
    {
        title: "Portfolio V1",
        description:
            "The previous iteration of my personal site, focusing on 3D interactions.",
        githubUrl: "https://github.com",
        demoUrl: "#",
        className: "lg:col-span-2 lg:row-span-1",
    },
]

interface ProjectCardProps {
    className?: string
    title: string
    description: string
    githubUrl: string
    demoUrl: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    className = "",
    title,
    description,
    githubUrl,
    demoUrl,
}) => {
    return (
        <div
            className={cn(
                "relative border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl p-6 bg-zinc-50 dark:bg-zinc-900/50 min-h-[220px]",
                "flex flex-col justify-between group overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors",
                className
            )}
        >
            <CornerPlusIcons />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                        {description}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800/50">
                    <Link
                        href={demoUrl}
                        target="_blank"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                        View More <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link
                        href={githubUrl}
                        target="_blank"
                        className="inline-flex items-center justify-center p-2 text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        aria-label="View on GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

const CornerPlusIcons = () => (
    <>
        <PlusIcon className="absolute -top-3 -left-3" />
        <PlusIcon className="absolute -top-3 -right-3" />
        <PlusIcon className="absolute -bottom-3 -left-3" />
        <PlusIcon className="absolute -bottom-3 -right-3" />
    </>
)

const PlusIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        strokeWidth="1"
        stroke="currentColor"
        className={`text-zinc-300 dark:text-zinc-700 w-6 h-6 ${className}`}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
)

export default function FeaturedProjects() {
    return (
        <section className="w-full bg-background py-10" id="projects">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Featured Projects
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            A collection of applications demonstrating expertise in AI engineering, full-stack development, and product design.
                        </p>
                    </div>

                    <div className="hidden md:block pb-2">
                        <Link href="https://github.com" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                            View full archive <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-6">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            {...project}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
