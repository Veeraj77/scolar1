import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Calendar, Clock, ArrowRight, BookOpen, User } from "lucide-react"

const blogPosts = [
  {
    title: "10 Tips for Writing a Winning Scholarship Essay",
    excerpt: "Learn the essential strategies that make scholarship essays stand out from thousands of applications.",
    author: "Dr. Sarah Johnson",
    date: "January 15, 2025",
    readTime: "8 min read",
    category: "Writing Tips",
    image: "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGJvb2tzJTIwbGlicmFyeXxlbnwxfHx8fDE3NTgyNzI3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true
  },
  {
    title: "Scholarship Deadlines: How to Stay Organized",
    excerpt: "Master the art of deadline management with our proven organizational strategies and tools.",
    author: "Michael Chen",
    date: "January 12, 2025",
    readTime: "6 min read",
    category: "Organization",
    image: "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGJvb2tzJTIwbGlicmFyeXxlbnwxfHx8fDE3NTgyNzI3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false
  },
  {
    title: "International Students Guide to US Scholarships",
    excerpt: "Everything international students need to know about finding and applying for scholarships in the United States.",
    author: "Priya Patel",
    date: "January 10, 2025",
    readTime: "12 min read",
    category: "International",
    image: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGdyYWR1YXRpb24lMjBzY2hvbGFyc2hpcCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc1ODI3Mjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false
  },
  {
    title: "STEM Scholarships: Opportunities in Technology",
    excerpt: "Explore the best scholarship opportunities for students pursuing careers in science, technology, engineering, and mathematics.",
    author: "Alex Rivera",
    date: "January 8, 2025",
    readTime: "10 min read",
    category: "STEM",
    image: "https://images.unsplash.com/photo-1730794545099-14902983739d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXB0b3AlMjBjb21wdXRlciUyMGNoYXRib3QlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODI3Mjc1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false
  },
  {
    title: "Need-Based vs Merit-Based: Which to Apply For?",
    excerpt: "Understand the differences between scholarship types and develop a strategy that maximizes your funding potential.",
    author: "Jessica Williams",
    date: "January 5, 2025",
    readTime: "7 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGJvb2tzJTIwbGlicmFyeXxlbnwxfHx8fDE3NTgyNzI3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false
  },
  {
    title: "Scholarship Interview Success: What to Expect",
    excerpt: "Prepare for scholarship interviews with insider tips from successful applicants and interview panel members.",
    author: "Dr. Robert Kim",
    date: "January 3, 2025",
    readTime: "9 min read",
    category: "Interviews",
    image: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGdyYWR1YXRpb24lMjBzY2hvbGFyc2hpcCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc1ODI3Mjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false
  }
]

const categories = [
  { name: "All", count: 24 },
  { name: "Writing Tips", count: 8 },
  { name: "Strategy", count: 6 },
  { name: "International", count: 4 },
  { name: "STEM", count: 3 },
  { name: "Interviews", count: 3 }
]

export function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-3xl lg:text-4xl">
              Scholarship Tips & Insights
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest scholarship opportunities, application tips, 
            and success strategies from our experts and community.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              variant={index === 0 ? "default" : "outline"}
              className="cursor-pointer hover:bg-blue-100 px-4 py-2"
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <ImageWithFallback
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-3 bg-blue-100 text-blue-700">
                  ⭐ Featured
                </Badge>
                <CardTitle className="text-2xl mb-4 hover:text-blue-600 cursor-pointer">
                  {blogPosts[0].title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {blogPosts[0].date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                </div>
                <Button>
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(1).map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <CardTitle className="mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="text-lg px-8">
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}