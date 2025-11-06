import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { motion } from "motion/react"
import { 
  GraduationCap, 
  Globe, 
  Trophy, 
  Heart, 
  Laptop, 
  Paintbrush,
  MessageCircle,
  Clock,
  ArrowRight,
  Sparkles,
  X,
  ExternalLink,
  Star,
  CheckCircle
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"

type Page = 'home' | 'signin' | 'chatbot'

interface ScholarshipCategoriesProps {
  navigateTo?: (page: Page) => void
}

const scholarshipData = {
  "Merit-Based": [
      { "name": "National Merit Scholarship", "award": "₹2,07,500 - Full Tuition", "deadline": "October 2025" },
      { "name": "Presidential Scholars Program", "award": "Recognition + Benefits", "deadline": "December 2025" },
      { "name": "Coca-Cola Scholars Program", "award": "₹16,60,000", "deadline": "October 2025" },
      { "name": "Dell Scholars Program", "award": "₹16,60,000", "deadline": "December 2025" },
      { "name": "Jack Kent Cooke Foundation Scholarship", "award": "Up to ₹45,65,000/year", "deadline": "November 2025" },
      { "name": "QuestBridge National College Match", "award": "Full 4-year scholarship", "deadline": "September 2025" },
      { "name": "Gates Scholarship", "award": "Full Cost of Attendance", "deadline": "September 2025" },
      { "name": "Davidson Fellows Scholarship", "award": "₹8,30,000 - ₹41,50,000", "deadline": "February 2026" },
      { "name": "Elks National Foundation Most Valuable Student", "award": "₹3,32,000 - ₹41,50,000", "deadline": "November 2025" },
      { "name": "Horatio Alger Association Scholarship", "award": "₹20,75,000", "deadline": "October 2025" }
    ],

    "Need-Based": [
      { "name": "Federal Pell Grant", "award": "Up to ₹6,14,000", "deadline": "June 2026" },
      { "name": "Federal SEOG Grant", "award": "₹8,300 - ₹3,32,000", "deadline": "Varies by school" },
      { "name": "State Grant Programs", "award": "Varies by state", "deadline": "Varies by state" },
      { "name": "Jack Kent Cooke Foundation College Scholarship", "award": "Up to ₹45,65,000/year", "deadline": "November 2025" },
      { "name": "QuestBridge Scholarship", "award": "Full 4-year scholarship", "deadline": "September 2025" },
      { "name": "Dell Scholars Program", "award": "₹16,60,000", "deadline": "December 2025" },
      { "name": "Horatio Alger Scholarship", "award": "₹20,75,000", "deadline": "October 2025" },
      { "name": "Gates Millennium Scholars Program", "award": "Full Cost of Attendance", "deadline": "September 2025" },
      { "name": "Dream.US National Scholarship", "award": "Up to ₹27,40,000", "deadline": "February 2026" },
      { "name": "Opportunity Scholarship Program", "award": "Varies", "deadline": "March 2026" }
    ],

    "Study Abroad": [
      { "name": "Fulbright Program", "award": "Full funding", "deadline": "October 2025" },
      { "name": "Rhodes Scholarship", "award": "Full funding", "deadline": "September 2025" },
      { "name": "Gilman Scholarship", "award": "Up to ₹6,64,000", "deadline": "March/October 2025" },
      { "name": "Boren Awards", "award": "Up to ₹20,75,000", "deadline": "February 2026" },
      { "name": "Erasmus Mundus", "award": "₹90,000 - ₹3,60,000/month", "deadline": "January 2026" },
      { "name": "DAAD Scholarships", "award": "₹84,000/month", "deadline": "Varies" },
      { "name": "Chevening Scholarships", "award": "Full funding", "deadline": "November 2025" },
      { "name": "Commonwealth Scholarships", "award": "Full funding", "deadline": "December 2025" },
      { "name": "Rotary Peace Fellowship", "award": "Full funding", "deadline": "May 2026" },
      { "name": "Critical Language Scholarship", "award": "Full funding", "deadline": "November 2025" }
    ],

    "STEM Fields": [
      { "name": "NSF Graduate Research Fellowship", "award": "₹30,71,000/year", "deadline": "October 2025" },
      { "name": "Google Lime Scholarship", "award": "₹8,30,000", "deadline": "December 2025" },
      { "name": "Microsoft Scholarship Program", "award": "Full tuition", "deadline": "February 2026" },
      { "name": "Society of Women Engineers Scholarship", "award": "₹83,000 - ₹12,45,000", "deadline": "February 2026" },
      { "name": "IEEE Scholarships", "award": "Varies", "deadline": "May 2026" },
      { "name": "SMART Scholarship Program", "award": "Full tuition + stipend", "deadline": "December 2025" },
      { "name": "Goldwater Scholarship", "award": "₹6,22,500/year", "deadline": "January 2026" },
      { "name": "Hertz Foundation Fellowship", "award": "₹2,07,50,000", "deadline": "October 2025" },
      { "name": "Amazon Future Engineer Scholarship", "award": "₹33,20,000", "deadline": "January 2026" },
      { "name": "National Science Foundation Scholarship", "award": "Varies", "deadline": "November 2025" }
    ],

    "Arts & Humanities": [
      { "name": "NEA Creative Writing Fellowships", "award": "₹20,75,000", "deadline": "March 2026" },
      { "name": "Scholastic Art & Writing Awards", "award": "₹41,500 - ₹8,30,000", "deadline": "September 2025" },
      { "name": "YoungArts Program", "award": "Up to ₹8,30,000", "deadline": "October 2025" },
      { "name": "Davidson Fellows (Arts)", "award": "₹8,30,000 - ₹41,50,000", "deadline": "February 2026" },
      { "name": "Jack Kent Cooke Young Artist Award", "award": "₹8,30,000", "deadline": "November 2025" },
      { "name": "National YoungArts Foundation", "award": "₹20,750 - ₹8,30,000", "deadline": "October 2025" },
      { "name": "Arts Recognition and Talent Search", "award": "₹41,500 - ₹8,30,000", "deadline": "October 2025" },
      { "name": "NFAA Awards", "award": "₹20,750 - ₹8,30,000", "deadline": "October 2025" },
      { "name": "Princess Grace Awards", "award": "₹6,22,500 - ₹24,90,000", "deadline": "March 2026" },
      { "name": "John F. Kennedy Center Awards", "award": "₹8,30,000", "deadline": "November 2025" }
    ],

    "Sports & Athletics": [
      { "name": "NCAA Division I Scholarships", "award": "Full tuition", "deadline": "Varies by school" },
      { "name": "NCAA Division II Scholarships", "award": "Partial to full tuition", "deadline": "Varies by school" },
      { "name": "NAIA Athletic Scholarships", "award": "Varies", "deadline": "Varies by school" },
      { "name": "National Merit Athletic Scholarships", "award": "₹2,07,500", "deadline": "October 2025" },
      { "name": "Wendy's High School Heisman", "award": "₹8,30,000", "deadline": "October 2025" },
      { "name": "US Olympic & Paralympic Scholarship", "award": "Varies", "deadline": "Rolling" },
      { "name": "AAU Sports Scholarships", "award": "Varies", "deadline": "Varies" },
      { "name": "Women's Sports Foundation Scholarships", "award": "₹83,000 - ₹4,15,000", "deadline": "May 2026" },
      { "name": "Jackie Robinson Foundation Scholarship", "award": "₹24,90,000", "deadline": "January 2026" },
      { "name": "Athletic Scholar Award", "award": "₹4,15,000 - ₹16,60,000", "deadline": "March 2026" }
    ]
  }

const categories = [
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Merit-Based",
    description: "Scholarships awarded based on academic excellence and achievements",
    count: "15,000+",
    color: "bg-blue-100 text-blue-700",
    gradient: "from-blue-500 to-indigo-500",
    examples: ["National Merit", "Dean's List", "Valedictorian Awards"],
    image: "https://images.unsplash.com/photo-1758270704587-43339a801396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvbGFyc2hpcCUyMHN1Y2Nlc3MlMjBhY2hpZXZlbWVudHxlbnwxfHx8fDE3NjIzNzAxNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Need-Based",
    description: "Financial aid for students with demonstrated financial need",
    count: "12,000+",
    color: "bg-green-100 text-green-700",
    gradient: "from-green-500 to-emerald-500",
    examples: ["Pell Grants", "State Grants", "Institutional Aid"],
    image: "https://images.unsplash.com/photo-1758270703928-6a8597669abc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29sbGVnZSUyMHN0dWRlbnRzJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzYyMzIwMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Study Abroad",
    description: "International exchange and study abroad opportunities",
    count: "8,500+",
    color: "bg-purple-100 text-purple-700",
    gradient: "from-purple-500 to-pink-500",
    examples: ["Fulbright", "Rhodes", "Erasmus Mundus"],
    image: "https://images.unsplash.com/photo-1724018305000-616597f21304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZHklMjBhYnJvYWQlMjB0cmF2ZWx8ZW58MXx8fHwxNzYyMzcwMTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "STEM Fields",
    description: "Science, Technology, Engineering, and Mathematics scholarships",
    count: "18,000+",
    color: "bg-orange-100 text-orange-700",
    gradient: "from-orange-500 to-red-500",
    examples: ["NSF Fellowship", "Google Scholarships", "IEEE Awards"],
    image: "https://images.unsplash.com/photo-1596495868845-63031cb496da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBzdHVkZW50fGVufDF8fHx8MTc2MjM3MDE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Paintbrush className="h-8 w-8" />,
    title: "Arts & Humanities",
    description: "Creative and liberal arts scholarship opportunities",
    count: "6,200+",
    color: "bg-pink-100 text-pink-700",
    gradient: "from-pink-500 to-rose-500",
    examples: ["NEA Grants", "Arts Council", "Creative Writing"],
    image: "https://images.unsplash.com/photo-1682616323245-bc4d6a3d4c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkZXNpZ24lMjBjcmVhdGl2ZSUyMHN0dWRlbnR8ZW58MXx8fHwxNzYyMzcwMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Sports & Athletics",
    description: "Athletic scholarships and sports-related funding",
    count: "5,800+",
    color: "bg-yellow-100 text-yellow-700",
    gradient: "from-yellow-500 to-orange-500",
    examples: ["NCAA Scholarships", "Olympic Training", "Club Sports"],
    image: "https://images.unsplash.com/photo-1591218214141-45545921d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnRzJTIwZ3JhZHVhdGlvbiUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2MjM3MDE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
]

export function ScholarshipCategories({ navigateTo }: ScholarshipCategoriesProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleExploreCategory = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setTimeout(() => setSelectedCategory(null), 300) // Reset after animation
  }

  return (
    <section id="scholarships" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Multiple Categories Available
          </Badge>
          <h2 className="text-4xl lg:text-5xl mb-6">
            Explore <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Scholarship Categories</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Browse scholarships by category to find opportunities that match your profile, 
            interests, and academic goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-2xl transition-all cursor-pointer group overflow-hidden h-full border-2 hover:border-blue-200">
                {/* Image with Gradient Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-70`}></div>
                  
                  {/* Floating Icon */}
                  <motion.div 
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className={`p-4 rounded-2xl ${category.color} backdrop-blur-sm shadow-lg`}>
                      {category.icon}
                    </div>
                  </motion.div>
                  
                  {/* Count Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 shadow-lg">
                      {category.count}
                    </Badge>
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-2xl drop-shadow-lg">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="space-y-4 pt-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm">Popular scholarships:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-indigo-50 group-hover:border-blue-300 transition-all"
                    onClick={() => handleExploreCategory(category.title)}
                  >
                    Explore Category
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Content */}
                <div className="text-left">
                  <MessageCircle className="h-12 w-12 mb-4" />
                  <h3 className="text-3xl mb-4">Need Personalized Guidance?</h3>
                  <p className="text-blue-100 mb-6 text-lg">
                    Chat with our AI-powered scholarship assistant to get instant answers about deadlines, requirements, and application strategies.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-blue-50">Instant scholarship recommendations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-blue-50">Application deadline reminders</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-blue-50">Document requirement guidance</span>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="text-lg px-8 shadow-lg"
                    onClick={() => navigateTo?.('chatbot')}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start Chatting Now
                  </Button>
                </div>

                {/* Right Side - Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <div className="text-4xl mb-2">65K+</div>
                    <div className="text-blue-100 text-sm">Available Scholarships</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-blue-100 text-sm">24/7 AI Assistance</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <div className="text-4xl mb-2">100%</div>
                    <div className="text-blue-100 text-sm">Free to Use</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <Sparkles className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-blue-100 text-sm">Instant Responses</div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Scholarship Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              {selectedCategory && (
                <>
                  {categories.find(c => c.title === selectedCategory)?.icon}
                  <span>{selectedCategory} Scholarships</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Explore {selectedCategory && scholarshipData[selectedCategory as keyof typeof scholarshipData]?.length} available scholarships in this category
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {selectedCategory && scholarshipData[selectedCategory as keyof typeof scholarshipData]?.map((scholarship, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all border-l-4 border-l-blue-500 hover:border-l-blue-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <h4 className="text-lg">{scholarship.name}</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Award Amount:</span>
                              <p className="text-green-600">{scholarship.award}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Deadline:</span>
                              <p className="text-blue-600">{scholarship.deadline}</p>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="shrink-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-gray-600">
              💡 Tip: Click on individual scholarships to learn more about requirements
            </p>
            <Button onClick={handleCloseDialog} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}