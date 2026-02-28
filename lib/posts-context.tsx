'use client'

import React, { createContext, useContext, useState } from 'react'

export interface Like {
  userId: string
  username: string
}

export interface Comment {
  id: string
  userId: string
  username: string
  content: string
  timestamp: Date
}

export interface Post {
  id: string
  userId: string
  username: string
  avatar: string
  image: string
  caption: string
  likes: Like[]
  comments: Comment[]
  timestamp: Date
  liked: boolean
}

interface PostsContextType {
  posts: Post[]
  addPost: (post: Omit<Post, 'id' | 'timestamp'>) => void
  likePost: (postId: string) => void
  unlikePost: (postId: string) => void
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'Sarah Anderson',
    avatar: 'https://images.unsplash.com/photo-1506631197048-46159a1a675e?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Excited to announce our new product launch! This has been months of hard work and collaboration. Grateful for this amazing team 🚀',
    likes: [
      { userId: 'user2', username: 'John Chen' },
      { userId: 'user3', username: 'Emma Rodriguez' },
      { userId: 'user4', username: 'Michael Park' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 3600000),
    liked: false,
  },
  {
    id: '2',
    userId: 'user2',
    username: 'John Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Just completed an amazing workshop on AI & machine learning. The future is here! 🤖 Loved connecting with brilliant minds in the industry',
    likes: [
      { userId: 'user1', username: 'Sarah Anderson' },
      { userId: 'user5', username: 'Lisa Wong' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 7200000),
    liked: false,
  },
  {
    id: '3',
    userId: 'user3',
    username: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Team building at the office today! Nothing beats face-to-face collaboration ☕💼 Great energy and productive discussions',
    likes: [
      { userId: 'user1', username: 'Sarah Anderson' },
      { userId: 'user2', username: 'John Chen' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 10800000),
    liked: false,
  },
  {
    id: '4',
    userId: 'user4',
    username: 'Michael Park',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Q3 results are in! Proud of what our team accomplished this quarter. Strategic initiatives paying off 📊💡',
    likes: [
      { userId: 'user2', username: 'John Chen' },
      { userId: 'user5', username: 'Lisa Wong' },
      { userId: 'user1', username: 'Sarah Anderson' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 14400000),
    liked: false,
  },
  {
    id: '5',
    userId: 'user5',
    username: 'Lisa Wong',
    avatar: 'https://images.unsplash.com/photo-1517841905240-1c01a6b0144c?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Speaking at the Digital Summit next month! Excited to share insights on digital transformation and innovation strategies 🎤',
    likes: [
      { userId: 'user1', username: 'Sarah Anderson' },
      { userId: 'user3', username: 'Emma Rodriguez' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 18000000),
    liked: false,
  },
  {
    id: '6',
    userId: 'user1',
    username: 'Sarah Anderson',
    avatar: 'https://images.unsplash.com/photo-1506631197048-46159a1a675e?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Mentoring young professionals is one of my favorite parts of this role. Investing in the next generation of leaders 🌱',
    likes: [
      { userId: 'user2', username: 'John Chen' },
      { userId: 'user4', username: 'Michael Park' },
      { userId: 'user5', username: 'Lisa Wong' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 21600000),
    liked: false,
  },
  {
    id: '7',
    userId: 'user2',
    username: 'John Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Just published our latest market analysis. Check it out and let me know your thoughts! 📈 Link in bio',
    likes: [
      { userId: 'user3', username: 'Emma Rodriguez' },
      { userId: 'user4', username: 'Michael Park' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 25200000),
    liked: false,
  },
  {
    id: '8',
    userId: 'user3',
    username: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
    caption: 'Celebrating 5 years with this amazing company! Grateful for the growth, challenges, and wonderful team members 🎉',
    likes: [
      { userId: 'user1', username: 'Sarah Anderson' },
      { userId: 'user2', username: 'John Chen' },
      { userId: 'user4', username: 'Michael Park' },
      { userId: 'user5', username: 'Lisa Wong' },
    ],
    comments: [],
    timestamp: new Date(Date.now() - 28800000),
    liked: false,
  },
]

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)

  const addPost = (post: Omit<Post, 'id' | 'timestamp'>) => {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    setPosts([newPost, ...posts])
  }

  const likePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: true,
              likes: [...post.likes, { userId: 'current-user', username: 'You' }],
            }
          : post
      )
    )
  }

  const unlikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: false,
              likes: post.likes.filter((like) => like.userId !== 'current-user'),
            }
          : post
      )
    )
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, likePost, unlikePost }}>
      {children}
    </PostsContext.Provider>
  )
}

export function usePosts() {
  const context = useContext(PostsContext)
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider')
  }
  return context
}
