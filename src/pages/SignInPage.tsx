import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Separator } from "../components/ui/separator"
import { Checkbox } from "../components/ui/checkbox"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { Badge } from "../components/ui/badge"
import { motion } from "motion/react"
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Chrome,
  Github,
  MessageCircle,
  GraduationCap,
  Shield,
  Sparkles,
  Award,
  TrendingUp
} from "lucide-react"

type Page = 'home' | 'signin' | 'chatbot'

interface SignInPageProps {
  navigateTo: (page: Page) => void
}

export function SignInPage({ navigateTo }: SignInPageProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    university: '',
    fieldOfStudy: '',
    agreeToTerms: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate successful login/signup
    navigateTo('chatbot')
  }

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    navigateTo('chatbot')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigateTo('home')}
            className="flex items-center hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ScholarBot</span>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                {isSignUp ? '🎓 Start Your Journey' : '👋 Welcome Back'}
              </Badge>
              <h1 className="text-4xl lg:text-5xl mb-6">
                {isSignUp ? 'Join ScholarBot' : 'Welcome Back'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {isSignUp 
                  ? 'Create your account to get personalized scholarship recommendations and AI-powered application guidance.'
                  : 'Sign in to access your personalized scholarship dashboard and continue your funding journey.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">50,000+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Scholarships</p>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">24/7</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI Support</p>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">100%</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure & Private</p>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1591218214141-45545921d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnRzJTIwZ3JhZHVhdGlvbiUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2MjM3MDE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students celebrating graduation"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-white text-lg">Join thousands of successful scholarship recipients!</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Sign In Form */}
          <motion.div 
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-2xl border-2 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  {isSignUp 
                    ? 'Start your scholarship journey today'
                    : 'Access your scholarship dashboard'
                  }
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-6">
                {/* Social Login */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 hover:bg-blue-50 hover:border-blue-300 transition-all" 
                    onClick={() => handleSocialLogin('google')}
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Continue with Google
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 hover:bg-gray-100 hover:border-gray-300 transition-all"
                    onClick={() => handleSocialLogin('github')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Continue with GitHub
                  </Button>
                </div>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                    or
                  </span>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                          className="border-2 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required
                          className="border-2 focus:border-blue-400"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        className="pl-10 border-2 focus:border-blue-400"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 border-2 focus:border-blue-400"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {isSignUp && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="university">University/Institution</Label>
                        <Input
                          id="university"
                          placeholder="e.g., Harvard University"
                          value={formData.university}
                          onChange={(e) => setFormData({...formData, university: e.target.value})}
                          className="border-2 focus:border-blue-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fieldOfStudy">Field of Study</Label>
                        <Input
                          id="fieldOfStudy"
                          placeholder="e.g., Computer Science"
                          value={formData.fieldOfStudy}
                          onChange={(e) => setFormData({...formData, fieldOfStudy: e.target.value})}
                          className="border-2 focus:border-blue-400"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: !!checked})}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the Terms of Service and Privacy Policy
                        </Label>
                      </div>
                    </>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" 
                    size="lg"
                  >
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                </form>

                {!isSignUp && (
                  <div className="text-center">
                    <Button variant="link" className="text-sm">
                      Forgot your password?
                    </Button>
                  </div>
                )}

                <Separator />

                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="p-0 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    {isSignUp ? 'Sign in here' : 'Create one for free'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-center text-gray-500 mt-6">
              <Shield className="inline h-3 w-3 mr-1" />
              By signing up, you agree that we keep your data private and secure. 
              We never share your personal information with third parties.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
