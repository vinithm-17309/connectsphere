'use client'

import React from "react"

import { useState } from 'react'
import { usePosts } from '@/lib/posts-context'
import { useAuth } from '@/lib/auth-context'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Loader2, ImageIcon } from 'lucide-react'

interface NewPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewPostDialog({ open, onOpenChange }: NewPostDialogProps) {
  const { addPost } = usePosts()
  const { user } = useAuth()
  const [caption, setCaption] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469854525535-0a1dd7228f2d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!caption.trim() || !imageUrl || !user) return

    setLoading(true)
    try {
      addPost({
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
        image: imageUrl,
        caption,
        likes: [],
        comments: [],
        liked: false,
      })
      setCaption('')
      setImageUrl('')
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create a new post</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share insights and connect with your professional network
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Select an image</label>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                    imageUrl === img
                      ? 'border-primary border-2'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Sample ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            {!imageUrl && (
              <p className="text-xs text-muted-foreground">Click an image to select</p>
            )}
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <label htmlFor="caption" className="text-sm font-semibold text-foreground">
              Caption
            </label>
            <Textarea
              id="caption"
              placeholder="Write a caption for your post..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="resize-none bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Preview */}
          {imageUrl && (
            <div className="border border-border rounded-lg overflow-hidden">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!caption.trim() || !imageUrl || loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
