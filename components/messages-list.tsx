'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { formatDistanceToNow } from 'date-fns'
import { MessageSquare, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface MessagesListProps {
  onSelectConversation: (conversation: any) => void
  selectedConversationId: string | null
}

interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string | null
  lastMessage: string
  lastMessageTime: Date
}

export function MessagesList({
  onSelectConversation,
  selectedConversationId,
}: MessagesListProps) {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    if (!user) return

    const fetchConversations = async () => {
      // Get users current user follows
      const { data: follows } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)

      if (!follows || follows.length === 0) {
        setConversations([])
        return
      }

      const userIds = follows.map((f) => f.following_id)

      // Get profile info
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds)

      if (!profiles) return

      const conversationsData: Conversation[] = []

      for (const profile of profiles) {
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .or(
            `and(sender_id.eq.${user.id},receiver_id.eq.${profile.id}),and(sender_id.eq.${profile.id},receiver_id.eq.${user.id})`
          )
          .order('created_at', { ascending: false })
          .limit(1)

        conversationsData.push({
          id: profile.id,
          participantId: profile.id,
          participantName: profile.username,
          participantAvatar: profile.avatar || null,
          lastMessage: messages?.[0]?.content || 'Start conversation',
          lastMessageTime: messages?.[0]?.created_at
            ? new Date(messages[0].created_at)
            : new Date(),
        })
      }

      setConversations(conversationsData)
    }

    fetchConversations()
  }, [user])

  const filtered = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full md:w-80 border-r border-border flex flex-col bg-background h-screen md:h-auto">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-0 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <MessageSquare className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? 'No conversations found'
                : 'Follow someone to start chatting'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filtered.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv)} 
                className={`w-full p-3 rounded-lg text-left transition-colors flex items-start gap-3 ${
                  selectedConversationId === conv.id
                    ? 'bg-primary/10 border border-primary/30'
                    : 'hover:bg-secondary/50'
                }`}
              >
                <img
                  src={conv.participantAvatar || '/placeholder.svg'}
                  alt={conv.participantName}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold truncate text-foreground">
                      {conv.participantName}
                    </p>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {formatDistanceToNow(conv.lastMessageTime, {
                        addSuffix: false,
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}