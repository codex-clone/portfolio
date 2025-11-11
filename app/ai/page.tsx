"use client"

import { ChatExperience } from "@/components/ui/chat-experience"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AIPage() {
  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Minimal Header */}
      <header className="border-b border-slate-200/30 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-slate-900">Prashant's Assistant</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-slate-900"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        </div>
      </header>

      {/* Main Chat Area - Full Screen */}
      <main className="flex-1 overflow-hidden">
        <ChatExperience />
      </main>
    </div>
  )
}
