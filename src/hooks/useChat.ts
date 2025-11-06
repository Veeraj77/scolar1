import { useState, useCallback } from 'react'
import { chatService } from '../services/chat.service'
import type { ChatMessage } from '../types/api.types'

export function useChat(userId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId] = useState(() => chatService.generateSessionId())

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true)
    setError(null)

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await chatService.sendMessage(content, sessionId, userId)

      if (response.success && response.data) {
        // Add assistant response
        const assistantMessage: ChatMessage = {
          id: `msg_${Date.now()}_assistant`,
          role: 'assistant',
          content: response.data.message,
          timestamp: new Date(response.data.timestamp),
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        setError(response.error?.message || 'Failed to send message')
        
        // Add error message
        const errorMessage: ChatMessage = {
          id: `msg_${Date.now()}_error`,
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMsg)
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [sessionId, userId])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const loadHistory = useCallback(async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const response = await chatService.getChatHistory(userId)
      if (response.success && response.data) {
        setMessages(response.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history')
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    loadHistory,
    sessionId,
  }
}
