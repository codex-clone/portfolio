import Link from "next/link"
import Script from "next/script"
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"

import projectsData from "@/data/projects.json"
import experienceData from "@/data/experience.json"
import educationData from "@/data/education.json"
import skillsData from "@/data/skills.json"
import { SectionHeading } from "@/components/section-heading"
import { ContactForm } from "@/components/ui/contact-form"
import { cn } from "@/lib/utils"
import { linkButtonClasses } from "@/lib/link-button"

const containerClass = "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"
const featuredProjects = projectsData.featured
const caseStudySlugs = new Set(["pocketllm", "echogen", "pdf-chat", "writeai"])
const caseStudies = featuredProjects.filter((project) => caseStudySlugs.has(project.slug))
const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

const navItems = [
  { label: "Featured Work", href: "#featured" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className={cn(containerClass, "flex items-center justify-between py-6")}> 
          <Link href="/" className="text-lg font-semibold text-slate-900">
            Prashant Choudhary
          </Link>
          <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium text-slate-600 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section id="home" className="border-b border-slate-200 bg-white py-16 sm:py-20">
          <div className={cn(containerClass, "grid gap-12 lg:grid-cols-12 lg:items-center")}> 
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">AI/ML Engineer</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-[clamp(2.25rem,4vw,3.75rem)]">
                AI/ML Engineer — Agents, RAG, On-device
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                I build practical agentic systems with evaluation baked in. Recent: PocketLLM orchestration, EchoGen podcast pipeline, PDF-Chat demo, WriteAI full-stack.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="#featured" className={linkButtonClasses("primary", "lg")}>
                  View Projects
                </Link>
                <Link href="#contact" className={linkButtonClasses("outline", "lg")}>
                  Contact
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">About</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  I ship end-to-end: problem framing, fast prototypes, eval harnesses, and production observability. Current focus: agentic graphs (LangGraph/CrewAI), retrieval quality, on-device inference, and clean interfaces that don’t lie about capability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="border-b border-slate-200 bg-white py-16 sm:py-20">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="Featured Work" description="Flagship projects prioritized for reliability, evaluation, and measurable outcomes." />
            <div className="grid gap-8 lg:grid-cols-12">
              {featuredProjects.map((project) => (
                <article
                  key={project.slug}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <FolderGit2 aria-hidden className="size-8 text-slate-500" />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        <Link
                          href={`/work/${project.slug}`}
                          className="transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          {project.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-500">{project.summary}</p>
                    </div>
                  </div>
                  <dl className="mt-6 space-y-4 text-sm text-slate-600">
                    <div>
                      <dt className="font-medium text-slate-500">Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500">Stack</dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {item}
                          </span>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500">Signals</dt>
                      <dd>
                        <ul className="list-disc space-y-1 pl-5">
                          {project.metrics.map((metric) => (
                            <li key={metric}>{metric}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    {project.demo ? (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener"
                        className={linkButtonClasses("primary", "sm")}
                      >
                        Live Demo
                        <ExternalLink aria-hidden className="ml-2 size-4" />
                      </Link>
                    ) : null}
                    <Link
                      href={project.repo}
                      target="_blank"
                      rel="noopener"
                      className={linkButtonClasses("outline", "sm")}
                    >
                      Repository
                      <ExternalLink aria-hidden className="ml-2 size-4" />
                    </Link>
                    <Link
                      href={`/work/${project.slug}`}
                      className={cn(linkButtonClasses("ghost", "sm"), "text-slate-900")}
                    >
                      Case study
                      <ArrowUpRight aria-hidden className="ml-2 size-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="case-studies" className="border-b border-slate-200 bg-white py-16 sm:py-20">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading
              title="Case Studies"
              description="Deep dives for the flagship builds. Read the problem, architecture, evaluation, and next steps."
            />
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((project) => (
                <article key={project.slug} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FolderGit2 aria-hidden className="size-8 text-slate-500" />
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
                        <p className="text-sm text-slate-500">{project.summary}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {project.metrics.map((metric) => (
                        <li key={metric} className="flex items-start gap-2">
                          <span aria-hidden className="mt-1 size-1.5 rounded-full bg-slate-400" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/work/${project.slug}`}
                    className={cn(linkButtonClasses("ghost", "sm"), "mt-6 self-start text-slate-900")}
                  >
                    View case study
                    <ArrowUpRight aria-hidden className="ml-2 size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="border-b border-slate-200 bg-white py-16 sm:py-20">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="Skills" description="Tooling clustered by how it shows up in delivery. No filler—only what’s in active use." />
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(skillsData).map(([group, entries]) => (
                <div key={group} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entries.map((skill) => (
                      <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="border-b border-slate-200 bg-white py-16 sm:py-20">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="Experience" description="Recent roles focused on agentic workflows, retrieval quality, and production readiness." />
            <ol className="relative space-y-10 border-l border-slate-200 pl-6">
              {experienceData.map((experience) => (
                <li key={`${experience.role}-${experience.org}`} className="space-y-4">
                  <div className="absolute -left-[11px] mt-2 size-3 rounded-full border-2 border-white bg-slate-900" aria-hidden />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {experience.role}, {experience.org} — {experience.start} – {experience.end}
                    </h3>
                    <p className="text-sm text-slate-500">{experience.location}</p>
                  </div>
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span aria-hidden className="mt-2 size-1.5 rounded-full bg-slate-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="education" className="border-b border-slate-200 bg-white py-16 sm:py-20">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="Education" description="Formal training that underpins the agentic and retrieval work." />
            <div className="grid gap-6 md:grid-cols-2">
              {educationData.map((education) => (
                <article key={education.degree} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{education.degree}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {education.school} · {education.location}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-600">Graduated {education.grad_date}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {education.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span aria-hidden className="mt-2 size-1.5 rounded-full bg-slate-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white py-16 sm:py-20">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading
              title="Contact"
              description="Have a concrete problem? Send context or a short Loom. I’ll reply with tradeoffs and a plan."
            />
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-4">
                <p className="text-base leading-relaxed text-slate-600">
                  Prefer an async intro? Use the form or reach out directly. I keep a tight response loop with eval-ready context so we can move fast without breaking trust.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="mailto:prashantc592114@gmail.com?subject=Project%20inquiry%20from%20prashant.sbs"
                    className={linkButtonClasses("primary", "sm")}
                  >
                    <Mail aria-hidden className="mr-2 size-4" /> Email
                  </Link>
                  <Link
                    href="https://github.com/Mr-Dark-debug"
                    target="_blank"
                    rel="noopener"
                    className={linkButtonClasses("outline", "sm")}
                  >
                    <Github aria-hidden className="mr-2 size-4" /> GitHub
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/prashant-choudhary"
                    target="_blank"
                    rel="noopener"
                    className={linkButtonClasses("outline", "sm")}
                  >
                    <Linkedin aria-hidden className="mr-2 size-4" /> LinkedIn
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-8">
                {hcaptchaSiteKey ? (
                  <>
                    <ContactForm siteKey={hcaptchaSiteKey} />
                    <Script src="https://js.hcaptcha.com/1/api.js" async defer />
                  </>
                ) : (
                  <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
                    <p className="font-semibold">hCaptcha site key missing</p>
                    <p className="mt-2 text-sm">
                      Set <code className="rounded bg-amber-100 px-1.5 py-0.5">NEXT_PUBLIC_HCAPTCHA_SITE_KEY</code> to enable the contact form.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className={cn(containerClass, "flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between")}> 
          <p>© {new Date().getFullYear()} Prashant Choudhary. Built for boring reliability.</p>
          <p className="text-slate-600">Have a concrete problem? Send context or a short Loom. I’ll reply with tradeoffs and a plan.</p>
        </div>
      </footer>
    </div>
  )
}
