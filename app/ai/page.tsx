import { ChatExperience } from "@/components/ui/chat-experience"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function GenerativeAnswersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Generative Answers
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Talk to Prashant&apos;s AI Assistant
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Ask anything about my projects, experience, or availability. Suggested prompts are always available, and your full
              conversation history stays visible while we chat.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/40 hover:bg-white/10"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </div>
        <ChatExperience />
      </div>
    </div>
  )
}
