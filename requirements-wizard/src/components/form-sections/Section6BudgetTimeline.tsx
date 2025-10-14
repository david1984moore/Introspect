'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'

interface Section6Data {
  budgetRange: string
  launchTimeline: string
  urgencyReason: string
}

interface Section6BudgetTimelineProps {
  data: Section6Data
  onChange: (data: Section6Data) => void
  onNext: () => void
  onBack: () => void
}

export default function Section6BudgetTimeline({ data, onChange, onNext, onBack }: Section6BudgetTimelineProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Budget ranges with explanations
  const budgetOptions = [
    {
      value: 'basic',
      label: '$2,500 - $5,000',
      description: 'Basic website with essential pages and features',
      includes: ['5-8 pages', 'Mobile responsive', 'Contact forms', 'Basic SEO', '3 months support']
    },
    {
      value: 'standard',
      label: '$5,000 - $10,000',
      description: 'Professional website with enhanced functionality',
      includes: ['8-15 pages', 'Custom design', 'Content management', 'Advanced SEO', 'Analytics', '6 months support']
    },
    {
      value: 'premium',
      label: '$10,000 - $20,000',
      description: 'Advanced website with custom features and integrations',
      includes: ['15+ pages', 'E-commerce/booking', 'Third-party integrations', 'Advanced animations', '12 months support']
    },
    {
      value: 'enterprise',
      label: '$20,000+',
      description: 'Complex website with extensive custom development',
      includes: ['Unlimited pages', 'Custom applications', 'Advanced integrations', 'Performance optimization', 'Ongoing support']
    }
  ]

  // Timeline options
  const timelineOptions = [
    {
      value: 'asap',
      label: '2-4 weeks (Rush)',
      description: 'Expedited timeline with additional rush fees',
      icon: <AlertCircle className="w-4 h-4 text-red-500" />
    },
    {
      value: 'standard',
      label: '6-8 weeks (Standard)',
      description: 'Recommended timeline for quality development',
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />
    },
    {
      value: 'flexible',
      label: '10-12 weeks (Flexible)',
      description: 'Extended timeline with potential cost savings',
      icon: <Clock className="w-4 h-4 text-blue-500" />
    },
    {
      value: 'future',
      label: '3+ months (Future)',
      description: 'Planning for future launch with phased approach',
      icon: <Clock className="w-4 h-4 text-gray-500" />
    }
  ]

  // Urgency reasons
  const urgencyReasons = [
    'Business launch or relaunch',
    'Current website is broken/outdated',
    'Competitor pressure',
    'Seasonal business needs',
    'Marketing campaign launch',
    'Investor or client requirements',
    'Rebranding initiative',
    'No specific deadline - quality focused'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.budgetRange) {
      newErrors.budgetRange = 'Please select a budget range'
    }
    if (!data.launchTimeline) {
      newErrors.launchTimeline = 'Please select your preferred timeline'
    }
    if (!data.urgencyReason) {
      newErrors.urgencyReason = 'Please tell us why you need the website'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const handleBudgetChange = (budget: string) => {
    onChange({ ...data, budgetRange: budget })
    if (errors.budgetRange) {
      setErrors({ ...errors, budgetRange: '' })
    }
  }

  const handleTimelineChange = (timeline: string) => {
    onChange({ ...data, launchTimeline: timeline })
    if (errors.launchTimeline) {
      setErrors({ ...errors, launchTimeline: '' })
    }
  }

  const handleUrgencyChange = (reason: string) => {
    onChange({ ...data, urgencyReason: reason })
    if (errors.urgencyReason) {
      setErrors({ ...errors, urgencyReason: '' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <DollarSign className="w-8 h-8 text-purple-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Budget & Timeline</h1>
        </div>
        <p className="text-lg text-gray-600">
          Help us understand your budget and timeline expectations
        </p>
      </div>

      {/* Budget Range Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
            What's your budget range for this project?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {budgetOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  data.budgetRange === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleBudgetChange(option.value)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-lg">{option.label}</h3>
                      {data.budgetRange === option.value && (
                        <CheckCircle2 className="w-5 h-5 text-purple-600 ml-2" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{option.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {option.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.budgetRange && (
            <p className="text-red-500 text-sm mt-2">{errors.budgetRange}</p>
          )}
        </CardContent>
      </Card>

      {/* Timeline Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            When do you need your website launched?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {timelineOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  data.launchTimeline === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleTimelineChange(option.value)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {option.icon}
                    <div className="ml-3">
                      <h3 className="font-semibold">{option.label}</h3>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                  {data.launchTimeline === option.value && (
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
          {errors.launchTimeline && (
            <p className="text-red-500 text-sm mt-2">{errors.launchTimeline}</p>
          )}
        </CardContent>
      </Card>

      {/* Urgency Reason */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-purple-600" />
            What's driving your timeline?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {urgencyReasons.map((reason) => (
              <div
                key={reason}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  data.urgencyReason === reason
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleUrgencyChange(reason)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{reason}</span>
                  {data.urgencyReason === reason && (
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
          {errors.urgencyReason && (
            <p className="text-red-500 text-sm mt-2">{errors.urgencyReason}</p>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Technical Details
        </Button>
        <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
          Continue to Review
        </Button>
      </div>
    </div>
  )
}
