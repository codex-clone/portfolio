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
  X
} from "lucide-react";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import {
  PythonIcon,
  TensorFlowIcon,
  PyTorchIcon,
  OpenCVIcon,
  PandasIcon,
  NumPyIcon,
  ScikitLearnIcon,
  FlaskIcon,
  GitIcon,
  PostgreSQLIcon,
  PowerBIIcon,
  FirebaseIcon,
  NodejsIcon,
  ReactNativeIcon,
  CIcon
} from "@/components/ui/tech-icons";
import { ContactForm } from "@/components/ui/contact-form";
import { Dock, DockIcon } from "@/components/ui/dock";
import { ChatWidget } from "@/components/ui/chat-widget";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const roles = [
    "AI Engineer",
    "ML Engineer",
    "Data Scientist", 
    "Full Stack Developer",
    "Computer Vision Expert"
  ];

  const navItems = [
    { label: "Home", href: "#home" },
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
      title: "Bachelor&apos;s Degree",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Bachelor&apos;s Degree in Artificial Intelligence and Data Science</h3>
          <p className="text-gray-600">Uka Tarsadia University (7th Semester)</p>
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
      title: "2024-25",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">A.I Prompt Engineer Intern - Enacton Technologies</h3>
            <p className="text-gray-600 mb-4">Dec 2024 – Present</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: India (On-site)</p>
              <p className="text-gray-500">Skills: Artificial Intelligence (AI), Generative AI Studio, Machine Learning Algorithms</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI/ML Intern - JBcodeapp</h3>
            <p className="text-gray-600 mb-4">May 2024 – Jun 2024</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: Greater Surat Area (On-site)</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Image-based Face Recognition using face_recognition library</li>
                <li>Real-time Video Face Recognition with OpenCV</li>
                <li>Applied AI/ML techniques to enhance web functionalities</li>
                <li>Collaborated with a dynamic team to deliver high-quality software solutions</li>
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
              <p className="text-gray-500">Skills: rasa, Dialogflow, TensorFlow, Communication</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Community Member - Generation Nothing</h3>
            <p className="text-gray-600 mb-4">Jun 2023 – Present</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: India (Remote)</p>
              <p>Joined Generation Nothing student community program organized by Nothing and Yuva</p>
              <p className="text-gray-500">Skills: Communication</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Software Testing as User - Nothing</h3>
            <p className="text-gray-600 mb-4">Feb 2023 – Present</p>
            <div className="text-gray-600">
              <p className="mb-2">Location: India</p>
              <p className="text-gray-500">Skills: Testing, Communication, Manual Testing</p>
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
            <p className="text-gray-500">Skills: Communication, Time Management, Team Management</p>
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
            <p className="text-gray-500">Skills: Adobe Premiere Pro, Blender, Adobe Lightroom, After Effects, Communication, Adobe Photoshop</p>
          </div>
        </div>
      ),
    },
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
            <div className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 flex items-center justify-center flex-wrap gap-2">
              <span>I am an</span>
              <FlipWords 
                words={roles}
                className="text-gray-900 font-semibold"
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
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-gray-900 font-mono">Projects</h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6">
        <GradientHeading size="lg" className="text-center mb-8 sm:mb-10 text-3xl sm:text-4xl">
          Technologies
        </GradientHeading>
        <div className="max-w-5xl mx-auto">
          <LogoCarousel
            columnCount={3}
            logos={[
              { name: "Python", id: 1, img: PythonIcon },
              { name: "TensorFlow", id: 2, img: TensorFlowIcon },
              { name: "PyTorch", id: 3, img: PyTorchIcon },
              { name: "OpenCV", id: 4, img: OpenCVIcon },
              { name: "Pandas", id: 5, img: PandasIcon },
              { name: "NumPy", id: 6, img: NumPyIcon },
              { name: "Scikit Learn", id: 7, img: ScikitLearnIcon },
              { name: "Flask", id: 8, img: FlaskIcon },
              { name: "Git", id: 9, img: GitIcon },
              { name: "PostgreSQL", id: 10, img: PostgreSQLIcon },
              { name: "Power BI", id: 11, img: PowerBIIcon },
              { name: "Firebase", id: 12, img: FirebaseIcon },
              { name: "Node.js", id: 13, img: NodejsIcon },
              { name: "React Native", id: 14, img: ReactNativeIcon },
              { name: "C", id: 15, img: CIcon }
            ]}
          />
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
