"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { FlipWords } from "@/components/ui/flip-words";
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
  X,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { TechnologiesSection } from "@/components/ui/technologies-section";
import { ContactForm } from "@/components/ui/contact-form";
import { Dock, DockIcon } from "@/components/ui/dock";
import { ChatSidebar } from "@/components/ui/chat-sidebar";
import GlassmorphismProfileCard from "@/components/ui/glassmorphism-profile-card";
import { GitHubProjects } from "@/components/ui/github-projects";
import { Footer } from "@/components/ui/modem-animated-footer";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const roles = [
    "AI Engineer",
    "ML Engineer",
    "Prompt Engineer",
    "Full Stack Developer",
    "Backend Engineer"
  ];

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const isScrolled = useScrollTrigger(100);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Removed auto-open sidebar effect - sidebar closed by default

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleItemClick = () => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  const openGenerativeAnswers = () => {
    setIsSidebarOpen(false);
    setIsChatOpen(true);
  };

  const educationData = [
    {
      title: "Bachelor's Degree",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Bachelor's Degree in Artificial Intelligence and Data Science</h3>
          <p className="text-gray-600">Uka Tarsadia University</p>
          <p className="text-gray-500 mb-2">Sep 2021 - Jul 2025 (Completed)</p>
          <p className="text-gray-500 text-sm">Skills: Pattern Recognition, Data Mining, AI, Flask, Data Structures, PyTorch, Hadoop, SciPy, Deep Learning, Pandas, Data Analytics</p>
        </div>
      ),
    },
    {
      title: "Grade XII",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Grade XII, Science</h3>
          <p className="text-gray-600">Gyanjyot School</p>
          <p className="text-gray-500">Physics, Chemistry, Maths</p>
          <p className="text-gray-500 text-sm mt-1">Skills: Probability, Team Leadership, Time Management, Statistics</p>
        </div>
      ),
    },
    {
      title: "Grade X",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Grade X</h3>
          <p className="text-gray-600">NILKANTH VIDYALAYA</p>
        </div>
      ),
    },
  ];

  const experienceData = [
    {
      title: "2026",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Developer & Founder - MugShot Studio</h3>
            <p className="text-gray-600 mb-4">Dec 2025 – Present</p>
            <div className="text-gray-600">
              <p className="mb-2">Self-employed</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Founder & Developer - Syntax & Sips</h3>
            <p className="text-gray-600 mb-4">Oct 2025 – Present</p>
            <div className="text-gray-600">
              <p className="mb-2">India</p>
              <p className="text-gray-500">Built a content platform for ML, DS, and developer education; weekly playbooks and tutorials.</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Software Testing as User - Nothing</h3>
            <p className="text-gray-600 mb-4">Feb 2023 – Present</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: India (Remote)</p>
              <p className="text-gray-500">Skills: Testing, Communication, Manual Testing</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Junior AI/ML backend Engineer - EnactOn Technologies</h3>
            <p className="text-gray-600 mb-4">Jul 2025 – Nov 2025</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Surat, Gujarat, India (On-site)</p>
              <p className="text-gray-500">Full-time</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Jr. AI/ML Engineer - Proposal.biz</h3>
            <p className="text-gray-600 mb-4">Jul 2025 – Nov 2025</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Surat, Gujarat, India (Hybrid)</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">A.I Prompt Engineer Intern - EnactOn Technologies</h3>
            <p className="text-gray-600 mb-4">Dec 2024 – Jul 2025</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: India (On-site)</p>
              <p className="text-gray-500">Skills: Artificial Intelligence (AI), Generative AI Studio, Machine Learning Algorithms</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Community Member - Generation Nothing</h3>
            <p className="text-gray-600 mb-4">Jun 2023 – Oct 2025</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: India (Remote)</p>
              <p className="text-gray-500">Skills: Communication</p>
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
            <h3 className="text-xl font-semibold text-gray-900">Amalthea 2024 Hackathon (IIT Gandhinagar)</h3>
            <p className="text-gray-600 mb-4">Dec 2024 – Dec 2024</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Gandhinagar, Gujarat, India (On-site)</p>
              <p className="text-gray-500">AI Engineer | Top 7/50 Teams. Built a multilingual healthcare app with AI-driven IVR.</p>
              <p className="text-gray-500 text-sm mt-1">Tech Stack: Python, FastAPI, Dialogflow, Twilio, Gemini, PyTorch</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI/ML Intern - JBcodeapp</h3>
            <p className="text-gray-600 mb-4">May 2024 – Jun 2024</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Greater Surat Area (On-site)</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Image-based Face Recognition using face_recognition library</li>
                <li>Real-time Video Face Recognition with OpenCV</li>
                <li>Applied AI/ML techniques to enhance web functionalities</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI/ML Engineer Intern - ALGOBRAIN AI</h3>
            <p className="text-gray-600 mb-4">Sep 2023 – Jan 2024</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Surat, Gujarat, India (On-site)</p>
              <p className="text-gray-500">Skills: Rasa, Dialogflow, TensorFlow, Communication</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Moderator - Google Developer Students Club</h3>
            <p className="text-gray-600 mb-4">Jun 2022 – Sep 2023</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Surat, Gujarat, India</p>
              <p className="text-gray-500">Skills: Communication, Time Management, Team Management</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Moderator - Google Developer Students Club</h3>
          <p className="text-gray-600 mb-4">Jun 2022 – Sep 2023</p>
          <div className="text-gray-600">
            <p className="mb-2">Location: Surat, Gujarat, India</p>
            <p className="text-gray-500">Started role as Moderator.</p>
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Freelance Editor - Fiverr</h3>
          <p className="text-gray-600 mb-4">Feb 2021 – Jul 2023</p>
          <div className="text-gray-600">
            <p className="text-gray-500">Skills: Adobe Premiere Pro, Blender, Lightroom, After Effects, Photoshop</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Menu Button - Hidden when chat is open */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-[60] flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg backdrop-blur transition hover:shadow-xl hover:text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:text-purple-400"
          aria-expanded={isSidebarOpen}
          aria-controls="portfolio-sidebar"
        >
          {isSidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          Menu
        </button>
      )}

      {/* Generative Answers Button - Hidden when chat or menu is open */}
      {!isChatOpen && !isSidebarOpen && (
        <button
          type="button"
          onClick={openGenerativeAnswers}
          className="fixed right-4 top-4 z-[60] flex items-center gap-2 rounded-full border border-purple-200 bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:shadow-xl hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        >
          <Sparkles className="size-4" />
          Generative Answers
        </button>
      )}

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              key="sidebar"
              id="portfolio-sidebar"
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-zinc-200 bg-white/95 pb-10 pt-16 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <MenuVertical menuItems={navItems} color="#A78BFA" skew={-8} onItemClick={handleItemClick} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main
        className={cn(
          "min-h-screen bg-white dark:bg-zinc-950 transition-[padding] duration-300",
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

          {/* Two-column layout container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

            {/* Desktop: Left side - Text and Icons (hidden on mobile) */}
            <div className="hidden md:flex flex-1 flex-col items-center lg:items-center">
              <TextEffect
                preset="slide"
                trigger={!isScrolled}
                className="block text-center"
                as="div"
                delay={0.2}
                duration={0.8}
              >
                <WordPullUp
                  words="PRASHANT CHOUDHARY"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
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
                <div className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 flex items-center justify-center gap-2">
                  <span>I am an</span>
                  <FlipWords
                    words={roles}
                    className="text-purple-600 dark:text-purple-400 font-semibold"
                    duration={4000}
                  />
                </div>
              </TextEffect>

              <TextEffect
                preset="fade"
                trigger={!isScrolled}
                delay={0.8}
                duration={1}
                as="div"
                className="flex justify-center"
              >
                <Dock
                  direction="middle"
                  className="bg-white/5 border-gray-200/10"
                  magnification={35}
                  distance={80}
                >
                  <DockIcon>
                    <Link href="https://www.linkedin.com/in/mr-dark-debug" target="_blank" className="text-gray-600 hover:text-purple-500 transition-all duration-500">
                      <Linkedin className="size-5 sm:size-6" />
                    </Link>
                  </DockIcon>
                  <DockIcon>
                    <Link href="https://github.com/Mr-Dark-Debug" target="_blank" className="text-gray-600 hover:text-purple-500 transition-all duration-500">
                      <Github className="size-5 sm:size-6" />
                    </Link>
                  </DockIcon>
                  <DockIcon>
                    <Link href="mailto:prashantc592114@gmail.com" className="text-gray-600 hover:text-purple-500 transition-all duration-500">
                      <Mail className="size-5 sm:size-6" />
                    </Link>
                  </DockIcon>
                </Dock>
              </TextEffect>
            </div>

            {/* Profile Card - Shown on all sizes, centered on mobile */}
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center">
              <GlassmorphismProfileCard
                name="Prashant Choudhary"
                role="AI Engineer & Full Stack Developer"
                email="prashantc592114@gmail.com"
                statusText="Available for work"
                glowText="Building the Future with AI"
              />

              {/* Mobile: Social Icons below card */}
              <div className="md:hidden mt-8">
                <Dock
                  direction="middle"
                  className="bg-white/5 border-gray-200/10"
                  magnification={35}
                  distance={80}
                >
                  <DockIcon>
                    <Link href="https://www.linkedin.com/in/mr-dark-debug" target="_blank" className="text-gray-600 hover:text-purple-500 transition-all duration-500">
                      <Linkedin className="size-6" />
                    </Link>
                  </DockIcon>
                  <DockIcon>
                    <Link href="https://github.com/Mr-Dark-Debug" target="_blank" className="text-gray-600 hover:text-purple-500 transition-all duration-500">
                      <Github className="size-6" />
                    </Link>
                  </DockIcon>
                  <DockIcon>
                    <Link href="mailto:prashantc592114@gmail.com" className="text-gray-600 hover:text-purple-500 transition-all duration-500">
                      <Mail className="size-6" />
                    </Link>
                  </DockIcon>
                </Dock>
              </div>
            </div>
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
        <GitHubProjects
          username="Mr-Dark-Debug"
          organizations={["PocketLLM", "syntaxandsips", "codex-clone"]}
          maxProjects={30}
        />

        {/* Skills Section */}
        <section id="skills" className="w-full">
          <TechnologiesSection />
        </section>

        {/* Contact Section - Hidden for now */}
        {/* <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6">
          <ContactForm />
        </section> */}

        {/* Footer */}
        <Footer
          brandName="Prashant Choudhary"
          brandDescription="AI/ML Engineer & Full Stack Developer building innovative solutions with cutting-edge technology."
          socialLinks={[
            { icon: <Github className="w-6 h-6" />, href: "https://github.com/Mr-Dark-Debug", label: "GitHub" },
            { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/mr-dark-debug", label: "LinkedIn" },
            { icon: <Mail className="w-6 h-6" />, href: "mailto:prashantc592114@gmail.com", label: "Email" }
          ]}
          navLinks={[
            { label: "Home", href: "#home" },
            { label: "Education", href: "#education" },
            { label: "Experience", href: "#experience" },
            { label: "Projects", href: "#projects" },
            { label: "Skills", href: "#skills" }
          ]}
          creatorName="Prashant Choudhary"
          creatorUrl="https://github.com/Mr-Dark-Debug"
          brandIcon={
            <Image
              src="/professional.png"
              alt="Prashant"
              width={80}
              height={80}
              className="rounded-xl object-cover w-full h-full"
            />
          }
        />

        <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </>
  );
}
