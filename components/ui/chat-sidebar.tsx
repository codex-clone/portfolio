'use client'

import * as React from 'react'
import { useChat } from '@ai-sdk/react'
import { X, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Conversation, ConversationContent } from '@/components/ui/conversation'
import { Message, MessageAvatar, MessageContent } from '@/components/ui/message'
import { PromptInput, PromptInputActions, PromptInputTextarea } from '@/components/ui/prompt-input'
import { cn } from '@/lib/utils'

export function ChatSidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  })

  const userAvatar = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=80&h=80&q=80'
  const assistantAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition-all hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Chat with Prashant</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-slate-100 rounded-lg transition"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <Conversation className="flex h-full flex-col">
            <ConversationContent className="flex flex-col gap-4 px-4 py-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageCircle className="w-12 h-12 text-slate-300 mb-3" />
                  <p className="text-slate-600 font-medium">Start a conversation</p>
                  <p className="text-sm text-slate-500 mt-1">Ask me about my projects, skills, or experience</p>
                </div>
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role as 'user' | 'assistant'}>
                    <MessageAvatar
                      src={message.role === 'user' ? userAvatar : assistantAvatar}
                      name={message.role === 'user' ? 'You' : 'Assistant'}
                    />
                    <MessageContent>{message.content}</MessageContent>
                  </Message>
                ))
              )}
              {isLoading && (
                <Message from="assistant">
                  <MessageAvatar src={assistantAvatar} name="Assistant" />
                  <MessageContent>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
          </Conversation>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white p-4">
          <PromptInput
            value={input}
            onValueChange={handleInputChange}
            onSubmit={handleSubmit}
            className="flex items-end gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
          >
            <PromptInputTextarea
              placeholder="Type your message..."
              rows={1}
              className="flex-1 border-none bg-transparent px-2 py-1 text-sm outline-none resize-none"
            />
            <PromptInputActions className="justify-end">
              <Button
                type="submit"
                size="icon"
                disabled={!input || !input.trim() || isLoading}
                className="h-8 w-8 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </PromptInputActions>
          </PromptInput>
        </div>
      </div>
    </>
  )
}

