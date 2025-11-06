import { apiService } from './api.service'
import { API_CONFIG } from '../config/api.config'
import type { 
  Application,
  ApplicationDocument,
  ApiResponse 
} from '../types/api.types'

// Application Tracking Service
class ApplicationService {
  // Get all applications for a user
  async getUserApplications(userId: string): Promise<ApiResponse<Application[]>> {
    return apiService.get<Application[]>(
      API_CONFIG.ENDPOINTS.APPLICATIONS,
      { userId }
    )
  }

  // Get application by ID
  async getApplicationById(id: string): Promise<ApiResponse<Application>> {
    const endpoint = API_CONFIG.ENDPOINTS.APPLICATION_STATUS.replace(':id', id)
    return apiService.get<Application>(endpoint)
  }

  // Create a new application
  async createApplication(
    data: Partial<Application>
  ): Promise<ApiResponse<Application>> {
    return apiService.post<Application>(
      API_CONFIG.ENDPOINTS.APPLICATIONS,
      data
    )
  }

  // Update application
  async updateApplication(
    id: string,
    data: Partial<Application>
  ): Promise<ApiResponse<Application>> {
    return apiService.put<Application>(
      `${API_CONFIG.ENDPOINTS.APPLICATIONS}/${id}`,
      data
    )
  }

  // Update application status
  async updateApplicationStatus(
    id: string,
    status: Application['status']
  ): Promise<ApiResponse<Application>> {
    const endpoint = API_CONFIG.ENDPOINTS.APPLICATION_STATUS.replace(':id', id)
    return apiService.patch<Application>(endpoint, { status })
  }

  // Delete application
  async deleteApplication(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(
      `${API_CONFIG.ENDPOINTS.APPLICATIONS}/${id}`
    )
  }

  // Add document to application
  async addDocument(
    applicationId: string,
    document: Partial<ApplicationDocument>
  ): Promise<ApiResponse<ApplicationDocument>> {
    return apiService.post<ApplicationDocument>(
      `${API_CONFIG.ENDPOINTS.APPLICATIONS}/${applicationId}/documents`,
      document
    )
  }

  // Remove document from application
  async removeDocument(
    applicationId: string,
    documentId: string
  ): Promise<ApiResponse<void>> {
    return apiService.delete<void>(
      `${API_CONFIG.ENDPOINTS.APPLICATIONS}/${applicationId}/documents/${documentId}`
    )
  }

  // Get applications by status
  async getApplicationsByStatus(
    userId: string,
    status: Application['status']
  ): Promise<ApiResponse<Application[]>> {
    return apiService.get<Application[]>(
      API_CONFIG.ENDPOINTS.APPLICATIONS,
      { userId, status }
    )
  }

  // Get upcoming deadlines
  async getUpcomingDeadlines(
    userId: string,
    days: number = 30
  ): Promise<ApiResponse<Application[]>> {
    return apiService.get<Application[]>(
      `${API_CONFIG.ENDPOINTS.APPLICATIONS}/deadlines`,
      { userId, days }
    )
  }
}

// Export singleton instance
export const applicationService = new ApplicationService()
