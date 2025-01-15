"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { FlipWords } from "@/components/ui/flip-words";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { TextEffect } from "@/components/ui/text-effect";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  HomeIcon,
  GraduationCap,
  Briefcase,
  Code,
  Wrench,
  Send
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
  SQLIcon,
  PowerBIIcon,
  HadoopIcon
} from "@/components/ui/skill-icons";
import { ContactForm } from "@/components/ui/contact-form";

export default function HomePage() {
  const roles = [
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "Full Stack Developer",
    "Computer Vision Expert"
  ];

  const navItems = [
    { name: 'Home', url: '#home', icon: HomeIcon },
    { name: 'Education', url: '#education', icon: GraduationCap },
    { name: 'Experience', url: '#experience', icon: Briefcase },
    { name: 'Projects', url: '#projects', icon: Code },
    { name: 'Skills', url: '#skills', icon: Wrench },
    { name: 'Contact', url: '#contact', icon: Send }
  ];

  const isScrolled = useScrollTrigger(100);

  const educationData = [
    {
      title: "Bachelor's Degree",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Bachelor's Degree in Artificial Intelligence and Data Science</h3>
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
    <main className="min-h-screen bg-white">
      <NavBar 
        items={navItems}
      />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)] absolute inset-0"
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
        />
        <div className="relative z-10 text-center px-4">
          <TextEffect
            preset="slide"
            trigger={!isScrolled}
            className="block"
            as="div"
          >
            <WordPullUp
              words="PRASHANT CHOUDHARY"
              className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            />
          </TextEffect>
          
          <TextEffect
            preset="scale"
            trigger={!isScrolled}
            delay={0.3}
            className="block"
            as="div"
          >
            <div className="text-xl md:text-2xl text-gray-600 mb-8 flex items-center justify-center">
              <span className="mr-2">I am an</span>
              <FlipWords 
                words={roles}
                className="text-gray-900 font-semibold"
                duration={2000}
              />
            </div>
          </TextEffect>

          <TextEffect
            preset="fade"
            trigger={!isScrolled}
            delay={0.6}
            as="div"
          >
            <div className="flex justify-center gap-4">
              <Link href="https://www.linkedin.com/in/mr-dark-debug" target="_blank" className="text-gray-600 hover:text-gray-900">
                <Linkedin size={24} />
              </Link>
              <Link href="https://github.com/Mr-Dark-Debug" target="_blank" className="text-gray-600 hover:text-gray-900">
                <Github size={24} />
              </Link>
              <Link href="mailto:prashantc592114@gmail.com" className="text-gray-600 hover:text-gray-900">
                <Mail size={24} />
              </Link>
              <Link href="tel:+917984669885" className="text-gray-600 hover:text-gray-900">
                <Phone size={24} />
              </Link>
            </div>
          </TextEffect>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
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
      <section id="experience">
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
      <section id="projects" className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 font-mono">Projects</h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <GradientHeading size="lg" className="text-center mb-12">
            Technical Skills
          </GradientHeading>
          <LogoCarousel
            columnCount={3}
            logos={[
              { name: "Python", id: 1, img: PythonIcon },
              { name: "TensorFlow", id: 2, img: TensorFlowIcon },
              { name: "PyTorch", id: 3, img: PyTorchIcon },
              { name: "OpenCV", id: 4, img: OpenCVIcon },
              { name: "Pandas", id: 5, img: PandasIcon },
              { name: "NumPy", id: 6, img: NumPyIcon },
              { name: "Scikit-Learn", id: 7, img: ScikitLearnIcon },
              { name: "Flask", id: 8, img: FlaskIcon },
              { name: "Git", id: 9, img: GitIcon },
              { name: "SQL", id: 10, img: SQLIcon },
              { name: "Power BI", id: 11, img: PowerBIIcon },
              { name: "Hadoop", id: 12, img: HadoopIcon }
            ]}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8">
        <ContactForm />
      </section>
    </main>
  );
}
