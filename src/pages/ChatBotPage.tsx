import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { BackendTestPanel } from "../components/BackendTestPanel"
import { motion, AnimatePresence } from "motion/react"
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Bot, 
  User, 
  Search,
  Clock,
  HelpCircle,
  BookOpen,
  Globe,
  Calculator,
  FileText,
  Calendar,
  Star,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Award,
  Settings
} from "lucide-react"

type Page = 'home' | 'signin' | 'chatbot'

interface ChatBotPageProps {
  navigateTo: (page: Page) => void
}

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

const frequentQuestions = [
  {
    icon: <Search className="h-4 w-4" />,
    question: "How do I find scholarships for my field?",
    category: "Search",
    color: "text-blue-600"
  },
  {
    icon: <Clock className="h-4 w-4" />,
    question: "What are the upcoming deadlines?",
    category: "Deadlines",
    color: "text-orange-600"
  },
  {
    icon: <FileText className="h-4 w-4" />,
    question: "What documents do I need?",
    category: "Requirements",
    color: "text-green-600"
  },
  {
    icon: <Calculator className="h-4 w-4" />,
    question: "How much funding can I get?",
    category: "Amounts",
    color: "text-purple-600"
  },
  {
    icon: <Globe className="h-4 w-4" />,
    question: "Are there international scholarships?",
    category: "International",
    color: "text-indigo-600"
  },
  {
    icon: <BookOpen className="h-4 w-4" />,
    question: "Help me write my essay",
    category: "Writing",
    color: "text-pink-600"
  }
]

const quickActions = [
  {
    icon: "🎓",
    title: "STEM Scholarships",
    description: "Engineering, Computer Science, Math",
    action: "Show me STEM scholarships",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: "🌍",
    title: "Study Abroad",
    description: "International opportunities",
    action: "Find study abroad scholarships",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: "💡",
    title: "Merit-Based",
    description: "Academic achievement awards",
    action: "Show merit-based scholarships",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: "💰",
    title: "Need-Based",
    description: "Financial assistance programs",
    action: "Find need-based scholarships",
    gradient: "from-green-500 to-emerald-500"
  }
]

const initialMessage: Message = {
  id: '1',
  type: 'bot',
  content: "Hello! I'm your personal scholarship assistant. I can help you find scholarships, understand requirements, track deadlines, and guide you through applications. What would you like to know today?",
  timestamp: new Date()
}

