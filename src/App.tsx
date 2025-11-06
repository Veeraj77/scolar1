import { useState } from 'react'
import { HomePage } from "./pages/HomePage"
import { SignInPage } from "./pages/SignInPage"
import { ChatBotPage } from "./pages/ChatBotPage"
import { AuthProvider } from "./context/AuthContext"

type Page = 'home' | 'signin' | 'chatbot'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
  }

  // Home Page Component
  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage navigateTo={navigateTo} />
    }

    // Sign In Page
    if (currentPage === 'signin') {
      return <SignInPage navigateTo={navigateTo} />
    }

    // Chatbot Page
    if (currentPage === 'chatbot') {
      return <ChatBotPage navigateTo={navigateTo} />
    }

    // Default to home
    return <HomePage navigateTo={navigateTo} />
  }

  return (
    <AuthProvider>
      {renderPage()}
    </AuthProvider>
  )
}