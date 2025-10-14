'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, User, Clock, Globe, Mail, Check } from 'lucide-react'

interface Section5TechnicalProps {
  onNext: () => void
  onPrevious: () => void
  formData: any
  updateFormData: (data: any) => void
}

export default function Section5Technical({ onNext, onPrevious, formData, updateFormData }: Section5TechnicalProps) {
  const [whoUpdates, setWhoUpdates] = useState<string>(formData.whoUpdates || '')
  const [updateFrequency, setUpdateFrequency] = useState<string>(formData.updateFrequency || '')
  const [domainStatus, setDomainStatus] = useState<string>(formData.domainStatus || '')
  const [emailNeeds, setEmailNeeds] = useState<string[]>(formData.emailNeeds || [])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const whoUpdatesOptions = [
    { id: 'me', label: 'I will update it myself', icon: User, description: 'You\'ll handle content updates' },
    { id: 'team', label: 'Someone on my team', icon: User, description: 'Team member will manage updates' },
    { id: 'developer', label: 'I want the developer to handle updates', icon: User, description: 'Developer maintains content' },
    { id: 'unsure', label: 'I\'m not sure yet', icon: User, description: 'We can discuss options later' }
  ]

  const frequencyOptions = [
    { id: 'daily', label: 'Daily', icon: Clock, description: 'News, blogs, frequent updates' },
    { id: 'weekly', label: 'Weekly', icon: Clock, description: 'Regular content changes' },
    { id: 'monthly', label: 'Monthly', icon: Clock, description: 'Occasional updates' },
    { id: 'quarterly', label: 'Quarterly', icon: Clock, description: 'Seasonal changes' },
    { id: 'rarely', label: 'Rarely', icon: Clock, description: 'Mostly static content' }
  ]

  const domainOptions = [
    { id: 'have', label: 'I already own a domain', icon: Globe, description: 'Domain is purchased and ready' },
    { id: 'need-help', label: 'I need help choosing/buying one', icon: Globe, description: 'Guidance on domain selection' },
    { id: 'have-idea', label: 'I have ideas but haven\'t bought it', icon: Globe, description: 'Know what I want, need to purchase' },
    { id: 'no-idea', label: 'I have no idea', icon: Globe, description: 'Complete guidance needed' }
  ]

  const emailOptions = [
    { id: 'professional', label: 'Professional email addresses', description: 'yourname@yourdomain.com' },
    { id: 'contact-form', label: 'Contact form on website', description: 'Visitors can reach you easily' },
    { id: 'newsletter', label: 'Email newsletter capability', description: 'Send updates to subscribers' },
    { id: 'automated', label: 'Automated email responses', description: 'Auto-reply to inquiries' },
    { id: 'none', label: 'None of these', description: 'No special email needs' }
  ]

  // Update parent form data whenever local state changes
  useEffect(() => {
    updateFormData({
      whoUpdates,
      updateFrequency,
      domainStatus,
      emailNeeds
    })
  }, [whoUpdates, updateFrequency, domainStatus, emailNeeds, updateFormData])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!whoUpdates) {
      newErrors.whoUpdates = 'Please select who will update the website'
    }
    if (!updateFrequency) {
      newErrors.updateFrequency = 'Please select how often content will change'
    }
    if (!domainStatus) {
      newErrors.domainStatus = 'Please select your domain status'
    }
    if (emailNeeds.length === 0) {
      newErrors.emailNeeds = 'Please select your email needs (or "None of these")'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const toggleEmailNeed = (needId: string) => {
    if (needId === 'none') {
      // If "none" is selected, clear all others
      setEmailNeeds(['none'])
    } else {
      // If any other option is selected, remove "none" if it exists
      const newNeeds = emailNeeds.filter(need => need !== 'none')
      
      if (newNeeds.includes(needId)) {
        setEmailNeeds(newNeeds.filter(need => need !== needId))
      } else {
        setEmailNeeds([...newNeeds, needId])
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Technical Details</h1>
        <p className="text-lg text-gray-600">Let's cover the technical aspects (simplified!)</p>
      </div>

      <div className="space-y-8">
        {/* Who Updates Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              Who will update the website?
            </CardTitle>
            <CardDescription>
              This helps us recommend the right content management approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whoUpdatesOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div
                    key={option.id}
                    onClick={() => setWhoUpdates(option.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      whoUpdates === option.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${
                        whoUpdates === option.id ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                      </div>
                      {whoUpdates === option.id && (
                        <Check className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {errors.whoUpdates && (
              <p className="text-red-500 text-sm mt-2">{errors.whoUpdates}</p>
            )}
          </CardContent>
        </Card>

        {/* Update Frequency Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              How often will content change?
            </CardTitle>
            <CardDescription>
              This affects the type of content management system we recommend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {frequencyOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div
                    key={option.id}
                    onClick={() => setUpdateFrequency(option.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      updateFrequency === option.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${
                      updateFrequency === option.id ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                    {updateFrequency === option.id && (
                      <Check className="h-4 w-4 text-purple-600 mx-auto mt-2" />
                    )}
                  </div>
                )
              })}
            </div>
            {errors.updateFrequency && (
              <p className="text-red-500 text-sm mt-2">{errors.updateFrequency}</p>
            )}
          </CardContent>
        </Card>

        {/* Domain Status Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              Domain ownership status
            </CardTitle>
            <CardDescription>
              Do you have a domain name (like yourcompany.com) for your website?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domainOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div
                    key={option.id}
                    onClick={() => setDomainStatus(option.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      domainStatus === option.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${
                        domainStatus === option.id ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                      </div>
                      {domainStatus === option.id && (
                        <Check className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {errors.domainStatus && (
              <p className="text-red-500 text-sm mt-2">{errors.domainStatus}</p>
            )}
          </CardContent>
        </Card>

        {/* Email Needs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              Professional email needs
            </CardTitle>
            <CardDescription>
              What email functionality do you need? (Select all that apply)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emailOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => toggleEmailNeed(option.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    emailNeeds.includes(option.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                    </div>
                    {emailNeeds.includes(option.id) && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.emailNeeds && (
              <p className="text-red-500 text-sm mt-2">{errors.emailNeeds}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
        >
          Next: Review & Submit
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
