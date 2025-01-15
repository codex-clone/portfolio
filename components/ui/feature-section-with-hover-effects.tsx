import { cn } from "@/lib/utils";
import {
  IconBrandPython,
  IconBrandGithub,
  IconBrandAzure,
  IconBrandSpotify,
  IconRobot,
  IconBrandTelegram,
  IconBrandOpenai,
} from "@tabler/icons-react";
import { Link } from "@/components/ui/link";

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
      title: "DSVNIT Project",
      description:
        "Object detection model using Faster R-CNN for detecting people in images. Built with Python and PyTorch.",
      icon: <IconBrandPython className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-Debug/dsvnit-project",
      },
    },
    {
      title: "Movie Recommendation",
      description:
        "Content-Based Filtering and Cosine Similarity for personalized movie recommendations using Python, Flask, GitHub, and Azure API.",
      icon: <IconBrandAzure className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-Debug/movie-recommendation",
        demo: "https://movie-recommendation.vercel.app",
      },
    },
    {
      title: "SPOPITT",
      description:
        "Personalized music playlist creator based on user mood and time of day. Built with Python, Flask, Spotify API, and TensorFlow.",
      icon: <IconBrandSpotify className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-Debug/spopitt",
      },
    },
    {
      title: "Literna Chat Bot",
      description: 
        "Conversational AI chat bot for Telegram using RASA framework. Built with Python and NLTK, deployed on Heroku.",
      icon: <IconBrandTelegram className="w-8 h-8" />,
      links: {
        demo: "https://t.me/LiternaBot",
      },
    },
    {
      title: "AI Code Assistant",
      description: 
        "AI-powered code completion and suggestion tool using OpenAI's GPT model. Helps developers write better code faster.",
      icon: <IconBrandOpenai className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-Debug/ai-code-assistant",
      },
    },
    {
      title: "Face Recognition System",
      description:
        "Real-time face detection and recognition system using OpenCV and deep learning models.",
      icon: <IconRobot className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-Debug/face-recognition",
      },
    },
    {
      title: "Web Scraping Tool",
      description:
        "Automated data extraction tool using Python, BeautifulSoup, and Selenium for dynamic web pages.",
      icon: <IconBrandPython className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-Debug/web-scraper",
      },
    },
    {
      title: "GitHub Projects",
      description: 
        "Various open-source contributions and personal projects available on my GitHub profile.",
      icon: <IconBrandGithub className="w-8 h-8" />,
      links: {
        repo: "https://github.com/Mr-Dark-Debug",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature 
          key={feature.title} 
          {...feature} 
          index={index} 
        />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  links,
}: Feature & { index: number }) => {
  return (
    <div
      className="group/feature relative flex flex-col border-[0.5px] border-neutral-200 dark:border-neutral-800 py-10"
    >
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/feature:opacity-100 transition duration-200 pointer-events-none bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent" />
      
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
        <div className="flex gap-2 px-10 relative z-10">
          {links.repo && (
            <Link
              href={links.repo}
              target="_blank"
              variant="outline"
              size="sm"
            >
              View Code
            </Link>
          )}
          {links.demo && (
            <Link
              href={links.demo}
              target="_blank"
              variant="default"
              size="sm"
            >
              Live Demo
            </Link>
          )}
        </div>
      )}
    </div>
  );
}; 