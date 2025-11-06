import { useState, createContext, useContext } from 'react'

type Page = 'home' | 'signin' | 'chatbot'

interface RouterContextType {
  currentPage: Page
  navigateTo: (page: Page) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

export function Router({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
  }

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a Router')
  }
  return context
}