import type { Metadata } from "next"
import Script from "next/script"

import projects from "@/data/projects.json"
import "./globals.css"

const siteUrl = "https://prashant.sbs"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prashant Choudhary — AI/ML Engineer building agents, RAG, and on-device models",
    template: "%s | Prashant Choudhary",
  },
  description:
    "Portfolio of Prashant Choudhary. Agentic systems with evaluation, practical RAG, and clean, production-minded tooling.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Prashant Choudhary",
    title: "Prashant Choudhary — AI/ML Engineer building agents, RAG, and on-device models",
    description:
      "Portfolio of Prashant Choudhary. Agentic systems with evaluation, practical RAG, and clean, production-minded tooling.",
    images: [`${siteUrl}/api/og?title=Prashant%20Choudhary&subtitle=AI%2FML%20Engineer&badge=Agentic%20Systems`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Choudhary — AI/ML Engineer building agents, RAG, and on-device models",
    description:
      "Portfolio of Prashant Choudhary. Agentic systems with evaluation, practical RAG, and clean, production-minded tooling.",
    images: [`${siteUrl}/api/og?title=Prashant%20Choudhary&subtitle=AI%2FML%20Engineer&badge=Agentic%20Systems`],
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prashant Choudhary",
  url: `${siteUrl}/`,
  sameAs: [
    "https://github.com/Mr-Dark-debug",
    "https://www.linkedin.com/in/prashant-choudhary",
  ],
  jobTitle: "AI/ML Engineer",
  knowsAbout: [
    "LLM agents",
    "RAG",
    "LangGraph",
    "Supabase",
    "Flutter",
    "FastAPI",
  ],
}

const softwareSchemas = projects.featured.map((project) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: project.name,
  applicationCategory: "AI Tool",
  operatingSystem: project.demo ? "Web" : "Web/Mobile",
  url: project.demo ?? `${siteUrl}/work/${project.slug}`,
  codeRepository: project.repo,
  creator: { "@type": "Person", name: "Prashant Choudhary" },
}))

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white font-sans text-slate-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <main id="main-content" className="min-h-screen">{children}</main>
        <Script id="ld-person" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(personSchema)}
        </Script>
        {softwareSchemas.map((schema, index) => (
          <Script
            key={schema.name}
            id={`ld-software-${index}`}
            type="application/ld+json"
            strategy="beforeInteractive"
          >
            {JSON.stringify(schema)}
          </Script>
        ))}
      </body>
    </html>
  )
}
