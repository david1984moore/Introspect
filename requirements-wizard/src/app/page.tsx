import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Smartphone, Clock, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Applicreations</h1>
          </div>
          <Badge variant="secondary" className="text-sm">
            Requirements Wizard
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Your Project Scope
            <span className="text-blue-600"> In Minutes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Answer a few simple questions and get a detailed project scope with tech recommendations, 
            timeline, and budget - all powered by AI.
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="w-5 h-5 text-green-600" />
              <span>Under 20 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>No technical knowledge needed</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Zap className="w-5 h-5 text-green-600" />
              <span>AI-powered recommendations</span>
            </div>
          </div>
        </div>

        {/* Project Type Selection */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            What type of project are you planning?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Website Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Website Project</CardTitle>
                <CardDescription className="text-base">
                  Business websites, portfolios, e-commerce, landing pages
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Content management system</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Mobile-responsive design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>SEO optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Contact forms & integrations</span>
                  </li>
                </ul>
                <Link href="/website" className="block">
                  <Button className="w-full" size="lg">
                    Start Website Questionnaire
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Application Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-300 relative">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Application Project</CardTitle>
                <CardDescription className="text-base">
                  Mobile apps, web apps, SaaS platforms, custom software
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>User authentication & profiles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Database & data management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>API integrations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Cross-platform compatibility</span>
                  </li>
                </ul>
                <Link href="/application" className="block">
                  <Button className="w-full" size="lg" variant="outline">
                    Start App Questionnaire
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Badge className="absolute top-4 right-4 bg-purple-100 text-purple-800">
                  Phase 2
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            How it works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Answer Questions</h4>
              <p className="text-gray-600 text-sm">
                Tell us about your business, goals, and preferences in 6 simple sections
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">AI Analysis</h4>
              <p className="text-gray-600 text-sm">
                Our AI analyzes your needs and creates detailed technical recommendations
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Get Your Scope</h4>
              <p className="text-gray-600 text-sm">
                Receive a detailed project scope with timeline, budget, and next steps
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2025 Applicreations. Powered by AI to help you plan better projects.</p>
        </div>
      </footer>
    </div>
  )
}