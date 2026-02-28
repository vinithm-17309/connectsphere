'use client'

import { useAuth } from '@/lib/auth-context'
import { AuthForm } from './auth-form'
import { Sidebar } from './sidebar'
import { Feed } from './feed'
import { Suggestions } from './suggestions'
import { NewPostDialog } from './new-post-dialog'
import { MessagesList } from './messages-list'
import { MessageThread } from './message-thread'
import { ProfilePage } from './profile-page'
import { useState } from 'react'

function MessagesContent({
  selectedConversation,
  onSelectConversation,
}: {
  selectedConversation: any
  onSelectConversation: (conversation: any) => void
}) {
  const conversation = selectedConversation

  return (
    <div className="flex-1 flex gap-0 h-screen">
      <MessagesList
        onSelectConversation={onSelectConversation}
        selectedConversationId={conversation?.id || null}
      />
      <div className="flex-1 hidden md:flex">
        <MessageThread
          conversation={conversation || null}
          onBack={() => onSelectConversation(null)}
        />
      </div>
    </div>
  )
}

export function AppContent() {
  const { user, loading } = useAuth()
  const [newPostOpen, setNewPostOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [selectedConversation, setSelectedConversation] = useState<any>(null)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading ConnectSphere...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex gap-0">
        {/* Sidebar */}
        <Sidebar 
          onNewPost={() => setNewPostOpen(true)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Home */}
          {activeTab === 'home' && (
            <>
              <main className="flex-1 border-r border-border px-4 py-6 max-w-2xl">
                <Feed />
              </main>

              <aside className="w-80 border-l border-border px-4 py-6 hidden lg:block">
                <Suggestions />
              </aside>
            </>
          )}

          {/* Explore */}
          {activeTab === 'explore' && (
            <main className="flex-1 border-r border-border px-4 py-6 max-w-4xl">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Explore</h2>
                <Suggestions showAll />
              </div>
            </main>
          )}

          {/* Messages */}
          {activeTab === 'messages' && (
            <MessagesContent 
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <main className="flex-1 border-r border-border">
              <ProfilePage onClose={() => setActiveTab('home')} />
            </main>
          )}
        </div>
      </div>

      <NewPostDialog open={newPostOpen} onOpenChange={setNewPostOpen} />
    </div>
  )
}