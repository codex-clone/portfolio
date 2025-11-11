"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { TextEffect } from "@/components/ui/text-effect";
import { MenuVertical } from "@/components/ui/menu-vertical";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { ProjectsSection } from "@/components/ui/projects-section";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { Dock, DockIcon } from "@/components/ui/dock";
import { ChatWidget } from "@/components/ui/chat-widget";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
    { label: "Generative Answers", href: "/ai" }
  ];

  const isScrolled = useScrollTrigger(100);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleItemClick = () => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  const educationData = [
    {
      title: "2021-2025",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">B.Tech, Artificial Intelligence & Data Science</h3>
          <p className="text-gray-600">UTU (CGPIT)</p>
          <p className="text-gray-500">CGPA ≈ 7.26</p>
        </div>
      ),
    },
  ];

  const experienceData = [
    {
      title: "2024-Present",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI Prompt Engineer → Jr. AI/ML Engineer - EnactOn Technologies</h3>
            <p className="text-gray-600 mb-4">Dec 2024 – Present</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Surat, India</p>
              <p className="text-gray-500">Built production LLM agents for content generation, RAG, and workflow automation (LangGraph, FastAPI, Supabase).</p>
            </div>
          </div>
        </div>
      ),
    },
    {
        title: "2024",
        content: (
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">AI/ML Intern - JBCodeApp</h3>
                    <p className="text-gray-600 mb-4">May 2024 – Jun 2024</p>
                    <div className="text-gray-600">
                        <p className="mb-2">Location: Greater Surat Area</p>
                        <p className="text-gray-500">Real-time face recognition (OpenCV) and image pipelines; integrated AI/ML features into web flows.</p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "2023-2024",
        content: (
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">AI/ML Intern - AlgobrainAI</h3>
                    <p className="text-gray-600 mb-4">Sep 2023 – Jan 2024</p>
                    <div className="text-gray-600">
                        <p className="mb-2">Location: Surat</p>
                        <p className="text-gray-500">Chatbot stack with Rasa/Dialogflow; POCs in CV and NLP; documentation and testing.</p>
                    </div>
                </div>
            </div>
        ),
    }
  ];

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-[60] flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg backdrop-blur transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-50"
        aria-expanded={isSidebarOpen}
        aria-controls="portfolio-sidebar"
      >
        {isSidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        Menu
      </button>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {!isDesktop && (
              <motion.div
                key="sidebar-backdrop"
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleItemClick}
              />
            )}
            <motion.aside
              key="sidebar"
              id="portfolio-sidebar"
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-zinc-200 bg-white/95 pb-10 pt-16 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95"
              initial={{ x: isDesktop ? -40 : -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <MenuVertical menuItems={navItems} color="#2563eb" skew={-8} onItemClick={handleItemClick} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main
        className={cn(
          "min-h-screen bg-white transition-[padding] duration-300",
          isSidebarOpen ? "lg:pl-72" : "lg:pl-0"
        )}
      >

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-20 sm:py-32">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)] absolute inset-0"
          numSquares={30}
          maxOpacity={0.15}
          duration={5}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <TextEffect
            preset="slide"
            trigger={!isScrolled}
            className="block"
            as="div"
            delay={0.2}
            duration={0.8}
          >
            <WordPullUp
              words="PRASHANT CHOUDHARY"
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            />
          </TextEffect>
          
          <TextEffect
            preset="scale"
            trigger={!isScrolled}
            delay={0.5}
            duration={0.8}
            className="block"
            as="div"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8">
                AI/ML Engineer & Full-Stack Developer building agentic systems, privacy-respecting AI apps, and fast, pragmatic tooling.
                <br />
                Flutter • FastAPI • Supabase • LangGraph • Next.js.
            </p>
          </TextEffect>

          <TextEffect
            preset="fade"
            trigger={!isScrolled}
            delay={0.8}
            duration={1}
            as="div"
          >
            <Dock 
              direction="middle" 
              className="bg-white/5 border-gray-200/10" 
              magnification={35} 
              distance={80}
            >
              <DockIcon>
                <Link href="https://www.linkedin.com/in/mr-dark-debug" target="_blank" className="text-gray-600 hover:text-gray-900 transition-all duration-500">
                  <Linkedin className="size-5 sm:size-6" />
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="https://github.com/Mr-Dark-Debug" target="_blank" className="text-gray-600 hover:text-gray-900 transition-all duration-500">
                  <Github className="size-5 sm:size-6" />
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="mailto:prashantc592114@gmail.com" className="text-gray-600 hover:text-gray-900 transition-all duration-500">
                  <Mail className="size-5 sm:size-6" />
                </Link>
              </DockIcon>
            </Dock>
          </TextEffect>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-gray-900 font-mono">About Me</h2>
          <p className="text-lg text-gray-700">
            I ship AI-native products end to end: model integration, orchestration, backend APIs, and polished frontends. Recent work includes PocketLLM (cross-platform LLM chat with bring-your-own-keys), EchoGen.ai (AI podcast pipeline from any URL), a Streamlit whiteboard component (tldraw v2), and hiVPN (Flutter VPN client template). I like clean abstractions, measurable impact, and docs that don’t lie.
          </p>
        </div>
      </section>


      {/* Education Section */}
      <section id="education" className="py-16 sm:py-20 px-4 sm:px-6">
        <Timeline 
          data={educationData} 
          title="Educational Journey"
          description="My academic path in Artificial Intelligence and Data Science, showcasing my progression from school to university."
          progressBarColors={{
            from: "emerald-500",
            via: "teal-500"
          }}
        />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6">
        <Timeline 
          data={experienceData} 
          title="Professional Experience"
          description="My journey in the tech industry, working with AI, ML, and software development."
          progressBarColors={{
            from: "indigo-500",
            via: "violet-500"
          }}
        />
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
        <section id="skills" className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6">
            <GradientHeading size="lg" className="text-center mb-8 sm:mb-10 text-3xl sm:text-4xl">
                Technologies
            </GradientHeading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Languages</h3>
                    <ul>
                        <li>Python</li>
                        <li>Dart</li>
                        <li>TypeScript/JavaScript</li>
                        <li>SQL</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Frameworks</h3>
                    <ul>
                        <li>Flutter</li>
                        <li>FastAPI</li>
                        <li>Next.js/React</li>
                        <li>Streamlit</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">AI/Agent</h3>
                    <ul>
                        <li>LangGraph</li>
                        <li>LangChain</li>
                        <li>CrewAI</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Data/Storage</h3>
                    <ul>
                        <li>Supabase</li>
                        <li>PostgreSQL</li>
                        <li>MongoDB</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">ML</h3>
                    <ul>
                        <li>scikit-learn</li>
                        <li>TensorFlow</li>
                        <li>PyTorch</li>
                        <li>OpenCV</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">MLOps</h3>
                    <ul>
                        <li>MLflow</li>
                        <li>Vertex AI</li>
                        <li>SageMaker</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Infra/Tooling</h3>
                    <ul>
                        <li>Docker</li>
                        <li>GitHub Actions</li>
                        <li>Vercel</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Design</h3>
                    <ul>
                        <li>Tailwind</li>
                        <li>ShadCN</li>
                        <li>Framer Motion</li>
                    </ul>
                </div>
            </div>
        </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6">
        <ContactForm />
      </section>

      <ChatWidget />
    </main>
    </>
  );
}
