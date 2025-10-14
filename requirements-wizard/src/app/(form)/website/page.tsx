'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Clock, Users, FileText, Palette, Settings, DollarSign } from 'lucide-react'
import { useState, useCallback } from 'react'
import Section1Business from '@/components/form-sections/Section1Business'
import Section2WebsiteGoals from '@/components/form-sections/Section2WebsiteGoals'
import Section3PagesContent from '@/components/form-sections/Section3PagesContent'
import Section4LookFeel from '@/components/form-sections/Section4LookFeel'
import Section5Technical from '@/components/form-sections/Section5Technical'
import Section6BudgetTimeline from '@/components/form-sections/Section6BudgetTimeline'

interface FormData {
  section1: {
    businessName: string
    businessDescription: string
    targetCustomers: string[]
    differentiators: string
  }
  section2: {
    visitorGoals: string[]
    paymentMethods: string[]
    bookingType: string
    contactPreference: string
    additionalFeatures: string[]
  }
  section3: {
    selectedPages: string[]
    contentStatus: Record<string, string>
  }
  section4: {
    exampleWebsites: string[]
    designLikes: string[]
    emotionalTone: string[]
    logoStatus: string
    colorPreferences: string[]
  }
  section5: {
    whoUpdates: string
    updateFrequency: string
    domainStatus: string
    emailNeeds: string[]
  }
  section6: {
    budgetRange: string
    launchTimeline: string
    urgencyReason: string
  }
}

export default function WebsiteQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = overview, 1-6 = sections
  const [formData, setFormData] = useState<FormData>({
    section1: {
      businessName: '',
      businessDescription: '',
      targetCustomers: [],
      differentiators: ''
    },
    section2: {
      visitorGoals: [],
      paymentMethods: [],
      bookingType: '',
      contactPreference: '',
      additionalFeatures: []
    },
    section3: {
      selectedPages: [],
      contentStatus: {}
    },
    section4: {
      exampleWebsites: [],
      designLikes: [],
      emotionalTone: [],
      logoStatus: '',
      colorPreferences: []
    },
    section5: {
      whoUpdates: '',
      updateFrequency: '',
      domainStatus: '',
      emailNeeds: []
    },
    section6: {
      budgetRange: '',
      launchTimeline: '',
      urgencyReason: ''
    }
  })

  const handleSection1Change = useCallback((data: FormData['section1']) => {
    setFormData(prev => ({ ...prev, section1: data }))
  }, [])

  const handleSection2Change = useCallback((data: FormData['section2']) => {
    setFormData(prev => ({ ...prev, section2: data }))
  }, [])

  const handleSection3Change = useCallback((data: FormData['section3']) => {
    setFormData(prev => ({ ...prev, section3: data }))
  }, [])

  const handleSection4Change = useCallback((data: FormData['section4']) => {
    setFormData(prev => ({ ...prev, section4: data }))
  }, [])

  const handleSection5Change = useCallback((data: FormData['section5']) => {
    setFormData(prev => ({ ...prev, section5: data }))
  }, [])

  const handleSection6Change = useCallback((data: FormData['section6']) => {
    setFormData(prev => ({ ...prev, section6: data }))
  }, [])

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleStartQuestionnaire = () => {
    setCurrentStep(1)
  }

  // Calculate progress
  const getProgress = () => {
    if (currentStep === 0) return 0
    return (currentStep / 6) * 100
  }

  // Get current step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Overview'
      case 1: return 'Your Business'
      case 2: return 'Website Goals'
      case 3: return 'Pages & Content'
      case 4: return 'Look & Feel'
      case 5: return 'Technical Details'
      case 6: return 'Budget & Timeline'
      default: return 'Unknown'
    }
  }

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderOverview()
      case 1:
        return (
          <Section1Business
            data={formData.section1}
            onDataChange={handleSection1Change}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <Section2WebsiteGoals
            data={formData.section2}
            onDataChange={handleSection2Change}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <Section3PagesContent
            data={formData.section3}
            onUpdate={handleSection3Change}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <Section4LookFeel
            data={formData.section4}
            onDataChange={handleSection4Change}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <Section5Technical
            formData={formData.section5}
            updateFormData={handleSection5Change}
            onNext={handleNext}
            onPrevious={handleBack}
          />
        )
      case 6:
        return (
          <Section6BudgetTimeline
            data={formData.section6}
            onChange={handleSection6Change}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      default:
        return (
          <div className="text-center py-12">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Section {currentStep}: {getStepTitle()}</h2>
                <p className="text-gray-600 mb-6">This section is still being built.</p>
                <Button onClick={handleBack}>Go Back</Button>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  const renderOverview = () => (
    <>
      {/* Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>What to Expect</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            We'll ask you about your business, website goals, content needs, design preferences, 
            technical requirements, and budget. Most questions use checkboxes and dropdowns - minimal typing required.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="font-medium">Your Business</div>
              <div className="text-sm text-gray-600">3 minutes</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium">Goals & Content</div>
              <div className="text-sm text-gray-600">8 minutes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Palette className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="font-medium">Design & Tech</div>
              <div className="text-sm text-gray-600">7 minutes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">The 6 Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <div className="font-medium">Your Business</div>
                <div className="text-sm text-gray-600">Name, description, target customers</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div>
                <div className="font-medium">Website Goals</div>
                <div className="text-sm text-gray-600">What visitors should be able to do</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <div>
                <div className="font-medium">Pages & Content</div>
                <div className="text-sm text-gray-600">Which pages you need, content status</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">4</span>
              </div>
              <div>
                <div className="font-medium">Look & Feel</div>
                <div className="text-sm text-gray-600">Design style, colors, inspiration</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">5</span>
              </div>
              <div>
                <div className="font-medium">Technical Details</div>
                <div className="text-sm text-gray-600">Updates, domain, email needs</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">6</span>
              </div>
              <div>
                <div className="font-medium">Budget & Timeline</div>
                <div className="text-sm text-gray-600">Investment range, launch goals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What You'll Get</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Settings className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <div className="font-medium">Tech Stack Recommendation</div>
                <div className="text-sm text-gray-600">
                  AI-powered analysis of the best technologies for your specific needs
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <div className="font-medium">Realistic Timeline</div>
                <div className="text-sm text-gray-600">
                  Week-by-week project plan with milestones and deliverables
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <div className="font-medium">Budget Breakdown</div>
                <div className="text-sm text-gray-600">
                  Transparent pricing with one-time and ongoing costs
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <div className="font-medium">Complete Project Scope</div>
                <div className="text-sm text-gray-600">
                  Detailed document with features, requirements, and success criteria
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <Button size="lg" className="px-8" onClick={handleStartQuestionnaire}>
          Start Questionnaire
        </Button>
        <p className="text-sm text-gray-600 mt-2">
          You can save your progress and return anytime
        </p>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="text-right">
            <div className="text-sm text-gray-600">Website Questionnaire</div>
            <div className="text-xs text-gray-500">Est. 15-20 minutes</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentStep === 0 ? 'Website Requirements' : `Section ${currentStep}: ${getStepTitle()}`}
            </h1>
            <span className="text-sm text-gray-600">
              {currentStep === 0 ? 'Overview' : `Step ${currentStep} of 6`}
            </span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Current Step Content */}
        {renderCurrentStep()}
      </main>
    </div>
  )
}