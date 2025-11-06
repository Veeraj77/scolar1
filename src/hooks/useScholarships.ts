import { useState, useEffect, useCallback } from 'react'
import { scholarshipService } from '../services/scholarship.service'
import type { Scholarship, ScholarshipSearchParams } from '../types/api.types'

export function useScholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const fetchScholarships = useCallback(async (
    params?: ScholarshipSearchParams,
    pageNum: number = 1
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = params 
        ? await scholarshipService.searchScholarships(params, pageNum)
        : await scholarshipService.getAllScholarships(pageNum)

      if (response.success && response.data) {
        setScholarships(response.data.scholarships)
        setTotal(response.data.total)
        setPage(response.data.page)
      } else {
        setError(response.error?.message || 'Failed to fetch scholarships')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchByCategory = useCallback(async (category: string) => {
    return fetchScholarships({ category })
  }, [fetchScholarships])

  return {
    scholarships,
    isLoading,
    error,
    total,
    page,
    fetchScholarships,
    fetchByCategory,
  }
}

export function useScholarshipDetails(id: string) {
  const [scholarship, setScholarship] = useState<Scholarship | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await scholarshipService.getScholarshipById(id)
        if (response.success && response.data) {
          setScholarship(response.data)
        } else {
          setError(response.error?.message || 'Failed to fetch scholarship details')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  return { scholarship, isLoading, error }
}

export function useBookmarks(userId?: string) {
  const [bookmarkedScholarships, setBookmarkedScholarships] = useState<Scholarship[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBookmarks = useCallback(async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const response = await scholarshipService.getBookmarkedScholarships(userId)
      if (response.success && response.data) {
        setBookmarkedScholarships(response.data)
      }
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const toggleBookmark = useCallback(async (scholarshipId: string) => {
    if (!userId) return

    const isBookmarked = bookmarkedScholarships.some(s => s.id === scholarshipId)

    try {
      if (isBookmarked) {
        await scholarshipService.removeBookmark(scholarshipId, userId)
        setBookmarkedScholarships(prev => prev.filter(s => s.id !== scholarshipId))
      } else {
        await scholarshipService.bookmarkScholarship(scholarshipId, userId)
        // Refresh bookmarks
        fetchBookmarks()
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err)
    }
  }, [userId, bookmarkedScholarships, fetchBookmarks])

  useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  return {
    bookmarkedScholarships,
    isLoading,
    toggleBookmark,
    refreshBookmarks: fetchBookmarks,
  }
}
