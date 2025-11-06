import { apiService } from './api.service'
import { API_CONFIG } from '../config/api.config'
import type { 
  Scholarship,
  ScholarshipSearchParams,
  ScholarshipSearchResponse,
  ApiResponse 
} from '../types/api.types'

// Scholarship Service for managing scholarships
class ScholarshipService {
  // Get all scholarships
  async getAllScholarships(
    page: number = 1,
    pageSize: number = 20
  ): Promise<ApiResponse<ScholarshipSearchResponse>> {
    return apiService.get<ScholarshipSearchResponse>(
      API_CONFIG.ENDPOINTS.SCHOLARSHIPS,
      { page, pageSize }
    )
  }

  // Search scholarships with filters
  async searchScholarships(
    params: ScholarshipSearchParams,
    page: number = 1,
    pageSize: number = 20
  ): Promise<ApiResponse<ScholarshipSearchResponse>> {
    return apiService.get<ScholarshipSearchResponse>(
      API_CONFIG.ENDPOINTS.SCHOLARSHIP_SEARCH,
      { ...params, page, pageSize }
    )
  }

  // Get scholarship by ID
  async getScholarshipById(id: string): Promise<ApiResponse<Scholarship>> {
    const endpoint = API_CONFIG.ENDPOINTS.SCHOLARSHIP_DETAILS.replace(':id', id)
    return apiService.get<Scholarship>(endpoint)
  }

  // Get scholarships by category
  async getScholarshipsByCategory(
    category: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<ApiResponse<ScholarshipSearchResponse>> {
    return this.searchScholarships({ category }, page, pageSize)
  }

  // Bookmark a scholarship
  async bookmarkScholarship(
    scholarshipId: string,
    userId: string
  ): Promise<ApiResponse<void>> {
    return apiService.post<void>(
      API_CONFIG.ENDPOINTS.BOOKMARK_SCHOLARSHIP,
      { scholarshipId, userId }
    )
  }

  // Remove bookmark
  async removeBookmark(
    scholarshipId: string,
    userId: string
  ): Promise<ApiResponse<void>> {
    return apiService.delete<void>(
      `${API_CONFIG.ENDPOINTS.BOOKMARK_SCHOLARSHIP}?scholarshipId=${scholarshipId}&userId=${userId}`
    )
  }

  // Get bookmarked scholarships
  async getBookmarkedScholarships(
    userId: string
  ): Promise<ApiResponse<Scholarship[]>> {
    return apiService.get<Scholarship[]>(
      `${API_CONFIG.ENDPOINTS.BOOKMARK_SCHOLARSHIP}?userId=${userId}`
    )
  }

  // Get upcoming deadlines
  async getUpcomingDeadlines(
    userId: string,
    days: number = 30
  ): Promise<ApiResponse<Scholarship[]>> {
    return apiService.get<Scholarship[]>(
      `${API_CONFIG.ENDPOINTS.SCHOLARSHIPS}/deadlines`,
      { userId, days }
    )
  }
}

// Export singleton instance
export const scholarshipService = new ScholarshipService()
