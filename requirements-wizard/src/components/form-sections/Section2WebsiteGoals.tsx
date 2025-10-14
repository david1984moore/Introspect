'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Target, ShoppingCart, Calendar, Phone, Mail, FileText, Users, Zap } from 'lucide-react'
import { useState } from 'react'

interface Section2Data {
  visitorGoals: string[]
  paymentMethods: string[]
  bookingType: string
  contactPreference: string
  additionalFeatures: string[]
}

interface Section2WebsiteGoalsProps {
  data: Section2Data
  onDataChange: (data: Section2Data) => void
  onNext: () => void
  onBack: () => void
}

const VISITOR_GOAL_OPTIONS = [
  {
    id: 'learn-about-business',
    label: 'Learn about your business',
    description: 'Company info, services, team, testimonials',
    icon: FileText
  },
  {
    id: 'contact-you',
    label: 'Contact you easily',
    description: 'Phone, email, contact forms, location',
    icon: Phone
  },
  {
    id: 'order-online',
    label: 'Order products/services online',
    description: 'E-commerce, shopping cart, checkout',
    icon: ShoppingCart
  },
  {
    id: 'book-appointment',
    label: 'Book appointments/consultations',
    description: 'Calendar booking, scheduling system',
    icon: Calendar
  },
  {
    id: 'join-community',
    label: 'Join your community',
    description: 'Newsletter signup, social media, events',
    icon: Users
  },
  {
    id: 'get-support',
    label: 'Get customer support',
    description: 'FAQ, help docs, support tickets',
    icon: Mail
  }
]

const PAYMENT_METHOD_OPTIONS = [
  'Credit/Debit Cards',
  'PayPal',
  'Stripe',
  'Bank Transfer',
  'Cash on Delivery',
  'Cryptocurrency',
  'Buy Now Pay Later (Klarna, Afterpay)'
]

const BOOKING_TYPE_OPTIONS = [
  'Simple calendar (pick date/time)',
  'Service-based booking (different services, durations)',
  'Resource booking (rooms, equipment)',
  'Class/event registration',
  'Consultation scheduling'
]

const CONTACT_PREFERENCE_OPTIONS = [
  'Contact form only',
  'Phone number visible',
  'Email address visible',
  'Live chat widget',
  'Social media links'
]

const ADDITIONAL_FEATURE_OPTIONS = [
  'Customer reviews/testimonials',
  'Photo gallery/portfolio',
  'Blog/news section',
  'Download resources (PDFs, guides)',
  'Member login area',
  'Multi-language support',
  'Search functionality',
  'Social media integration'
]

export default function Section2WebsiteGoals({ data, onDataChange, onNext, onBack }: Section2WebsiteGoalsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleGoalToggle = (goalId: string) => {
    const newGoals = data.visitorGoals.includes(goalId)
      ? data.visitorGoals.filter(id => id !== goalId)
      : [...data.visitorGoals, goalId]
    
    handleDataChange('visitorGoals', newGoals)
  }

  const handleMultiSelectToggle = (field: keyof Section2Data, value: string) => {
    const currentValues = data[field] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]
    
    handleDataChange(field, newValues)
  }

  const handleDataChange = (field: keyof Section2Data, value: string | string[]) => {
    const newData = { ...data, [field]: value }
    onDataChange(newData)
    
    // Clear error when user makes selection
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (data.visitorGoals.length === 0) {
      newErrors.visitorGoals = 'Please select at least one goal for your website visitors'
    }
    
    // Conditional validation
    if (data.visitorGoals.includes('order-online') && data.paymentMethods.length === 0) {
      newErrors.paymentMethods = 'Please select payment methods for online ordering'
    }
    
    if (data.visitorGoals.includes('book-appointment') && !data.bookingType) {
      newErrors.bookingType = 'Please select what type of booking system you need'
    }
    
    if (data.visitorGoals.includes('contact-you') && !data.contactPreference) {
      newErrors.contactPreference = 'Please select how visitors should contact you'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const showPaymentOptions = data.visitorGoals.includes('order-online')
  const showBookingOptions = data.visitorGoals.includes('book-appointment')
  const showContactOptions = data.visitorGoals.includes('contact-you')

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Goals</h2>
        <p className="text-gray-600">What should visitors be able to do on your website?</p>
      </div>

      {/* Main Goals Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Visitor Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VISITOR_GOAL_OPTIONS.map((goal) => {
              const Icon = goal.icon
              const isSelected = data.visitorGoals.includes(goal.id)
              
              return (
                <div
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-1 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                    <div>
                      <h3 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {goal.label}
                      </h3>
                      <p className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {errors.visitorGoals && (
            <p className="text-red-600 text-sm">{errors.visitorGoals}</p>
          )}
        </CardContent>
      </Card>

      {/* Conditional: Payment Methods */}
      {showPaymentOptions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Which payment methods do you want to accept?</p>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHOD_OPTIONS.map((method) => (
                <Badge
                  key={method}
                  variant={data.paymentMethods.includes(method) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleMultiSelectToggle('paymentMethods', method)}
                >
                  {method}
                </Badge>
              ))}
            </div>
            {errors.paymentMethods && (
              <p className="text-red-600 text-sm mt-2">{errors.paymentMethods}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Conditional: Booking Type */}
      {showBookingOptions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Booking System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">What type of booking system do you need?</p>
            <div className="space-y-2">
              {BOOKING_TYPE_OPTIONS.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="bookingType"
                    value={type}
                    checked={data.bookingType === type}
                    onChange={(e) => handleDataChange('bookingType', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
            </div>
            {errors.bookingType && (
              <p className="text-red-600 text-sm mt-2">{errors.bookingType}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Conditional: Contact Preference */}
      {showContactOptions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">How should visitors contact you?</p>
            <div className="space-y-2">
              {CONTACT_PREFERENCE_OPTIONS.map((preference) => (
                <label key={preference} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="contactPreference"
                    value={preference}
                    checked={data.contactPreference === preference}
                    onChange={(e) => handleDataChange('contactPreference', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700">{preference}</span>
                </label>
              ))}
            </div>
            {errors.contactPreference && (
              <p className="text-red-600 text-sm mt-2">{errors.contactPreference}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Additional Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Additional Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Any other features you'd like? (Optional)</p>
          <div className="flex flex-wrap gap-2">
            {ADDITIONAL_FEATURE_OPTIONS.map((feature) => (
              <Badge
                key={feature}
                variant={data.additionalFeatures.includes(feature) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleMultiSelectToggle('additionalFeatures', feature)}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Next Section
        </Button>
      </div>
    </div>
  )
}
