import { ChatExperience } from "@/components/ui/chat-experience"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const modelCollections = [
  {
    title: "Flagship models",
    description: "Balanced for complex briefs that need nuance, reliability, and a polished tone.",
    badge: "4 available",
    tokens: [
      { label: "GPT-4o", tone: "from-indigo-500 to-violet-500" },
      { label: "GPT-4o mini", tone: "from-sky-400 to-cyan-500" },
    ],
  },
  {
    title: "Best roleplay models",
    description: "Great for interview simulations, scenario planning, and creative rehearsals.",
    badge: "Creative focus",
    tokens: [
      { label: "GPT-4.1", tone: "from-rose-500 to-fuchsia-500" },
      { label: "Persona", tone: "from-orange-400 to-amber-500" },
    ],
  },
  {
    title: "Best coding models",
    description: "Purpose-built for pair programming, debugging, and architecture discussions.",
    badge: "Engineering", 
    tokens: [
      { label: "o1-preview", tone: "from-blue-500 to-slate-500" },
      { label: "GPT-4o mini", tone: "from-emerald-400 to-teal-500" },
    ],
  },
  {
    title: "Reasoning models",
    description: "Structured thinking for analysis, product strategy, and complex planning prompts.",
    badge: "Analytical",
    tokens: [
      { label: "o1", tone: "from-slate-600 to-slate-900" },
      { label: "DeepSeek", tone: "from-zinc-400 to-zinc-600" },
    ],
  },
]

export default function GenerativeAnswersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              AI Workspace
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Generative Overview</h1>
              <p className="max-w-xl text-sm text-slate-500 sm:text-base">
                Explore curated AI model collections and keep the conversation with Prashant&apos;s portfolio assistant flowing in a single, professional workspace.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </header>

        <section className="mb-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Model collections</h2>
              <p className="text-sm text-slate-500">Handpicked sets aligned to the most common portfolio questions.</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {modelCollections.map((collection) => (
              <Card
                key={collection.title}
                className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-medium text-white shadow-sm">
                  <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
                  {collection.badge}
                </div>
                <CardHeader className="space-y-4 p-0">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-900">
                    <SparklesIcon />
                  </span>
                  <CardTitle className="text-xl font-semibold text-slate-900">{collection.title}</CardTitle>
                  <CardDescription className="text-sm text-slate-500">
                    {collection.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {collection.tokens.map((token) => (
                      <span
                        key={`${collection.title}-${token.label}`}
                        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${token.tone} px-3 py-1 text-xs font-semibold text-white shadow-sm`}
                      >
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/90 text-[10px] font-semibold text-slate-900">
                          {token.label.charAt(0)}
                        </span>
                        {token.label}
                      </span>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <ChatExperience />
      </div>
    </div>
  )
}

function SparklesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-slate-600"
    >
      <path
        d="M12 3l1.2 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15l.7 2.1L8 18l-2.1.8L5 21l-.9-2.2L2 18l2.1-.9L5 15z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d="M19 13l.6 1.6L21 15l-1.4.5L19 17l-.6-1.5L17 15l1.4-.4L19 13z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  )
}
