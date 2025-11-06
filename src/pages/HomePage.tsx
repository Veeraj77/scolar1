import { Header } from "../components/Header"
import { HeroSection } from "../components/HeroSection"
import { ScholarshipCategories } from "../components/ScholarshipCategories"
import { Footer } from "../components/Footer"
import { DomainCategories } from "../components/DomainCategories"

type Page = 'home' | 'signin' | 'chatbot'

interface HomePageProps {
  navigateTo: (page: Page) => void
}

export function HomePage({ navigateTo }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header navigateTo={navigateTo} />
      <main>
        <HeroSection navigateTo={navigateTo} />
        <DomainCategories navigateTo={navigateTo} />
        <ScholarshipCategories navigateTo={navigateTo} />
      </main>
      <Footer />
    </div>
  )
}