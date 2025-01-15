"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import {
  IconBrandPython,
  IconBrandGithub,
  IconBrandAzure,
  IconBrandSpotify,
  IconRobot,
  IconBrandTelegram,
  IconBrandOpenai,
} from "@tabler/icons-react";

interface ProjectLink {
  repo?: string;
  demo?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  links?: ProjectLink;
}

export function FeaturesSectionWithHoverEffects() {
  const features: Feature[] = [
    {
      title: "WriteAI",
      description:
        "Modern web application leveraging various AI models to generate optimized content for different platforms. Built with TypeScript, React, FastAPI, and TailwindCSS.",
      icon: <IconBrandOpenai className="w-8 h-8" />,
      links: {
        repo: "https://github.com/pschoudhary-dot/WriteAI",
      },
    },
    {
      title: "NeoLM",
      description:
        "An opensource fullstack project that mimics the features of NotebookLM, providing an enhanced note-taking experience with AI capabilities.",
      icon: <IconBrandOpenai className="w-8 h-8" />,
      links: {
        repo: "https://github.com/pschoudhary-dot/NeoLM",
      },
    },
    {
      title: "SPOPITT",
      description:
        "Context-aware music recommendation system based on user mood and time of day. Built with Python, Flask, Spotify API, and TensorFlow.",
      icon: <IconBrandSpotify className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-debug/Spopitt",
      },
    },
    {
      title: "Literna Chat Bot",
      description: 
        "Python-based Telegram bot powered by Google's Gemini API for intelligent conversations.",
      icon: <IconBrandTelegram className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-debug/Literna-Bot",
      },
    },
    {
      title: "Multi-Function App",
      description: 
        "Streamlit app featuring article scraping, auto dashboard, text summarization, and data preprocessing capabilities.",
      icon: <IconBrandPython className="w-8 h-8" />,
      links: {
        repo: "https://github.com/pschoudhary-dot/Multifunc-Streamlit-APP",
      },
    },
    {
      title: "Face Recognition System",
      description:
        "Real-time face detection and recognition system using OpenCV and Streamlit.",
      icon: <IconRobot className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-debug/face_recog_streamlit",
      },
    },
    {
      title: "PDF Chat App",
      description:
        "An innovative application using Google's Gemini model for interactive PDF document conversations.",
      icon: <IconBrandPython className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-debug/PDF-chatapp",
      },
    },
    {
      title: "Cogito.ai",
      description: 
        "AI-powered development assistant built with TypeScript, focusing on enhanced coding productivity.",
      icon: <IconBrandOpenai className="w-8 h-8" />,
      links: {
        repo: "https://github.com/pschoudhary-dot/cogito.ai",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  links,
  index,
}: Feature & { index: number }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 mb-4">
        {description}
      </p>
      {links && (
        <div className="flex items-center gap-3 px-10 relative z-10">
          {links.repo && (
            <Link 
              href={links.repo} 
              target="_blank"
              className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            >
              <Github className="size-4" />
              <span>Repository</span>
            </Link>
          )}
          {links.demo && (
            <Link 
              href={links.demo} 
              target="_blank"
              className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            >
              <ExternalLink className="size-4" />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
} 