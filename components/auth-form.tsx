'use client'

import React from "react"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { ForgotPasswordForm } from './forgot-password-form'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        if (!username || !password) {
          setError('Please fill in all fields')
          setLoading(false)
          return
        }
        await login(username, password)
      } else {
        if (!username || !email || !password) {
          setError('Please fill in all fields')
          setLoading(false)
          return
        }
        await signup(username, email, password)
      }
    } catch (err) {
      setError('Authentication failed. Please try again.')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (showForgotPassword) {
    return <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/95 to-primary/90 items-center justify-center p-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white text-balance">
              Welcome to ConnectSphere
            </h1>
            <p className="text-lg text-white/80">
              Connect with friends, share moments, and build your professional network
            </p>
          </div>
          
          <div className="space-y-4 pt-8">
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Share Your Story</p>
                <p className="text-sm text-white/70">Post photos and updates with your network</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Connect & Collaborate</p>
                <p className="text-sm text-white/70">Build meaningful professional relationships</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Stay Updated</p>
                <p className="text-sm text-white/70">Never miss updates from people you follow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 lg:hidden">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-foreground">ConnectSphere</span>
          </div>

          {/* Form Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLogin 
                ? 'Sign in to your ConnectSphere account' 
                : 'Join ConnectSphere today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-semibold text-foreground">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                className="mt-2 h-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={!isLogin}
                  disabled={loading}
                  className="mt-2 h-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Password
                </Label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-primary hover:text-primary/80 font-semibold transition"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-2 h-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-background text-muted-foreground">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </span>
            </div>
          </div>

          {/* Toggle */}
          <Button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            variant="outline"
            disabled={loading}
            className="w-full h-10 border-border text-foreground hover:bg-secondary"
          >
            {isLogin ? 'Create new account' : 'Sign in instead'}
          </Button>

          {/* Demo Info */}
          <div className="text-center text-xs text-muted-foreground bg-secondary/50 p-4 rounded-lg border border-border space-y-1">
            <p className="font-semibold text-foreground">Demo Mode</p>
            <p>No email verification needed. Try any username & password.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
