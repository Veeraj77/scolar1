import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Bot, Search, BookOpen, Trophy, ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react"
import { motion } from "motion/react"

type Page = 'home' | 'signin' | 'chatbot'

interface HeroSectionProps {
  navigateTo: (page: Page) => void
}

export function HeroSection({ navigateTo }: HeroSectionProps) {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Scholarship Discovery
              </Badge>
              <h1 className="text-5xl lg:text-7xl leading-tight">
                Find Your Perfect 
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Scholarship
                </span>
                with AI Guidance
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Get personalized scholarship recommendations, application guidance, and deadline reminders. 
                Our AI chatbot has helped over 10,000+ students secure funding for their education.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigateTo('chatbot')}
              >
                <Bot className="mr-2 h-5 w-5" />
                Start Chat Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-2 hover:bg-blue-50"
                onClick={() => navigateTo('signin')}
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Scholarships
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-blue-600 mr-1" />
                  <div className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">50K+</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Scholarships Listed</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-1" />
                  <div className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$2.5B+</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Funding</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 text-yellow-600 mr-1" />
                  <div className="text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">95%</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Preview */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Card */}
              <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-2">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1757310998648-f8aaa5572e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGNoYXRib3QlMjB0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MjM3MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="AI Chatbot Technology"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 mb-2">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Assistant Active
                    </Badge>
                    <p className="text-white text-sm">Real-time scholarship matching powered by AI</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl">What can I help you with today?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="justify-start hover:bg-blue-50 hover:border-blue-300 transition-all">
                      <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
                      Find Scholarships
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start hover:bg-purple-50 hover:border-purple-300 transition-all">
                      <Trophy className="mr-2 h-4 w-4 text-purple-600" />
                      Application Tips
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start hover:bg-green-50 hover:border-green-300 transition-all">
                      📅 Upcoming Deadlines
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                      🌍 Study Abroad
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Floating Badge - Top Right */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full text-sm shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="inline h-4 w-4 mr-1" />
                AI Powered
              </motion.div>
              
              {/* Floating Badge - Bottom Left */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 px-4 py-2 rounded-full text-sm shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ✅ Trusted by 10K+ Students
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
