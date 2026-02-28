'use client'

import { usePosts } from '@/lib/posts-context'
import { PostCard } from './post-card'

export function Feed() {
  const { posts } = usePosts()

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Start following people!</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
