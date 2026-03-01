'use client'

import { useAuth } from '@/lib/auth-context'
import { usePosts } from '@/lib/posts-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import {
  Edit2,
  Save,
  X,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Heart,
  MessageCircle,
} from 'lucide-react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface ProfilePageProps {
  onClose?: () => void
}

export function ProfilePage({ onClose }: ProfilePageProps) {
  const { user, logout } = useAuth()
  const { posts } = usePosts()
  const [isEditing, setIsEditing] = useState(false)
  const [editBio, setEditBio] = useState(user?.bio || '')
  const [editLocation, setEditLocation] = useState('San Francisco, CA')
  const [editWebsite, setEditWebsite] = useState('connectsphere.io')

  if (!user) return null

  const userPosts = posts.filter((p) => p.userId === user.id)
  const totalLikes = userPosts.reduce((acc, post) => acc + post.likes.length, 0)

  const handleSaveProfile = () => {
    // In a real app, this would update the backend
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Close Button Mobile */}
      {onClose && (
        <div className="md:hidden flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-xl font-bold">My Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20" />

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Avatar and Name */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 mb-8">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.username}
            className="w-32 h-32 rounded-full border-4 border-background object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              {user.username}
            </h1>
            <p className="text-muted-foreground">@{user.username.toLowerCase()}</p>
          </div>
          <div className="flex gap-2 self-end md:self-auto">
            {!isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 border border-border">
            <div className="text-2xl font-bold text-primary">
              {userPosts.length}
            </div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </Card>
          <Card className="p-4 border border-border">
            <div className="text-2xl font-bold text-primary">{user.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </Card>
          <Card className="p-4 border border-border">
            <div className="text-2xl font-bold text-primary">{user.following}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </Card>
        </div>

        {/* Bio Section */}
        <Card className="p-6 border border-border mb-8">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Bio
                </label>
                <Textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Location
                </label>
                <Input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="Your location"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Website
                </label>
                <Input
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  placeholder="Your website"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveProfile}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-foreground">{editBio}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {editLocation}
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  {editWebsite}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined{' '}
                  {formatDistanceToNow(new Date(Date.now() - 90 * 24 * 60 * 60000), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Posts Section */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Your Posts ({userPosts.length})
          </h2>
          {userPosts.length === 0 ? (
            <Card className="p-8 text-center border border-border">
              <p className="text-muted-foreground">
                You haven't posted anything yet. Share your first post!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative group">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <div className="flex items-center gap-2 text-white">
                        <Heart className="w-5 h-5" />
                        <span>{post.likes.length}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm line-clamp-2 text-foreground">
                      {post.caption}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                     {post.timestamp &&
  formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