export function ChatBotPage({ navigateTo }: ChatBotPageProps) {
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('stem') || input.includes('engineering') || input.includes('computer') || input.includes('science')) {
      return "🔬 **STEM Scholarships Found!**\n\nHere are top STEM opportunities:\n\n🎓 **NSF Graduate Research Fellowship**\n• Amount: $37,000/year + tuition\n• Deadline: October 25, 2025\n• Fields: All STEM disciplines\n\n🎓 **Google Scholarship Program**\n• Amount: Up to $10,000\n• Deadline: December 1, 2025\n• Focus: Computer Science, Engineering\n\n🎓 **Microsoft Scholarship**\n• Amount: Full tuition coverage\n• Deadline: January 31, 2026\n• Requirements: 3.0+ GPA, demonstrated need\n\nWould you like details about any specific scholarship or help with application requirements?"
    }
    
    if (input.includes('abroad') || input.includes('international')) {
      return "🌍 **Study Abroad Scholarships**\n\nExciting international opportunities:\n\n✈️ **Fulbright Student Program**\n• Amount: Full funding for 1 year\n• Countries: 140+ destinations\n• Deadline: October 2025\n\n✈️ **Rhodes Scholarship (Oxford)**\n• Amount: Full tuition + stipend\n• Duration: 2-3 years\n• Deadline: September 2025\n\n✈️ **DAAD Scholarships (Germany)**\n• Amount: €850-1,200/month\n• Programs: Various fields\n• Multiple deadlines throughout year\n\nWhich country interests you most? I can provide more targeted recommendations!"
    }
    
    if (input.includes('deadline') || input.includes('date') || input.includes('when')) {
      return "📅 **Upcoming Scholarship Deadlines**\n\n⏰ **This Month (January 2025):**\n• Coca-Cola Scholars - January 31\n• Jack Kent Cooke Foundation - January 25\n• Davidson Fellows - February 12\n\n⏰ **Next Month (February 2025):**\n• Gates Scholarship - February 15\n• QuestBridge National College Match - February 28\n• Burger King Scholars - March 15\n\n🔔 **Pro Tip:** I can set up personalized deadline reminders for you! Just tell me which scholarships interest you.\n\nWould you like me to create a deadline calendar for your target scholarships?"
    }
    
    if (input.includes('document') || input.includes('requirement') || input.includes('need')) {
      return "📄 **Common Scholarship Requirements**\n\n**Essential Documents:**\n✅ Academic transcripts (official)\n✅ Letters of recommendation (2-3)\n✅ Personal statement/essay\n✅ Resume or CV\n✅ Financial aid forms (FAFSA, CSS Profile)\n\n**Additional Requirements (varies):**\n• Standardized test scores (SAT/ACT/GRE)\n• Portfolio (for arts/design scholarships)\n• Research proposals (for research scholarships)\n• Interview or video submission\n\n**📝 Essay Topics (Common Prompts):**\n• Career goals and aspirations\n• Leadership experiences\n• Community service impact\n• Overcoming challenges\n\nI can help you prepare any of these documents. What would you like to work on first?"
    }
    
    if (input.includes('essay') || input.includes('write') || input.includes('personal statement')) {
      return "✍️ **Essay Writing Guidance**\n\n**Structure Your Essay:**\n\n📖 **Introduction (Hook + Thesis)**\n• Start with a compelling story or question\n• Clearly state your main message\n\n📖 **Body Paragraphs (Evidence + Examples)**\n• Use specific examples and achievements\n• Show, don't just tell\n• Connect experiences to future goals\n\n📖 **Conclusion (Impact + Vision)**\n• Summarize key points\n• End with your vision for the future\n\n**💡 Pro Tips:**\n• Keep it authentic and personal\n• Address the prompt directly\n• Use active voice\n• Proofread multiple times\n\nWould you like help with a specific essay prompt or brainstorming ideas?"
    }
    
    if (input.includes('amount') || input.includes('money') || input.includes('funding')) {
      return "💰 **Scholarship Amounts & Funding Types**\n\n**Full-Ride Scholarships:**\n• Gates Scholarship: Full tuition + living expenses\n• Robertson Scholars: $95,000+ over 4 years\n• Morehead-Cain: Full cost of attendance\n\n**Partial Scholarships:**\n• National Merit: $2,500 - $10,000/year\n• Coca-Cola Scholars: $20,000 over 4 years\n• Local scholarships: $500 - $5,000\n\n**Graduate/Professional:**\n• NSF Fellowship: $37,000/year\n• Fulbright: $20,000 - $50,000\n• Research assistantships: $15,000 - $30,000\n\n**💡 Strategy:** Apply to a mix of large and small scholarships. Small scholarships have less competition and can add up significantly!\n\nWhat's your target funding amount?"
    }
    
    return "Thanks for your question! I'm here to help with all aspects of scholarship searching and applications. Here's what I can assist you with:\n\n🔍 **Search & Discovery:**\n• Find scholarships by field, location, or criteria\n• Match opportunities to your profile\n• Identify hidden gems and local scholarships\n\n📝 **Application Support:**\n• Essay writing and editing guidance\n• Document preparation checklists\n• Interview preparation tips\n\n⏰ **Organization:**\n• Deadline tracking and reminders\n• Application status management\n• Priority ranking of opportunities\n\nWhat specific area would you like help with today?"
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleFrequentQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.div 
        className="bg-white dark:bg-gray-800 border-b shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('home')}
                className="flex items-center hover:bg-blue-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ScholarBot Assistant</h1>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI-Powered Scholarship Guidance
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Test Backend
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Backend Connection Test</DialogTitle>
                    <DialogDescription>
                      Test your connection to the Hugging Face backend
                    </DialogDescription>
                  </DialogHeader>
                  <BackendTestPanel />
                </DialogContent>
              </Dialog>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                Online 24/7
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - FAQ and Quick Actions */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Quick Actions */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full justify-start text-left h-auto p-4 border-2 bg-gradient-to-br ${action.gradient} bg-opacity-10 hover:shadow-lg transition-all`}
                      onClick={() => handleQuickAction(action.action)}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <span className="text-2xl">{action.icon}</span>
                        <div className="flex-1">
                          <div className="text-sm">{action.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {action.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Frequent Questions */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                  Frequent Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {frequentQuestions.map((faq, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3 hover:bg-blue-50"
                      onClick={() => handleFrequentQuestion(faq.question)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className={faq.color}>
                          {faq.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">
                            {faq.category}
                          </div>
                          <div className="text-sm">{faq.question}</div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-base text-white">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4" />
                    <span className="text-sm">Scholarships Found</span>
                  </div>
                  <Badge className="bg-white/20 text-white border-0">127</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Applications Started</span>
                  </div>
                  <Badge className="bg-white/20 text-white border-0">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Deadlines Tracked</span>
                  </div>
                  <Badge className="bg-white/20 text-white border-0">15</Badge>
                </div>
                <Separator className="bg-white/20" />
                <div className="text-center pt-2">
                  <div className="flex items-center justify-center mb-1">
                    <Award className="h-5 w-5 mr-1" />
                    <div className="text-3xl">$45,000</div>
                  </div>
                  <div className="text-xs text-blue-100">
                    Potential Funding Identified
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Chat Area */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-[800px] flex flex-col border-2 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-b-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl mr-3">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      Scholarship Assistant
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ask me anything about scholarships, applications, and deadlines
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">4.9/5 rating</span>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                <div className="space-y-6">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-5 rounded-2xl shadow-md ${
                            message.type === 'user'
                              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                              : 'bg-white dark:bg-gray-800 border-2'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {message.type === 'bot' ? (
                                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-lg">
                                  <Bot className="h-4 w-4 text-white" />
                                </div>
                              ) : (
                                <div className="bg-white/20 p-2 rounded-lg">
                                  <User className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="whitespace-pre-line">{message.content}</div>
                              <div className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl max-w-[80%] shadow-md border-2">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-lg">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex space-x-2">
                            <motion.div 
                              className="w-2 h-2 bg-blue-600 rounded-full"
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                            />
                            <motion.div 
                              className="w-2 h-2 bg-indigo-600 rounded-full"
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div 
                              className="w-2 h-2 bg-purple-600 rounded-full"
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-6 border-t-2 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <div className="flex space-x-4">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me about scholarships, deadlines, or application help..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    className="flex-1 border-2 focus:border-blue-400 shadow-sm"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="flex-shrink-0 border-2 hover:bg-blue-50"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleSendMessage(inputValue)}
                    className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center flex items-center justify-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Try asking: "Show me engineering scholarships" or "What documents do I need?"
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}