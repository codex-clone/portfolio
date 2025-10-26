"use client"

import * as React from "react"
import { ArrowUpIcon, Sparkles } from "lucide-react"

import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
}

const promptSuggestions = [
  "Can you summarise my experience?",
  "What technologies do you specialise in?",
  "Show me a highlight from your portfolio.",
  "How can I collaborate with you?",
  "Write a professional introduction email.",
]

function createAssistantReply(prompt: string) {
  return `Thanks for the message! I currently use this chat to share key information from my portfolio. You asked: “${prompt}”. I\\'ll reach out with a personalised response soon.`
}

export function ChatExperience() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hey there! I\'m Prashant\'s AI assistant. Ask about projects, skills, or how we can work together.",
    },
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isResponding, setIsResponding] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)

  const highlight = inputValue.trim().length >= 2 ? inputValue : undefined

  const handleSend = React.useCallback(() => {
    const trimmed = inputValue.trim()
    if (!trimmed || isResponding) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsResponding(true)

    const reply: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: createAssistantReply(trimmed),
    }

    window.setTimeout(() => {
      setMessages((prev) => [...prev, reply])
      setIsResponding(false)
    }, 600)
  }, [inputValue, isResponding])

  const handleSuggestionSelect = React.useCallback((suggestion: string) => {
    setInputValue(suggestion)
  }, [])

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 150)

    return () => window.clearTimeout(timeout)
  }, [messages])

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-4 rounded-3xl border border-white/20 bg-white/90 p-6 text-gray-900 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-slate-800">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
              Quick start
            </p>
            <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100">Suggested Prompts</h2>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-slate-300">
          Pick a prompt to get instant insights about Prashant&apos;s work, experience, and availability.
        </p>
        <div className="grid gap-2">
          {promptSuggestions.map((suggestion) => (
            <PromptSuggestion
              key={suggestion}
              highlight={highlight}
              onClick={() => handleSuggestionSelect(suggestion)}
              className="text-left"
            >
              {suggestion}
            </PromptSuggestion>
          ))}
        </div>
      </aside>

      <section className="flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-950/90">
        <div className="border-b border-white/30 bg-white/60 p-6 dark:border-white/10 dark:bg-slate-950/70">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
            Conversation Hub
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Generative Answers Assistant</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
            Review your chat history, continue the thread, or ask something completely new about the portfolio.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1 text-sm sm:text-base">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[70%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/90 text-gray-900 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100",
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isResponding ? (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-2xl bg-white/90 px-4 py-3 text-gray-500 shadow-sm backdrop-blur dark:bg-slate-900/80 dark:text-slate-300">
                  Thinking...
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <PromptInput
            value={inputValue}
            onValueChange={setInputValue}
            onSubmit={handleSend}
            className="border border-white/40 bg-white/90 shadow-sm dark:border-white/10 dark:bg-slate-900/60"
          >
            <PromptInputTextarea
              placeholder="Ask about projects, skills, or availability..."
              aria-label="Message"
            />
            <PromptInputActions className="justify-end border border-transparent bg-transparent p-0">
              <Button
                type="button"
                size="icon"
                className="size-10 rounded-full bg-gray-900 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={!inputValue.trim() || isResponding}
                aria-label="Send message"
              >
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
            </PromptInputActions>
          </PromptInput>
        </div>
      </section>
    </div>
  )
}
