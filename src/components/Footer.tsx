import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { motion } from "motion/react"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageCircle,
  Send,
  Sparkles,
  Award,
  TrendingUp,
  Heart
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-gray-700 relative z-10">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Join Our Community
            </Badge>
            <h3 className="text-3xl mb-4">Never Miss a Scholarship Opportunity</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Get weekly updates on new scholarships, deadlines, and application tips 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email address" 
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 border-2 backdrop-blur-sm"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg whitespace-nowrap">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-400">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                50,000+ subscribers
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1 text-yellow-400" />
                Free resources
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl">ScholarBot</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering students worldwide with AI-powered scholarship discovery 
              and application guidance. Your success is our mission.
            </p>
            <div className="flex space-x-3">
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-blue-600/20 rounded-full">
                  <Facebook className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-blue-600/20 rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-pink-600/20 rounded-full">
                  <Instagram className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-blue-700/20 rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-6 text-lg bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#scholarships" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Find Scholarships
                </a>
              </li>
              <li>
                <a href="#guidance" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Application Guide
                </a>
              </li>
              <li>
                <a href="#success-stories" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Blog & Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Deadlines Calendar
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Essay Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Interview Prep
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Document Checklist
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Financial Aid Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  Study Abroad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 text-lg bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm">24/7 AI Chat Support</p>
                  <p className="text-gray-400 text-xs">Available anytime</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm">support@scholarbot.com</p>
                  <p className="text-gray-400 text-xs">Response within 24hrs</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-xs">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="bg-pink-500/20 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm">San Francisco, CA</p>
                  <p className="text-gray-400 text-xs">United States</p>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat Support
            </Button>
          </motion.div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400 flex items-center">
            © 2025 ScholarBot. All rights reserved. Made with 
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" />
            for students worldwide.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
