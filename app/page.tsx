'use client'

import { AuthProvider } from '@/lib/auth-context'
import { PostsProvider } from '@/lib/posts-context'
import { AppContent } from '@/components/app-content'

export default function Page() {
  return (
    <AuthProvider>
      <PostsProvider>
        <AppContent />
      </PostsProvider>
    </AuthProvider>
  )
}
