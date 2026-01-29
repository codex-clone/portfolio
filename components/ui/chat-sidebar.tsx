'use client'

import * as React from 'react'
import { useChat } from '@ai-sdk/react'
import { X, Sparkles, Send, Link2, Keyboard, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  { label: "Tell me about your projects", icon: "🚀" },
  { label: "What's your tech stack?", icon: "💻" },
  { label: "Your AI experience?", icon: "🤖" },
  { label: "Are you available?", icon: "📅" },
  { label: "Tell me about PocketLLM", icon: "📱" },
  { label: "What is MugShot Studio?", icon: "🎨" },
];

// Sparkle icon for the header
const SparkleIcon = () => (
  <svg
    fill="none"
    height="40"
    viewBox="0 0 48 48"
    width="40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sparkle-gradient" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#a855f7" stopOpacity="0.8" />
        <stop offset="1" stopColor="#7c3aed" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect fill="url(#sparkle-gradient)" height="48" rx="12" width="48" />
    <path
      clipRule="evenodd"
      d="m6 24c11.4411 0 18-6.5589 18-18 0 11.4411 6.5589 18 18 18-11.4411 0-18 6.5589-18 18 0-11.4411-6.5589-18-18-18z"
      fill="white"
      fillOpacity="0.9"
      fillRule="evenodd"
    />
  </svg>
);

// Helper function to extract text content from message parts (AI SDK 5.0 format)
function getMessageText(message: any): string {
  // 1. Prioritize standard 'content' string if available
  if (typeof message.content === 'string' && message.content.length > 0) {
    return message.content;
  }

  // 2. AI SDK 5.0 uses 'parts' array
  if (message.parts && Array.isArray(message.parts)) {
    const textParts = message.parts
      .filter((part: any) => part.type === 'text')
      .map((part: any) => part.text)
      .join('');

    if (textParts) return textParts;
  }

  return '';
}

// Helper function to check if message has reasoning parts
function hasReasoningParts(message: any): boolean {
  if (!message.parts || !Array.isArray(message.parts)) return false;
  return message.parts.some((part: any) => part.type === 'reasoning');
}

// Helper function to get reasoning text
function getReasoningText(message: any): string {
  if (!message.parts || !Array.isArray(message.parts)) return '';
  return message.parts
    .filter((part: any) => part.type === 'reasoning')
    .map((part: any) => part.text || part.reasoning || '')
    .join('');
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  // AI SDK 5.0 API
  const { messages, sendMessage, status, error } = useChat({
    id: 'portfolio-chat',
  }) as any

  const isLoading = status === 'streaming' || status === 'submitted';

  const [inputValue, setInputValue] = React.useState('')
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  React.useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Log real errors (not SDK finish event validation issues)
  React.useEffect(() => {
    if (error && !error.message?.includes('Type validation failed')) {
      console.error('[Chat] Error:', error.message);
    }
  }, [error])

  // Model selector state
  const [selectedModel, setSelectedModel] = React.useState('llama-3.3-70b-versatile');
  const [isModelMenuOpen, setIsModelMenuOpen] = React.useState(false);

  const models = [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
    { id: 'openai/gpt-oss-120b', name: 'GPT OSS 120B' }
  ];

  const currentModelName = models.find(m => m.id === selectedModel)?.name || 'Llama 3.3 70B';

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const message = inputValue.trim()
    setInputValue('')

    try {
      // AI SDK 5.0 send message format
      await sendMessage({
        role: 'user',
        content: message
      }, {
        body: { model: selectedModel }
      })
    } catch (e) {
      console.error('Failed to send message:', e)
    }
  }

  const handleSuggestedClick = async (suggestion: string) => {
    if (isLoading) return

    try {
      await sendMessage({
        role: 'user',
        content: suggestion
      }, {
        body: { model: selectedModel }
      })
    } catch (e) {
      console.error('Failed to send suggestion:', e)
    }
  }

  // ... (handleKeyDown and handleInputChange stay mostly the same but ensure they are inside the component)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-white dark:bg-zinc-900 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out border-l border-zinc-200 dark:border-zinc-800',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <SparkleIcon />
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Generative Answers</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Powered by {currentModelName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
              <SparkleIcon />

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-zinc-500 dark:text-zinc-400">
                  Hi there! 👋
                </h3>
                <h4 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Ask me anything about Prashant
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                  I can tell you about his projects, skills, experience, or anything else you'd like to know!
                </p>
              </div>

              {/* Suggested prompts */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-sm">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedClick(prompt.label)}
                    disabled={isLoading}
                    className="px-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-700 dark:hover:text-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="mr-1">{prompt.icon}</span>
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {messages.map((message: any) => {
                const messageText = getMessageText(message);
                const isThinking = message.role === 'assistant' && !messageText && isLoading;
                const showReasoning = hasReasoningParts(message);

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        {isThinking ? (
                          <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm overflow-hidden",
                        message.role === 'user'
                          ? "bg-purple-600 text-white rounded-br-md"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-bl-md"
                      )}
                    >
                      {/* Thinking animation */}
                      {isThinking && (
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                          <Brain className="w-4 h-4 animate-pulse" />
                          <span className="text-sm font-medium">Thinking...</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                          </div>
                        </div>
                      )}

                      {/* Reasoning indicator */}
                      {showReasoning && (
                        <div className="mb-2 pb-2 border-b border-purple-200 dark:border-purple-800">
                          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs">
                            <Brain className="w-3 h-3" />
                            <span className="italic">Reasoning completed</span>
                          </div>
                        </div>
                      )}

                      {/* Message content with markdown */}
                      {messageText && (
                        <div className={cn(
                          "prose prose-sm max-w-none",
                          message.role === 'user'
                            ? "prose-invert"
                            : "dark:prose-invert prose-zinc",
                          "prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5",
                          "prose-code:bg-zinc-200 dark:prose-code:bg-zinc-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs",
                          "prose-pre:bg-zinc-200 dark:prose-pre:bg-zinc-900 prose-pre:p-3 prose-pre:rounded-lg",
                          "prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:underline"
                        )}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {messageText}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Show loading indicator only when no assistant message exists yet */}
              {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <span className="text-sm font-medium">Thinking...</span>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Only show errors that aren't the known SDK finish event issue */}
              {error && !error.message?.includes('Type validation failed') && !error.message?.includes('"type":"finish"') && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                  Error: {error.message}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          {/* Text Input */}
          <div className="relative border-b border-zinc-200 dark:border-zinc-700">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Prashant..."
              className="w-full resize-none bg-transparent px-4 py-4 pr-12 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none min-h-[56px] max-h-[150px]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                inputValue.trim()
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/25"
                  : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="relative">
              <button
                onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                {currentModelName}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isModelMenuOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setIsModelMenuOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors",
                        selectedModel === model.id ? "text-purple-600 dark:text-purple-400 font-medium" : "text-zinc-700 dark:text-zinc-300"
                      )}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded transition">
                <Link2 className="w-3.5 h-3.5" />
                Attach
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded transition">
                <Keyboard className="w-3.5 h-3.5" />
                Shortcuts
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
