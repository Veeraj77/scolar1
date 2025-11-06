import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { motion } from "motion/react"
import { 
  Stethoscope, 
  Calculator, 
  Laptop, 
  Palette, 
  Scale, 
  Microscope,
  Building,
  GraduationCap,
  ArrowRight
} from "lucide-react"

type Page = 'home' | 'signin' | 'chatbot'

interface DomainCategoriesProps {
  navigateTo: (page: Page) => void
}

const domains = [
  {
    icon: <Stethoscope className="h-8 w-8" />,
    title: "Medical & Healthcare",
    description: "Scholarships for medical students, nurses, and healthcare professionals",
    count: "8,500+",
    color: "bg-red-100 text-red-700",
    gradient: "from-red-500 to-pink-500",
    popular: ["MD Programs", "Nursing", "Public Health", "Dentistry"],
    image: "https://images.unsplash.com/photo-1611764461465-09162da6465a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3R1ZGVudCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzYyMzcwMTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Technology & Engineering",
    description: "STEM scholarships for computer science, engineering, and tech fields",
    count: "12,000+",
    color: "bg-blue-100 text-blue-700",
    gradient: "from-blue-500 to-cyan-500",
    popular: ["Computer Science", "Software Engineering", "AI/ML", "Cybersecurity"],
    image: "https://images.unsplash.com/photo-1596495868845-63031cb496da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBzdHVkZW50fGVufDF8fHx8MTc2MjM3MDE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Calculator className="h-8 w-8" />,
    title: "Business & Finance",
    description: "Business school scholarships and finance-related opportunities",
    count: "6,200+",
    color: "bg-green-100 text-green-700",
    gradient: "from-green-500 to-emerald-500",
    popular: ["MBA Programs", "Finance", "Accounting", "Entrepreneurship"],
    image: "https://images.unsplash.com/photo-1554774853-7f03caeb4b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0dWRlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyMzcwMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Law & Legal Studies",
    description: "Law school scholarships and legal profession funding",
    count: "4,800+",
    color: "bg-purple-100 text-purple-700",
    gradient: "from-purple-500 to-violet-500",
    popular: ["JD Programs", "International Law", "Corporate Law", "Public Interest"],
    image: "https://images.unsplash.com/photo-1633158108216-f10cd3202d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBzdHVkZW50JTIwbGVnYWwlMjBib29rc3xlbnwxfHx8fDE3NjIzNzAxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Arts & Design",
    description: "Creative scholarships for artists, designers, and performers",
    count: "5,400+",
    color: "bg-pink-100 text-pink-700",
    gradient: "from-pink-500 to-rose-500",
    popular: ["Fine Arts", "Graphic Design", "Music", "Film Studies"],
    image: "https://images.unsplash.com/photo-1682616323245-bc4d6a3d4c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkZXNpZ24lMjBjcmVhdGl2ZSUyMHN0dWRlbnR8ZW58MXx8fHwxNzYyMzcwMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Microscope className="h-8 w-8" />,
    title: "Science & Research",
    description: "Research grants and scholarships for scientific studies",
    count: "9,600+",
    color: "bg-teal-100 text-teal-700",
    gradient: "from-teal-500 to-cyan-500",
    popular: ["Biology", "Chemistry", "Physics", "Environmental Science"],
    image: "https://images.unsplash.com/photo-1761106082516-61d4c6883f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2MjI4NDIwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Education & Teaching",
    description: "Scholarships for future educators and teaching professionals",
    count: "4,200+",
    color: "bg-orange-100 text-orange-700",
    gradient: "from-orange-500 to-amber-500",
    popular: ["Teacher Training", "Educational Leadership", "Special Education", "TESOL"],
    image: "https://images.unsplash.com/photo-1758270703928-6a8597669abc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29sbGVnZSUyMHN0dWRlbnRzJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzYyMzIwMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Social Sciences",
    description: "Scholarships for sociology, psychology, and social work",
    count: "3,800+",
    color: "bg-indigo-100 text-indigo-700",
    gradient: "from-indigo-500 to-blue-500",
    popular: ["Psychology", "Social Work", "Political Science", "International Relations"],
    image: "https://images.unsplash.com/photo-1725738704638-361eac814fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2MjI1NjUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
]

export function DomainCategories({ navigateTo }: DomainCategoriesProps) {

  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            🎯 Domain-Specific Scholarships
          </Badge>
          <h2 className="text-4xl lg:text-5xl mb-6">
            Find Scholarships by <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Academic Field</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore scholarships tailored to specific academic domains and professional fields. 
            Each category contains curated opportunities relevant to your area of study.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-2xl transition-all cursor-pointer group overflow-hidden h-full">
                {/* Image Header */}
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback 
                    src={domain.image}
                    alt={domain.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-60`}></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900">
                      {domain.count}
                    </Badge>
                  </div>
                  <div className={`absolute bottom-4 left-4 p-3 rounded-xl ${domain.color} backdrop-blur-sm`}>
                    {domain.icon}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {domain.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {domain.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs">Popular areas:</p>
                    <div className="flex flex-wrap gap-1">
                      {domain.popular.slice(0, 2).map((area, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all"
                    onClick={() => navigateTo('chatbot')}
                  >
                    Explore Field
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
