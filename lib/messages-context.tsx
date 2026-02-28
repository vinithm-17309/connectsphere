'use client'

import React, { createContext, useContext, useState } from 'react'

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  recipientId: string
  content: string
  timestamp: Date
  isRead: boolean
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  messages: Message[]
}

interface MessagesContextType {
  conversations: Conversation[]
  sendMessage: (recipientId: string, content: string) => void
  markAsRead: (conversationId: string) => void
  getConversation: (conversationId: string) => Conversation | undefined
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
)

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'user-2',
    participantName: 'Alex Chen',
    participantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    lastMessage: 'That sounds great! When are you available?',
    lastMessageTime: new Date(Date.now() - 2 * 60000),
    unreadCount: 2,
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-2',
        senderName: 'Alex Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'Hey! How are you doing?',
        timestamp: new Date(Date.now() - 15 * 60000),
        isRead: true,
      },
      {
        id: 'msg-2',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        recipientId: 'user-2',
        content: 'Hey Alex! I am good, just finished that project we talked about',
        timestamp: new Date(Date.now() - 10 * 60000),
        isRead: true,
      },
      {
        id: 'msg-3',
        senderId: 'user-2',
        senderName: 'Alex Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'That sounds great! When are you available?',
        timestamp: new Date(Date.now() - 2 * 60000),
        isRead: false,
      },
      {
        id: 'msg-3a',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        recipientId: 'user-2',
        content: 'How about next Monday at 2pm?',
        timestamp: new Date(Date.now() - 90000),
        isRead: true,
      },
      {
        id: 'msg-3b',
        senderId: 'user-2',
        senderName: 'Alex Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'Perfect! See you then!',
        timestamp: new Date(Date.now() - 30000),
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-2',
    participantId: 'user-3',
    participantName: 'Jordan Smith',
    participantAvatar: 'https://images.unsplash.com/photo-1517841905240-1c01a6b0144c?w=400&h=400&fit=crop',
    lastMessage: 'See you tomorrow!',
    lastMessageTime: new Date(Date.now() - 1 * 3600000),
    unreadCount: 0,
    messages: [
      {
        id: 'msg-4',
        senderId: 'user-3',
        senderName: 'Jordan Smith',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-1c01a6b0144c?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'Great work on the presentation!',
        timestamp: new Date(Date.now() - 2 * 3600000),
        isRead: true,
      },
      {
        id: 'msg-5',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        recipientId: 'user-3',
        content: 'Thanks! Thanks for helping with the research',
        timestamp: new Date(Date.now() - 1.5 * 3600000),
        isRead: true,
      },
      {
        id: 'msg-6',
        senderId: 'user-3',
        senderName: 'Jordan Smith',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-1c01a6b0144c?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'See you tomorrow!',
        timestamp: new Date(Date.now() - 1 * 3600000),
        isRead: true,
      },
    ],
  },
  {
    id: 'conv-3',
    participantId: 'user-4',
    participantName: 'Sarah Johnson',
    participantAvatar: 'https://images.unsplash.com/photo-1506631197048-46159a1a675e?w=400&h=400&fit=crop',
    lastMessage: 'Would love to collaborate on the new initiative',
    lastMessageTime: new Date(Date.now() - 30 * 60000),
    unreadCount: 1,
    messages: [
      {
        id: 'msg-7',
        senderId: 'user-4',
        senderName: 'Sarah Johnson',
        senderAvatar: 'https://images.unsplash.com/photo-1506631197048-46159a1a675e?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'Hi! Did you see the latest market report?',
        timestamp: new Date(Date.now() - 1.5 * 3600000),
        isRead: true,
      },
      {
        id: 'msg-8',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        recipientId: 'user-4',
        content: 'Yes! Really impressive insights there',
        timestamp: new Date(Date.now() - 1 * 3600000),
        isRead: true,
      },
      {
        id: 'msg-9',
        senderId: 'user-4',
        senderName: 'Sarah Johnson',
        senderAvatar: 'https://images.unsplash.com/photo-1506631197048-46159a1a675e?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'Would love to collaborate on the new initiative',
        timestamp: new Date(Date.now() - 30 * 60000),
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-4',
    participantId: 'user-5',
    participantName: 'Michael Park',
    participantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    lastMessage: 'Let me know about the budget review results',
    lastMessageTime: new Date(Date.now() - 2 * 3600000),
    unreadCount: 0,
    messages: [
      {
        id: 'msg-10',
        senderId: 'user-5',
        senderName: 'Michael Park',
        senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'The quarterly results are looking good!',
        timestamp: new Date(Date.now() - 3 * 3600000),
        isRead: true,
      },
      {
        id: 'msg-11',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        recipientId: 'user-5',
        content: 'That is fantastic news!',
        timestamp: new Date(Date.now() - 2.5 * 3600000),
        isRead: true,
      },
      {
        id: 'msg-12',
        senderId: 'user-5',
        senderName: 'Michael Park',
        senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        recipientId: 'current-user',
        content: 'Let me know about the budget review results',
        timestamp: new Date(Date.now() - 2 * 3600000),
        isRead: true,
      },
    ],
  },
]

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations)

  const sendMessage = (recipientId: string, content: string) => {
    setConversations((prevConversations) => {
      const updatedConversations = [...prevConversations]
      let conversationIndex = updatedConversations.findIndex(
        (conv) => conv.participantId === recipientId
      )

      if (conversationIndex === -1) {
        updatedConversations.unshift({
          id: `conv-${Date.now()}`,
          participantId: recipientId,
          participantName: recipientId,
          participantAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipientId}`,
          lastMessage: content,
          lastMessageTime: new Date(),
          unreadCount: 0,
          messages: [],
        })
        conversationIndex = 0
      }

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar:
          'https://api.dicebear.com/7.x/avataaars/svg?seed=current-user',
        recipientId,
        content,
        timestamp: new Date(),
        isRead: false,
      }

      updatedConversations[conversationIndex].messages.push(newMessage)
      updatedConversations[conversationIndex].lastMessage = content
      updatedConversations[conversationIndex].lastMessageTime = new Date()

      // Simulate received reply
      setTimeout(() => {
        setConversations((current) => {
          const updated = [...current]
          const idx = updated.findIndex(
            (c) => c.participantId === recipientId
          )
          if (idx !== -1) {
            const replies = [
              'Got it!',
              'Thanks for the update',
              'Sounds good',
              'I agree',
              'Let me think about it',
              'Perfect!',
            ]
            const reply = replies[Math.floor(Math.random() * replies.length)]
            updated[idx].messages.push({
              id: `msg-${Date.now()}`,
              senderId: recipientId,
              senderName: updated[idx].participantName,
              senderAvatar: updated[idx].participantAvatar,
              recipientId: 'current-user',
              content: reply,
              timestamp: new Date(),
              isRead: false,
            })
            updated[idx].lastMessage = reply
            updated[idx].lastMessageTime = new Date()
            updated[idx].unreadCount += 1
          }
          return updated
        })
      }, 1000 + Math.random() * 2000)

      return updatedConversations
    })
  }

  const markAsRead = (conversationId: string) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map((msg) => ({
                ...msg,
                isRead: true,
              })),
            }
          : conv
      )
    )
  }

  const getConversation = (conversationId: string) => {
    return conversations.find((conv) => conv.id === conversationId)
  }

  return (
    <MessagesContext.Provider
      value={{ conversations, sendMessage, markAsRead, getConversation }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }
  return context
}
