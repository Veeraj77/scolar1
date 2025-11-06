import { apiService } from './api.service'
import { API_CONFIG } from '../config/api.config'
import type { 
  ChatMessage, 
  ChatRequest, 
  ChatResponse, 
  ApiResponse 
} from '../types/api.types'

// Chat Service for interacting with the chatbot backend
class ChatService {
  // Send a message to the chatbot
  async sendMessage(
    message: string, 
    sessionId?: string,
    userId?: string
  ): Promise<ApiResponse<ChatResponse>> {
    const request: ChatRequest = {
      message,
      sessionId,
      userId,
    }

    try {
      const response = await apiService.post<ChatResponse>(
        API_CONFIG.ENDPOINTS.CHAT,
        request
      )

      // Handle both wrapped and direct responses
      // If backend returns direct response without 'success' wrapper
      if (response.data && !response.success && typeof (response.data as any).message === 'string') {
        return {
          success: true,
          data: response.data,
          timestamp: new Date()
        }
      }

      return response
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to send message',
          code: 'CHAT_ERROR'
        },
        timestamp: new Date()
      }
    }
  }

  // Get chat history for a user
  async getChatHistory(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<ApiResponse<ChatMessage[]>> {
    return apiService.get<ChatMessage[]>(
      API_CONFIG.ENDPOINTS.CHAT_HISTORY,
      { userId, limit, offset }
    )
  }

  // Get chat history for a specific session
  async getSessionHistory(
    sessionId: string
  ): Promise<ApiResponse<ChatMessage[]>> {
    return apiService.get<ChatMessage[]>(
      `${API_CONFIG.ENDPOINTS.CHAT_HISTORY}/${sessionId}`
    )
  }

  // Delete chat history
  async deleteChatHistory(userId: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(
      `${API_CONFIG.ENDPOINTS.CHAT_HISTORY}?userId=${userId}`
    )
  }

  // Generate session ID
  generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

// Export singleton instance
export const chatService = new ChatService()