"use client"

import * as React from "react"
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, MessageCircle, Sparkles, X } from "lucide-react"

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
  return `Thanks for the message! I currently use this chat to share key information from my portfolio. You asked: “${prompt}”. I\'ll reach out with a personalised response soon.`
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
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

  React.useEffect(() => {
    if (!isOpen) return
    const timeout = window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 150)

    return () => window.clearTimeout(timeout)
  }, [messages, isOpen])

  React.useEffect(() => {
    if (!isOpen) {
      setInputValue("")
      setIsResponding(false)
    }
  }, [isOpen])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
        <Button
          size="lg"
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-gray-900 px-6 py-5 text-base font-semibold text-white shadow-xl shadow-gray-900/20 transition hover:bg-gray-800"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
        >
          <MessageCircle className="h-5 w-5" />
          Chat with AI
        </Button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
          <button
            type="button"
            aria-label="Close chat"
            className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative flex h-full w-full max-w-4xl flex-col gap-4 rounded-3xl border border-white/20 bg-white/90 p-4 text-gray-900 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 sm:h-auto sm:max-h-[85vh] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Ask anything
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Chat with Prashant&apos;s AI
                </h2>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-gray-500 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat panel"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-muted/60 p-3 sm:p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Suggested prompts
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {promptSuggestions.map((suggestion) => (
                  <PromptSuggestion
                    key={suggestion}
                    highlight={highlight}
                    onClick={() => setInputValue(suggestion)}
                    className="text-left"
                  >
                    {suggestion}
                  </PromptSuggestion>
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden rounded-3xl border border-border/70 bg-background/60 p-4">
              <div className="flex-1 space-y-4 overflow-y-auto pr-1 text-sm sm:text-base">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
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
                className="border border-border/70 bg-white/80 dark:bg-slate-900/60"
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
          </div>
        </div>
      ) : null}
    </>
  )
}
