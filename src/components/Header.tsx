import { Button } from "./ui/button"
import { Search, Menu, User, Sparkles } from "lucide-react"
import { motion } from "motion/react"

type Page = 'home' | 'signin' | 'chatbot'

interface HeaderProps {
  navigateTo: (page: Page) => void
}

export function Header({ navigateTo }: HeaderProps) {
  return (
    <motion.header 
      className="border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigateTo('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ScholarBot
              </span>
              <div className="text-xs text-gray-500">AI Assistant</div>
            </div>
          </motion.div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <motion.a 
            href="#home" 
            className="hover:text-primary transition-colors relative group"
            whileHover={{ y: -2 }}
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all"></span>
          </motion.a>
          <motion.a 
            href="#scholarships" 
            className="hover:text-primary transition-colors relative group"
            whileHover={{ y: -2 }}
          >
            Scholarships
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all"></span>
          </motion.a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex hover:bg-blue-50 transition-all"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateTo('signin')}
              className="border-2 hover:border-blue-600 hover:bg-blue-50 transition-all"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </motion.div>
          <Button className="md:hidden" variant="ghost" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
