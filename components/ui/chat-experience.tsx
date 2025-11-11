"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CopyIcon,
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
  "Tell me about your experience",
  "What are your key skills?",
  "Show me your best projects",
  "How can we work together?",
  "What's your tech stack?",
]

const slashCommands = [
  { command: "/projects", description: "View my portfolio projects" },
  { command: "/skills", description: "See my technical skills" },
  { command: "/experience", description: "Learn about my experience" },
  { command: "/contact", description: "Get my contact information" },
  { command: "/collaborate", description: "Discuss collaboration opportunities" },
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
        "Hi! I'm Prashant's AI assistant. Ask me anything about his projects, skills, experience, or how you can collaborate with him.",
      avatar: assistantAvatar,
      name: "Assistant",
    },
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isResponding, setIsResponding] = React.useState(false)
  const [showCommands, setShowCommands] = React.useState(false)

  const highlight = inputValue.trim().length >= 2 ? inputValue : undefined

  // Show slash commands when user types "/"
  React.useEffect(() => {
    setShowCommands(inputValue.startsWith("/"))
  }, [inputValue])

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
    <div className="flex h-full flex-col bg-white">
      {/* Chat Messages Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Conversation className="flex h-full flex-col">
          <ConversationContent className="flex flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col gap-2">
                <Message from={message.role}>
                  <MessageAvatar src={message.avatar} name={message.name} />
                  <div className="flex flex-col gap-2">
                    <MessageContent>
                      {message.content}
                    </MessageContent>
                    {message.role === "assistant" ? (
                      <Actions className="ml-10">
                        {actions.map((action) => (
                          <Action key={action.label} label={action.label}>
                            <action.icon className="size-4" />
                          </Action>
                        ))}
                      </Actions>
                    ) : null}
                  </div>
                </Message>
              </div>
            ))}
            {isResponding ? (
              <Message from="assistant">
                <MessageAvatar src={assistantAvatar} name="Assistant" />
                <MessageContent>
                  Thinking...
                </MessageContent>
              </Message>
            ) : null}
          </ConversationContent>
        </Conversation>
      </div>

      {/* Input Area - Full Width */}
      <div className="border-t border-slate-200/30 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          {/* Suggestions - Only show on first message */}
          {messages.length === 1 && !showCommands && (
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((suggestion) => (
                <PromptSuggestion
                  key={suggestion}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-slate-200 bg-white px-4 py-2 text-xs text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {suggestion}
                </PromptSuggestion>
              ))}
            </div>
          )}

          {/* Slash Commands Dropdown */}
          {showCommands && (
            <div className="rounded-lg border border-slate-200 bg-white shadow-lg">
              {slashCommands.map((cmd) => (
                <button
                  key={cmd.command}
                  type="button"
                  onClick={() => {
                    setInputValue(cmd.command + " ")
                    setShowCommands(false)
                  }}
                  className="flex w-full items-start gap-3 border-b border-slate-200 px-4 py-3 text-left transition hover:bg-blue-50 last:border-b-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-blue-600">{cmd.command}</div>
                    <div className="text-xs text-slate-500">{cmd.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <PromptInput
            value={inputValue}
            onValueChange={setInputValue}
            onSubmit={handleSend}
            className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-blue-200 sm:flex-row sm:items-end sm:gap-3"
          >
            <PromptInputTextarea
              placeholder="Ask about projects, skills, experience... (or type / for commands)"
              aria-label="Message"
              rows={1}
              className="min-h-0 flex-1 rounded-lg border-none bg-transparent px-2 py-2 text-sm text-slate-700 shadow-none outline-none focus-visible:ring-0"
            />
            <PromptInputActions className="justify-end gap-2 sm:bg-transparent sm:px-0 sm:py-0">
              <Button
                type="submit"
                size="icon"
                className="size-9 rounded-lg bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
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
  )
}
