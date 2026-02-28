'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabase'

interface User {
  id: string
  username: string
  email: string
  bio: string
  avatar: string
  followers: number
  following: number
  postsCount: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  verifyResetCode: (email: string, code: string, newPassword: string) => Promise<void>
  resetPasswordEmail: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string | null>(null)

  /* ================= SESSION LISTENER ================= */

  useEffect(() => {
  const init = async () => {
    try {
      const { data } = await supabase.auth.getSession()

      if (data.session?.user) {
        await loadUserProfile(data.session.user.id)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Session error:', error)
      setUser(null)
    } finally {
      // 🔥 ALWAYS STOP LOADING
      setLoading(false)
    }
  }

  init()

  const { data: listener } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setUser(null)
      }

      // 🔥 ENSURE LOADING STOPS
      setLoading(false)
    }
  )

  return () => {
    listener.subscription.unsubscribe()
  }
}, [])
  /* ================= ONLINE / OFFLINE ================= */

  useEffect(() => {
    if (!user) return

    // 🔹 Set user online
    const setOnline = async () => {
      await supabase
        .from('profiles')
        .update({ is_online: true })
        .eq('id', user.id)
    }

    setOnline()

    // 🔹 Set user offline when tab closes
    const handleUnload = async () => {
      await supabase
        .from('profiles')
        .update({ is_online: false })
        .eq('id', user.id)
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => {
      handleUnload()
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [user])

  /* ================= LOAD PROFILE ================= */

  const loadUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (!data) {
      const { data: authUser } = await supabase.auth.getUser()

      if (authUser.user) {
        await supabase.from('profiles').insert({
          id: authUser.user.id,
          username: authUser.user.email?.split('@')[0] || 'user',
          email: authUser.user.email,
          bio: 'Welcome to ConnectSphere! 🌍',
          avatar: '',
          followers: 0,
          following: 0,
          posts_count: 0,
          is_online: true,
        })

        return loadUserProfile(authUser.user.id)
      }
    }

    if (error) {
      console.error(error)
      return
    }

    if (data) {
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        bio: data.bio || '',
        avatar: data.avatar || '',
        followers: data.followers || 0,
        following: data.following || 0,
        postsCount: data.posts_count || 0,
      })
    }
  }

  /* ================= LOGIN ================= */

  const login = async (username: string, password: string) => {
    setLoading(true)

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', username)
        .maybeSingle()

      if (!profile) {
        alert('User not found')
        return
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password,
      })

      if (error) {
        alert('Invalid password')
        return
      }

    } catch (err: any) {
      console.error(err)
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  /* ================= SIGNUP ================= */

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true)

    try {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle()

      if (existing) {
        alert('Username already taken')
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          username,
          email,
          bio: 'Welcome to ConnectSphere! 🌍',
          avatar: '',
          followers: 0,
          following: 0,
          posts_count: 0,
          is_online: true,
        })
      }

    } catch (err: any) {
      console.error(err)
      alert('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  /* ================= LOGOUT ================= */

  const logout = async () => {
    try {
      if (user) {
        await supabase
          .from('profiles')
          .update({ is_online: false })
          .eq('id', user.id)
      }

      await supabase.auth.signOut()
      setUser(null)
      window.location.reload()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  /* ================= PASSWORD RESET ================= */

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    setResetPasswordEmail(email)
  }

  const verifyResetCode = async (_email: string, _code: string, newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
    setResetPasswordEmail(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        verifyResetCode,
        resetPasswordEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}