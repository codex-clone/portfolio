import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { promises as fs } from "fs"
import path from "path"

import projects from "@/data/projects.json"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"
import { linkButtonClasses } from "@/lib/link-button"

const containerClass = "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"
const caseStudySlugs = ["pocketllm", "echogen", "pdf-chat", "writeai"] as const

type CaseStudy = {
  title: string
  problem: string
  approach: string
  architectureSvg: string
  stack: string[]
  evaluation: {
    method: string
    metrics: string[]
    tooling: string[]
  }
  results: string[]
  costs: string[]
  failure_modes: string[]
  next: string[]
}

type CaseStudySlug = (typeof caseStudySlugs)[number]

const getCaseStudyPath = (slug: CaseStudySlug) =>
  path.join(process.cwd(), "data", "case-studies", `${slug}.json`)

const getDiagramPath = (relativePath: string) =>
  path.join(process.cwd(), relativePath.replace(/^\//, ""))

async function readCaseStudy(slug: CaseStudySlug): Promise<CaseStudy> {
  const file = await fs.readFile(getCaseStudyPath(slug), "utf-8")
  return JSON.parse(file) as CaseStudy
}

const parseApproach = (approach: string) =>
  approach
    .split("\n")
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean)

const ogImageUrl = (title: string) =>
  `https://prashant.sbs/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
    "Case Study"
  )}&badge=${encodeURIComponent("Prashant Choudhary")}`

export async function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!caseStudySlugs.includes(slug as CaseStudySlug)) {
    return {}
  }
  const study = await readCaseStudy(slug as CaseStudySlug)
  const title = `${study.title} — Case Study by Prashant Choudhary`
  const description = `Problem, approach, architecture, evaluation, and results for ${study.title}.`
  const url = `/work/${slug}`
  const image = ogImageUrl(study.title)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  const slug = rawSlug as CaseStudySlug
  if (!caseStudySlugs.includes(slug)) {
    notFound()
  }

  const study = await readCaseStudy(slug)
  const project = projects.featured.find((item) => item.slug === slug)
  if (!project) {
    notFound()
  }

  const approach = parseApproach(study.approach)
  const architectureSvg = await fs.readFile(getDiagramPath(study.architectureSvg), "utf-8")

  return (
    <div className="bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className={cn(containerClass, "flex flex-col gap-6 py-12")}> 
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li>
                <Link
                  href="/#case-studies"
                  className="transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Case Studies
                </Link>
              </li>
            </ol>
          </nav>
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Case Study</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-[clamp(2.25rem,4vw,3.5rem)]">
              {study.title}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">{study.problem}</p>
            <div className="flex flex-wrap gap-3">
              {project.demo ? (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener"
                  className={linkButtonClasses("primary", "sm")}
                >
                  Live demo
                </Link>
              ) : null}
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener"
                className={linkButtonClasses("outline", "sm")}
              >
                Repository
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-16 py-16 sm:py-20">
        <section className="bg-white">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading
              title="Approach"
              description="I optimized for boring reliability: clear data flow, measurable retrieval quality, and honest failure handling. The result is a tool that behaves the same on demo day and day 90."
            />
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-lg font-semibold text-slate-900">Implementation moves</h2>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate-600">
                  {approach.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2 size-1.5 rounded-full bg-slate-400" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">Stack</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.stack.map((item) => (
                      <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="Architecture" description="High-level view of how services connect and where guardrails live." />
            <div
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              dangerouslySetInnerHTML={{ __html: architectureSvg }}
            />
          </div>
        </section>

        <section className="bg-white">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="Evaluation" description={study.evaluation.method} />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Metrics tracked</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {study.evaluation.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 size-1.5 rounded-full bg-slate-400" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Tooling</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {study.evaluation.tooling.map((tool) => (
                    <li key={tool} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 size-1.5 rounded-full bg-slate-400" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="Outcomes" description="Concrete results, operating costs, and where the system still needs hardening." />
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Results</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {study.results.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 size-1.5 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Costs</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {study.costs.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 size-1.5 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Failure modes</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {study.failure_modes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 size-1.5 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className={cn(containerClass, "space-y-10")}> 
            <SectionHeading title="What’s next" description="Planned iterations that keep reliability boring and insights sharp." />
            <ul className="space-y-3 text-base leading-relaxed text-slate-600">
              {study.next.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 size-1.5 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/#contact" className={linkButtonClasses("primary", "sm")}>
                Start a project
              </Link>
              <Link href="/" className={linkButtonClasses("outline", "sm")}>
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
