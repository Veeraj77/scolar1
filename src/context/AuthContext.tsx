import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/auth.service'
import type { User, SignUpRequest, SignInRequest } from '../types/api.types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signUp: (data: SignUpRequest) => Promise<{ success: boolean; error?: string }>
  signIn: (data: SignInRequest) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const signUp = async (data: SignUpRequest) => {
    setIsLoading(true)
    try {
      const response = await authService.signUp(data)
      
      if (response.success && response.data) {
        setUser(response.data.user)
        return { success: true }
      }
      
      return { 
        success: false, 
        error: response.error?.message || 'Sign up failed' 
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (data: SignInRequest) => {
    setIsLoading(true)
    try {
      const response = await authService.signIn(data)
      
      if (response.success && response.data) {
        setUser(response.data.user)
        return { success: true }
      }
      
      return { 
        success: false, 
        error: response.error?.message || 'Sign in failed' 
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await authService.signOut()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      const response = await authService.getUserProfile(user.id)
      if (response.success && response.data) {
        setUser(response.data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
