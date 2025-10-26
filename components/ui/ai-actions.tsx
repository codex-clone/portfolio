import Image from "next/image"
import {
  CopyIcon,
  RefreshCcwIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Action, Actions } from "@/components/ui/actions"
import {
  Conversation,
  ConversationContent,
} from "@/components/ui/conversation"
import { Message, MessageContent } from "@/components/ui/message"

const messages: {
  id: string
  from: "user" | "assistant"
  content: string
  avatar: string
  name: string
}[] = [
  {
    id: "1",
    from: "user",
    content: "Hello, how are you?",
    avatar:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=80&h=80&q=80",
    name: "Avery Miles",
  },
  {
    id: "2",
    from: "assistant",
    content: "I am fine, thank you!",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
    name: "OpenAI",
  },
]
const Example = () => {
  const actions = [
    {
      icon: RefreshCcwIcon,
      label: "Retry",
    },
    {
      icon: ThumbsUpIcon,
      label: "Like",
    },
    {
      icon: ThumbsDownIcon,
      label: "Dislike",
    },
    {
      icon: CopyIcon,
      label: "Copy",
    },
    {
      icon: ShareIcon,
      label: "Share",
    },
  ]
  return (
    <div className="flex h-full w-full max-w-lg items-center justify-center">
      <Conversation className="relative w-full">
        <ConversationContent>
          {messages.map((message) => (
            <Message
              className={`flex flex-col gap-2 ${message.from === "assistant" ? "items-start" : "items-end"}`}
              from={message.from}
              key={message.id}
            >
              <Image
                src={message.avatar}
                alt={message.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <MessageContent>{message.content}</MessageContent>
              {message.from === "assistant" && (
                <Actions className="mt-2">
                  {actions.map((action) => (
                    <Action key={action.label} label={action.label}>
                      <action.icon className="size-4" />
                    </Action>
                  ))}
                </Actions>
              )}
            </Message>
          ))}
        </ConversationContent>
      </Conversation>
    </div>
  )
}

export { Example }
