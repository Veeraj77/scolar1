import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Download,
  ArrowRight,
  BookOpen,
  Users,
  Calendar
} from "lucide-react"

const guidanceTopics = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Statement of Purpose (SOP)",
    description: "Write compelling personal statements that stand out",
    tips: ["Tell your unique story", "Show passion for your field", "Connect past experiences to future goals"],
    template: true
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Letters of Recommendation",
    description: "Guide your recommenders to write strong letters",
    tips: ["Choose the right recommenders", "Provide clear guidelines", "Follow up professionally"],
    template: true
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Academic Transcripts",
    description: "Present your academic record effectively",
    tips: ["Highlight relevant coursework", "Explain any grade inconsistencies", "Show upward trends"],
    template: false
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Interview Preparation",
    description: "Ace your scholarship interviews with confidence",
    tips: ["Practice common questions", "Research the organization", "Prepare thoughtful questions"],
    template: false
  }
]

const applicationSteps = [
  {
    step: 1,
    title: "Research & Discovery",
    description: "Find scholarships that match your profile",
    time: "1-2 weeks",
    status: "active"
  },
  {
    step: 2,
    title: "Document Preparation",
    description: "Gather all required documents and essays",
    time: "2-3 weeks",
    status: "pending"
  },
  {
    step: 3,
    title: "Application Submission",
    description: "Submit applications before deadlines",
    time: "1 week",
    status: "pending"
  },
  {
    step: 4,
    title: "Follow-up & Interviews",
    description: "Complete any additional requirements",
    time: "2-4 weeks",
    status: "pending"
  }
]

export function GuidanceSection() {
  return (
    <section id="guidance" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700">
            📚 Application Guidance
          </Badge>
          <h2 className="text-3xl lg:text-4xl mb-4">
            Step-by-Step Application Help
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get comprehensive guidance on every aspect of the scholarship application process, 
            from writing essays to preparing for interviews.
          </p>
        </div>

        {/* Application Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl mb-8 text-center">Your Application Journey</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {applicationSteps.map((step, index) => (
              <Card key={index} className={`${step.status === 'active' ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    step.status === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.step}
                  </div>
                  <h4 className="mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {step.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.time}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guidance Topics */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {guidanceTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                    {topic.icon}
                  </div>
                  <CardTitle>{topic.title}</CardTitle>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {topic.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="mb-2">Key Tips:</h5>
                  <ul className="space-y-1">
                    {topic.tips.map((tip, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask AI
                  </Button>
                  {topic.template && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Template
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Common Mistakes Section */}
        <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">
              ⚠️ Common Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="mb-3">Application Errors:</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Missing deadlines or submitting late</li>
                  <li>• Generic essays not tailored to the scholarship</li>
                  <li>• Incomplete application packages</li>
                  <li>• Poor proofreading and grammar mistakes</li>
                </ul>
              </div>
              <div>
                <h5 className="mb-3">Strategy Mistakes:</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Applying to scholarships you don't qualify for</li>
                  <li>• Not following application instructions exactly</li>
                  <li>• Waiting until the last minute to start</li>
                  <li>• Not researching the organization's values</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Get personalized guidance from our scholarship experts
          </p>
        </div>
      </div>
    </section>
  )
}