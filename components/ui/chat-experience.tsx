"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CopyIcon,
  Gamepad2,
  Image,
  LayoutDashboard,
  PanelsTopLeft,
  RefreshCcwIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Action, Actions } from "@/components/ui/actions"
import { Conversation, ConversationContent } from "@/components/ui/conversation"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { Button } from "@/components/ui/button"
import { PromptInput, PromptInputActions, PromptInputTextarea } from "@/components/ui/prompt-input"
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

const composerShortcuts = [
  { icon: Image, label: "Image" },
  { icon: PanelsTopLeft, label: "Interactive App" },
  { icon: LayoutDashboard, label: "Landing Page" },
  { icon: Gamepad2, label: "3D Game" },
] as const

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
  return `Thanks for the message! I currently use this chat to share key information from my portfolio. You asked: “${prompt}”. I'll reach out with a personalised response soon.`
}

export function ChatExperience() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hey there! I'm Prashant's AI assistant. Ask about projects, skills, or how we can work together.",
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
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-slate-200/80 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Conversation Hub</p>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Generative Answers Assistant</h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep your prompts, history, and feedback controls in one professional workspace.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            Live session
          </span>
          <span className="hidden text-xs text-slate-400 sm:inline-flex">Responses under 1 min</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 py-6">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/90">
          <Conversation className="flex h-[360px] flex-col">
          <ConversationContent className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  from={message.role}
                  className={cn("flex flex-col gap-2", message.role === "assistant" ? "items-start" : "items-end")}
                >
                  <MessageAvatar src={message.avatar} name={message.name} />
                  <MessageContent
                    className={cn(
                      "max-w-full rounded-2xl px-4 py-3 text-sm shadow-sm",
                      message.role === "user"
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200",
                    )}
                  >
                    {message.content}
                  </MessageContent>
                  {message.role === "assistant" ? (
                    <Actions className="mt-1 text-slate-400">
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
                <Message from="assistant" className="flex flex-col items-start gap-2">
                  <MessageAvatar src={assistantAvatar} name="Portfolio AI" />
                  <MessageContent className="bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                    Thinking...
                  </MessageContent>
                </Message>
              ) : null}
            </ConversationContent>
          </Conversation>
        </div>

        <div className="flex flex-wrap gap-2">
          {composerShortcuts.map((shortcut) => (
            <button
              key={shortcut.label}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <shortcut.icon className="h-3.5 w-3.5" />
              {shortcut.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion) => (
            <PromptSuggestion
              key={suggestion}
              highlight={highlight}
              onClick={() => handleSuggestionSelect(suggestion)}
              variant="outline"
              size="sm"
              className="rounded-full border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              {suggestion}
            </PromptSuggestion>
          ))}
        </div>

        <PromptInput
          value={inputValue}
          onValueChange={setInputValue}
          onSubmit={handleSend}
          className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm transition focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-200 sm:flex-row sm:items-center sm:gap-4"
        >
          <PromptInputTextarea
            placeholder="Type a message or click a suggestion..."
            aria-label="Message"
            rows={1}
            className="min-h-0 flex-1 rounded-xl border-none bg-transparent px-3 py-2 text-base text-slate-700 shadow-none outline-none focus-visible:ring-0"
          />
          <PromptInputActions className="justify-end gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:bg-transparent sm:px-0 sm:py-0 sm:ring-0">
            <Button
              type="submit"
              size="icon"
              className="size-10 rounded-full bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400/50"
              disabled={!inputValue.trim() || isResponding}
              aria-label="Send message"
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          </PromptInputActions>
        </PromptInput>
      </div>
    </section>
  )
}
