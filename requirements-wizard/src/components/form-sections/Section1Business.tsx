'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, Users, Target, Lightbulb } from 'lucide-react'
import { useState } from 'react'

interface Section1Data {
  businessName: string
  businessDescription: string
  targetCustomers: string[]
  differentiators: string
}

interface Section1BusinessProps {
  data: Section1Data
  onDataChange: (data: Section1Data) => void
  onNext: () => void
  onBack: () => void
}

const TARGET_CUSTOMER_OPTIONS = [
  'Small business owners',
  'Homeowners',
  'Young professionals (25-35)',
  'Families with children',
  'Seniors (55+)',
  'Students',
  'Local community',
  'Online shoppers',
  'B2B companies',
  'Nonprofit organizations',
  'Healthcare patients',
  'Real estate clients'
]

export default function Section1Business({ data, onDataChange, onNext, onBack }: Section1BusinessProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof Section1Data, value: string | string[]) => {
    const newData = { ...data, [field]: value }
    onDataChange(newData)
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleTargetCustomer = (customer: string) => {
    const currentCustomers = data.targetCustomers || []
    const newCustomers = currentCustomers.includes(customer)
      ? currentCustomers.filter(c => c !== customer)
      : [...currentCustomers, customer]
    
    handleInputChange('targetCustomers', newCustomers)
  }

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.businessName?.trim()) {
      newErrors.businessName = 'Business name is required'
    }
    
    if (!data.businessDescription?.trim()) {
      newErrors.businessDescription = 'Business description is required'
    }
    
    if (!data.targetCustomers?.length) {
      newErrors.targetCustomers = 'Please select at least one target customer group'
    }
    
    if (!data.differentiators?.trim()) {
      newErrors.differentiators = 'Please tell us what makes your business different'
    }

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      {/* Business Name */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>What's your business name?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            value={data.businessName || ''}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Enter your business name"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.businessName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-2">{errors.businessName}</p>
          )}
        </CardContent>
      </Card>

      {/* Business Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <span>Describe your business in one sentence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={data.businessDescription || ''}
            onChange={(e) => handleInputChange('businessDescription', e.target.value)}
            placeholder="Example: We help small businesses create professional websites that attract more customers"
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.businessDescription ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.businessDescription && (
            <p className="text-red-500 text-sm mt-2">{errors.businessDescription}</p>
          )}
          <p className="text-sm text-gray-600 mt-2">
            Keep it simple - what do you do and who do you help?
          </p>
        </CardContent>
      </Card>

      {/* Target Customers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Who are your target customers?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Select all that apply (you can choose multiple):</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TARGET_CUSTOMER_OPTIONS.map((customer) => (
              <button
                key={customer}
                onClick={() => toggleTargetCustomer(customer)}
                className={`p-3 text-left border rounded-lg transition-colors ${
                  data.targetCustomers?.includes(customer)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-sm font-medium">{customer}</div>
              </button>
            ))}
          </div>
          {errors.targetCustomers && (
            <p className="text-red-500 text-sm mt-2">{errors.targetCustomers}</p>
          )}
          {data.targetCustomers?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected:</p>
              <div className="flex flex-wrap gap-2">
                {data.targetCustomers.map((customer) => (
                  <Badge key={customer} variant="secondary">
                    {customer}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Differentiators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-orange-600" />
            <span>What makes your business different?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={data.differentiators || ''}
            onChange={(e) => handleInputChange('differentiators', e.target.value)}
            placeholder="Example: 20+ years experience, family-owned, fastest service in town, eco-friendly materials, 24/7 support..."
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.differentiators ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.differentiators && (
            <p className="text-red-500 text-sm mt-2">{errors.differentiators}</p>
          )}
          <p className="text-sm text-gray-600 mt-2">
            Think about your experience, values, location, speed, quality, or unique approach
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Overview
        </Button>
        <Button onClick={validateAndProceed}>
          Continue to Website Goals
        </Button>
      </div>
    </div>
  )
}
