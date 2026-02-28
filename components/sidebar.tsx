'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import {
  Home,
  Search,
  MessageCircle,
  User,
  LogOut,
  PlusCircle,
  Settings,
} from 'lucide-react'

interface SidebarProps {
  onNewPost?: () => void
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Sidebar({
  onNewPost,
  activeTab = 'home',
  onTabChange,
}: SidebarProps) {
  const { user, logout } = useAuth()

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const handleTabChange = (tabId: string) => {
    onTabChange?.(tabId)
  }

  return (
    <aside className="w-64 bg-background border-r border-border min-h-screen flex flex-col p-4 sticky top-0 hidden md:flex">
      
      {/* Logo */}
      <div className="mb-8 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
          <h1 className="text-2xl font-bold text-foreground">
            ConnectSphere
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition font-medium text-sm ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-secondary/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-3 border-t border-border pt-4">
        
        <Button
          onClick={onNewPost}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Create Post
        </Button>

        {user && (
          <div className="p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || '/placeholder.svg'}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {user.username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.followers} followers
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="text-muted-foreground hover:text-foreground bg-transparent"
          >
            <Settings className="w-4 h-4" />
          </Button>

          <Button
            onClick={logout}
            variant="outline"
            className="flex-1 text-muted-foreground hover:text-destructive hover:bg-destructive/5 bg-transparent flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}