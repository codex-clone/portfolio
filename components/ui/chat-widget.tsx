"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ChatWidget() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-end px-4 sm:px-6">
      <Button
        asChild
        size="lg"
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-gray-800"
      >
        <Link href="/ai" aria-label="Open the Generative Answers assistant">
          <Sparkles className="h-4 w-4" />
          Generative Answers
        </Link>
      </Button>
    </div>
  )
}
