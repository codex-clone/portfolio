"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CopyIcon,
  RefreshCcwIcon,
  ShareIcon,
  Sparkles,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Action, Actions } from "@/components/ui/actions"
import {
  Conversation,
  ConversationContent,
} from "@/components/ui/conversation"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { Button } from "@/components/ui/button"
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: number
  role: "user" | "assistant"
  content: string
  avatar: string
  name: string
}

const promptSuggestions = [
  "Can you summarise my experience?",
  "What technologies do you specialise in?",
  "Show me a highlight from your portfolio.",
  "How can I collaborate with you?",
  "Write a professional introduction email.",
]

const userAvatar =
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=80&h=80&q=80"
const assistantAvatar =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"

const actions = [
  { icon: RefreshCcwIcon, label: "Retry" },
  { icon: ThumbsUpIcon, label: "Like" },
  { icon: ThumbsDownIcon, label: "Dislike" },
  { icon: CopyIcon, label: "Copy" },
  { icon: ShareIcon, label: "Share" },
] as const

function createAssistantReply(prompt: string) {
  return `Thanks for the message! I currently use this chat to share key information from my portfolio. You asked: “${prompt}”. I\'ll reach out with a personalised response soon.`
}

export function ChatExperience() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hey there! I\'m Prashant\'s AI assistant. Ask about projects, skills, or how we can work together.",
      avatar: assistantAvatar,
      name: "Portfolio AI",
    },
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isResponding, setIsResponding] = React.useState(false)

  const highlight = inputValue.trim().length >= 2 ? inputValue : undefined

  const handleSend = React.useCallback(() => {
    const trimmed = inputValue.trim()
    if (!trimmed || isResponding) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
      avatar: userAvatar,
      name: "You",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsResponding(true)

    const reply: ChatMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: createAssistantReply(trimmed),
      avatar: assistantAvatar,
      name: "Portfolio AI",
    }

    window.setTimeout(() => {
      setMessages((prev) => [...prev, reply])
      setIsResponding(false)
    }, 600)
  }, [inputValue, isResponding])

  const handleSuggestionSelect = React.useCallback((suggestion: string) => {
    setInputValue(suggestion)
  }, [])

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="space-y-6 rounded-3xl border border-white/20 bg-white/90 p-6 text-gray-900 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-slate-800">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
              Quick start
            </p>
            <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100">
              Suggested Prompts
            </h2>
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

      <section className="flex flex-col gap-6 rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
            Conversation Hub
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Generative Answers Assistant
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Review your chat history, continue the thread, or ask something completely new about the portfolio.
          </p>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-50/80 dark:border-slate-800/70 dark:bg-slate-900/60">
          <Conversation className="flex flex-1 flex-col">
            <ConversationContent className="flex flex-col gap-4 p-6">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  from={message.role}
                  className={cn(
                    "flex flex-col gap-2",
                    message.role === "assistant"
                      ? "items-start"
                      : "items-end",
                  )}
                >
                  <MessageAvatar src={message.avatar} name={message.name} />
                  <MessageContent
                    className={cn(
                      message.role === "user"
                        ? "bg-gray-900 text-white shadow-lg"
                        : "bg-white text-gray-900 shadow-sm dark:bg-slate-800 dark:text-slate-100",
                    )}
                  >
                    {message.content}
                  </MessageContent>
                  {message.role === "assistant" ? (
                    <Actions className="mt-1">
                      {actions.map((action) => (
                        <Action key={action.label} label={action.label}>
                          <action.icon className="size-4" />
                        </Action>
                      ))}
                    </Actions>
                  ) : null}
                </Message>
              ))}
              {isResponding ? (
                <Message
                  from="assistant"
                  className="flex flex-col items-start gap-2"
                >
                  <MessageAvatar src={assistantAvatar} name="Portfolio AI" />
                  <MessageContent className="bg-white text-gray-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                    Thinking...
                  </MessageContent>
                </Message>
              ) : null}
            </ConversationContent>
          </Conversation>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((suggestion) => (
              <PromptSuggestion
                key={`footer-${suggestion}`}
                highlight={highlight}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                {suggestion}
              </PromptSuggestion>
            ))}
          </div>

          <PromptInput
            value={inputValue}
            onValueChange={setInputValue}
            onSubmit={handleSend}
            className="flex w-full flex-col gap-2 rounded-full border border-slate-200/80 bg-white/90 p-2 shadow-md transition focus-within:ring-2 focus-within:ring-slate-200 dark:border-slate-800 dark:bg-slate-900/70 dark:focus-within:ring-slate-700 sm:flex-row sm:items-center sm:gap-3"
          >
            <PromptInputTextarea
              placeholder="Type a message or click a suggestion..."
              aria-label="Message"
              rows={1}
              className="min-h-0 flex-1 rounded-full border-none bg-transparent px-4 py-2 text-base text-gray-900 shadow-none outline-none focus-visible:ring-0 dark:text-slate-100"
            />
            <PromptInputActions className="justify-end rounded-full bg-transparent p-0">
              <Button
                type="submit"
                size="icon"
                className="size-10 rounded-full bg-gray-900 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400/50 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
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
