'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react'

export function ForgotPasswordForm({
  onBack,
}: {
  onBack: () => void
}) {
  const [step, setStep] = useState<'email' | 'code' | 'password' | 'success'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { resetPassword, verifyResetCode } = useAuth()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!email) {
        setError('Please enter your email address')
        setLoading(false)
        return
      }
      
      await resetPassword(email)
      setStep('code')
    } catch (err) {
      setError('Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!code) {
        setError('Please enter the verification code')
        setLoading(false)
        return
      }
      setStep('password')
    } catch (err) {
      setError('Invalid verification code')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!newPassword || !confirmPassword) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }

      await verifyResetCode(email, code, newPassword)
      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg transition"
            disabled={loading}
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
            <p className="text-sm text-muted-foreground">
              {step === 'email' && 'Enter your email address'}
              {step === 'code' && 'Enter the verification code'}
              {step === 'password' && 'Set a new password'}
              {step === 'success' && 'Password reset successful'}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8 border border-border">
          {step === 'success' ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">Password Reset Successful</h2>
                <p className="text-muted-foreground text-sm">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>
              </div>
              <Button
                onClick={onBack}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10"
              >
                Back to Sign In
              </Button>
            </div>
          ) : (
            <>
              {step === 'email' && (
                <form onSubmit={handleEmailSubmit} className="space-y-5">
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
                      required
                      disabled={loading}
                      className="mt-2 h-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      We'll send you a verification code to reset your password.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      'Send Reset Code'
                    )}
                  </Button>
                </form>
              )}

              {step === 'code' && (
                <form onSubmit={handleCodeSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="code" className="text-sm font-semibold text-foreground">
                      Verification Code
                    </Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="e.g. ABC123"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      required
                      disabled={loading}
                      maxLength={6}
                      className="mt-2 h-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground uppercase tracking-widest text-center"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Check your email for the 6-character code. For demo: Check browser console.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                </form>
              )}

              {step === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="newPassword" className="text-sm font-semibold text-foreground">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="mt-2 h-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Resetting...
                      </span>
                    ) : (
                      'Reset Password'
                    )}
                  </Button>
                </form>
              )}
            </>
          )}
        </Card>

        {/* Help Text */}
        {step !== 'success' && (
          <div className="text-center text-xs text-muted-foreground bg-secondary/50 p-4 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-2">Demo Mode</p>
            <p>Verification codes are logged to the browser console for testing.</p>
          </div>
        )}
      </div>
    </div>
  )
}
