'use client'

import { Post, usePosts } from '@/lib/posts-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { likePost, unlikePost } = usePosts()
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    if (post.liked) {
      unlikePost(post.id)
    } else {
      likePost(post.id)
    }
  }

  return (
    <Card className="border border-border shadow-sm bg-card overflow-hidden mb-4">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar || "/placeholder.svg"}
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm text-foreground">{post.username}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="relative w-full bg-secondary aspect-square">
        <img
          src={post.image || "/placeholder.svg"}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="h-8 w-8 p-0 hover:bg-secondary text-muted-foreground"
            >
              <Heart
                className={`w-5 h-5 ${
                  post.liked ? 'fill-primary text-primary' : 'text-muted-foreground'
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-secondary text-muted-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-secondary text-muted-foreground"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-secondary text-muted-foreground"
          >
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm text-foreground">
          {post.likes.length.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            <span className="font-semibold">{post.username}</span> {post.caption}
          </p>
          {post.comments.length > 0 && (
            <button className="text-xs text-muted-foreground hover:text-foreground">
              View all {post.comments.length} comments
            </button>
          )}
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="pt-3 border-t border-border space-y-2">
            <div className="text-xs text-muted-foreground">No comments yet. Be the first!</div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 text-sm bg-secondary rounded-full px-4 py-2 outline-none focus:bg-secondary/80 text-foreground placeholder:text-muted-foreground border border-border"
              />
              <Button variant="ghost" size="sm" className="text-primary text-sm hover:text-primary/80">
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
