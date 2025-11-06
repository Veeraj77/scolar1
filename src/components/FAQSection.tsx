import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "./ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { MessageCircle, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How does the AI chatbot help with scholarship applications?",
    answer: "Our AI chatbot provides personalized scholarship recommendations based on your academic profile, interests, and goals. It helps you find relevant opportunities, understand application requirements, get writing tips for essays, track deadlines, and provides step-by-step guidance throughout the application process."
  },
  {
    question: "Is the scholarship search and guidance service free?",
    answer: "Yes! Our basic scholarship search, AI chatbot assistance, and application guidance are completely free. We also offer premium features like personalized consultations and advanced application tracking for users who need additional support."
  },
  {
    question: "Can I apply for multiple scholarships at the same time?",
    answer: "Absolutely! In fact, we recommend applying to multiple scholarships to increase your chances of success. Our platform helps you organize multiple applications, track deadlines, and manage required documents efficiently. Most successful students apply to 10-15 scholarships."
  },
  {
    question: "What documents do I typically need for scholarship applications?",
    answer: "Common documents include: academic transcripts, letters of recommendation (2-3), personal statement or essay, resume/CV, financial documents (for need-based scholarships), test scores (SAT, ACT, GRE, etc.), and proof of enrollment or acceptance. Our chatbot provides a personalized checklist based on your target scholarships."
  },
  {
    question: "How far in advance should I start applying for scholarships?",
    answer: "Start at least 6-12 months before you need the funding. Many scholarships have deadlines 6-8 months before the academic year begins. Early preparation allows time for gathering documents, writing strong essays, and securing quality recommendation letters."
  },
  {
    question: "Can international students use this platform?",
    answer: "Yes! We have scholarships for both domestic and international students. Our database includes opportunities for studying in the US, UK, Canada, Australia, Europe, and other countries. The AI can filter results based on your citizenship and target study destination."
  },
  {
    question: "What's the difference between merit-based and need-based scholarships?",
    answer: "Merit-based scholarships are awarded based on academic achievement, leadership, talents, or other accomplishments. Need-based scholarships consider your financial situation and family income. Many scholarships combine both criteria. Our AI helps identify which type you're most likely to qualify for."
  },
  {
    question: "How can I increase my chances of winning a scholarship?",
    answer: "Key strategies include: applying to scholarships that match your profile, writing compelling and personalized essays, getting strong letters of recommendation, meeting all requirements exactly, applying early, and applying to multiple opportunities. Our guidance section provides detailed tips for each area."
  },
  {
    question: "What happens after I submit a scholarship application?",
    answer: "After submission, applications typically go through a review process that can take 1-6 months. Some scholarships require interviews or additional materials. Our platform helps you track application status and prepares you for any follow-up requirements like interviews."
  },
  {
    question: "Can the AI help me write my scholarship essays?",
    answer: "The AI provides guidance, tips, and feedback on your essays, but you must write them yourself. We help with brainstorming, structure, key points to include, and review strategies. We also provide templates and examples to guide your writing process."
  }
]

export function FAQSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-3xl lg:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get answers to common questions about scholarships, applications, and how our AI assistance works.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Card className="bg-blue-50 dark:bg-blue-900/20 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <MessageCircle className="h-6 w-6 mr-2" />
                Still Have Questions?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our AI chatbot is available 24/7 to answer your specific questions about 
                scholarships, applications, and deadlines.
              </p>
              <Button size="lg" className="text-lg px-8">
                Ask the Chatbot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}