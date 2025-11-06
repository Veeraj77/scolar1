import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Quote, Star } from "lucide-react"

const successStories = [
  {
    name: "Sarah Chen",
    field: "Computer Science",
    university: "MIT",
    scholarship: "Google Scholarship",
    amount: "$10,000",
    quote: "ScholarBot helped me find and apply to 5 different tech scholarships. The AI guidance made the application process so much clearer!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b9e75825?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    location: "California, USA"
  },
  {
    name: "Marcus Johnson",
    field: "Mechanical Engineering",
    university: "Stanford University",
    scholarship: "NSF Graduate Fellowship",
    amount: "$37,000/year",
    quote: "The chatbot's deadline reminders saved me from missing applications. I secured full funding for my PhD!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    location: "Texas, USA"
  },
  {
    name: "Priya Patel",
    field: "Medicine",
    university: "Oxford University",
    scholarship: "Rhodes Scholarship",
    amount: "Full Tuition + Stipend",
    quote: "I was overwhelmed by scholarship options until I found ScholarBot. It personalized everything for my medical school goals.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    location: "Mumbai, India"
  },
  {
    name: "Alex Rivera",
    field: "Environmental Science",
    university: "UC Berkeley",
    scholarship: "Environmental Leadership Scholarship",
    amount: "$15,000",
    quote: "The AI helped me craft a compelling personal statement that highlighted my environmental advocacy work perfectly.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    location: "Mexico City, Mexico"
  }
]

export function SuccessStories() {
  return (
    <section id="success-stories" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700">
            🎉 Success Stories
          </Badge>
          <h2 className="text-3xl lg:text-4xl mb-4">
            Real Students, Real Results
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of students who have successfully secured scholarships with our AI guidance. 
            Here are some of their inspiring stories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4>{story.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{story.field}</p>
                    <p className="text-sm text-gray-500">{story.university}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-gray-400 flex-shrink-0" />
                </div>

                <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{story.quote}"
                </blockquote>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {story.scholarship}
                    </Badge>
                    <p className="text-sm text-green-600 mt-1">{story.amount}</p>
                  </div>
                  <p className="text-xs text-gray-500">{story.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg inline-block">
            <h3 className="text-2xl mb-2">Ready to Join Them?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start your scholarship journey today with personalized AI guidance
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl text-blue-600">10,000+</div>
                <div className="text-gray-600">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-green-600">$250M+</div>
                <div className="text-gray-600">Scholarships Secured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-purple-600">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}