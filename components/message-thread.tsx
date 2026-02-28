'use client'

import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, ArrowLeft } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface MessageThreadProps {
  conversation: any | null
  onBack?: () => void
}

export function MessageThread({ conversation, onBack }: MessageThreadProps) {
  const { user } = useAuth()
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const receiverId = conversation?.participantId

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  /* ---------------------------------- */
  /* Fetch messages */
  /* ---------------------------------- */

  useEffect(() => {
    if (!user || !receiverId) {
      setMessages([])
      return
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`
        )
        .order('created_at', { ascending: true })

      if (!error && data) {
        setMessages(data)
        scrollToBottom()
      }
    }

    fetchMessages()
  }, [user?.id, receiverId])

  /* ---------------------------------- */
  /* Realtime listener */
  /* ---------------------------------- */

  useEffect(() => {
    if (!user || !receiverId) return

    const channel = supabase
      .channel(`chat-${user.id}-${receiverId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new

          const isRelevant =
            (newMessage.sender_id === user.id &&
              newMessage.receiver_id === receiverId) ||
            (newMessage.sender_id === receiverId &&
              newMessage.receiver_id === user.id)

          if (isRelevant) {
            setMessages((prev) => {
              if (prev.find((m) => m.id === newMessage.id)) return prev
              return [...prev, newMessage]
            })
            scrollToBottom()
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const updatedMessage = payload.new

          setMessages((prev) =>
            prev.map((m) =>
              m.id === updatedMessage.id ? updatedMessage : m
            )
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id, receiverId])

  /* ---------------------------------- */
  /* Mark Delivered */
  /* ---------------------------------- */

  useEffect(() => {
    if (!user || !receiverId) return

    const markDelivered = async () => {
      await supabase
        .from('messages')
        .update({ delivered: true })
        .eq('receiver_id', user.id)
        .eq('sender_id', receiverId)
        .eq('delivered', false)
    }

    markDelivered()
  }, [user?.id, receiverId])

  /* ---------------------------------- */
  /* Mark Seen */
  /* ---------------------------------- */

  useEffect(() => {
    if (!user || !receiverId) return

    const markSeen = async () => {
      await supabase
        .from('messages')
        .update({ seen: true })
        .eq('receiver_id', user.id)
        .eq('sender_id', receiverId)
        .eq('seen', false)
    }

    markSeen()
  }, [messages])

  /* ---------------------------------- */
  /* Send Message */
  /* ---------------------------------- */

  const handleSendMessage = async () => {
    if (!messageText.trim() || !user || !receiverId) return

    const text = messageText.trim()
    setMessageText('')
    setIsLoading(true)

    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: receiverId,
      content: text,
      delivered: false,
      seen: false,
    })

    if (error) {
      console.error('Send message error:', error)
    }

    setIsLoading(false)
  }

  /* ---------------------------------- */
  /* No conversation selected */
  /* ---------------------------------- */

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <MessageSquareIcon className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg font-semibold text-foreground mb-2">
          Select a conversation
        </p>
        <p className="text-sm text-muted-foreground">
          Choose a conversation from the list to start messaging
        </p>
      </div>
    )
  }

  /* ---------------------------------- */
  /* UI */
  /* ---------------------------------- */

  return (
    <div className="flex-1 flex flex-col bg-background">

      {/* Header */}
      <div className="border-b border-border p-4 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-secondary rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        )}

        <img
          src={conversation.participantAvatar || '/placeholder.svg'}
          alt={conversation.participantName}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="font-semibold text-foreground">
            {conversation.participantName}
          </p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              No messages yet. Start chatting!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_id === user?.id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender_id === user?.id
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>

                <div className="flex items-center justify-end gap-1 text-xs mt-1 opacity-70">
                  <span>
                    {formatDistanceToNow(
                      new Date(message.created_at),
                      { addSuffix: true }
                    )}
                  </span>

                  {message.sender_id === user?.id && (
                    <>
                      {!message.delivered && <span>✔</span>}
                      {message.delivered && !message.seen && <span>✔✔</span>}
                      {message.seen && (
                        <span className="text-blue-500">✔✔</span>
                      )}
                    </>
                  )}
                </div>

              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1 bg-secondary border-0 text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />

          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

/* Icon */
function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}