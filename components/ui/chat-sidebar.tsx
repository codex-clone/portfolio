'use client'

import * as React from 'react'
import { useChat } from '@ai-sdk/react'
import { X, MessageCircle, Sparkles, Send, ArrowRight } from 'lucide-react'
import { Conversation, ConversationContent } from '@/components/ui/conversation'
import { Message, MessageAvatar, MessageContent } from '@/components/ui/message'
import { cn } from '@/lib/utils'

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_MESSAGES = [
  "What are your top projects?",
  "Tell me about your AI experience",
  "What's your tech stack?",
  "Are you available for freelance?",
  "What's MugShot Studio?",
  "Tell me about PocketLLM",
];

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const { messages, append, isLoading, input, setInput } = useChat() as any
  const [inputValue, setInputValue] = React.useState('')
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const userAvatar = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=80&h=80&q=80'
  const assistantAvatar = '/professional.png'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const message = inputValue.trim()
    setInputValue('')

    await append({
      role: 'user',
      content: message,
    }, {
      body: { model: 'gpt-oss-120b' }
    })
  }

  const handleSuggestedClick = async (suggestion: string) => {
    setInputValue('')
    await append({
      role: 'user',
      content: suggestion,
    }, {
      body: { model: 'gpt-oss-120b' }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-full sm:w-[450px] bg-white dark:bg-zinc-900 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Generative Answers</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <Conversation className="flex h-full flex-col">
            <ConversationContent className="flex flex-col gap-4 px-4 py-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold text-lg">Ask me anything</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                    About my projects, skills, experience, or anything else you'd like to know!
                  </p>
                </div>
              ) : (
                messages.map((message: any) => (
                  <Message key={message.id} from={message.role as 'user' | 'assistant'}>
                    <MessageAvatar
                      src={message.role === 'user' ? userAvatar : assistantAvatar}
                      name={message.role === 'user' ? 'You' : 'Prashant'}
                    />
                    <MessageContent>{message.content}</MessageContent>
                  </Message>
                ))
              )}
              {isLoading && (
                <Message from="assistant">
                  <MessageAvatar src={assistantAvatar} name="Prashant" />
                  <MessageContent>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </MessageContent>
                </Message>
              )}
              <div ref={messagesEndRef} />
            </ConversationContent>
          </Conversation>
        </div>

        {/* Suggested Messages */}
        {messages.length === 0 && (
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {SUGGESTED_MESSAGES.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedClick(suggestion)}
                  className="flex-shrink-0 px-3 py-2 text-sm rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about me..."
                className="w-full resize-none rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-4 py-3 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[48px] max-h-32"
                rows={1}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                inputValue.trim()
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                  : "bg-slate-200 dark:bg-zinc-700 text-slate-400 dark:text-zinc-500 cursor-not-allowed"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">
            Powered by GPT OSS 120B
          </p>
        </div>
      </div>
    </>
  )
}
