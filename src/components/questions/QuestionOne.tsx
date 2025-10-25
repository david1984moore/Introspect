'use client'

import React from 'react'
import { BusinessType } from '@/types/questionnaire'
import { useQuestionnaire } from '@/components/QuestionnaireProvider'

// Business type options with user-friendly labels
const BUSINESS_TYPES: { value: BusinessType; label: string; description: string }[] = [
  {
    value: 'restaurant',
    label: 'Restaurant / Food Service',
    description: 'Dining, catering, food delivery'
  },
  {
    value: 'retail',
    label: 'Retail / Store',
    description: 'Physical or online store'
  },
  {
    value: 'professional-services',
    label: 'Professional Services',
    description: 'Consulting, legal, accounting'
  },
  {
    value: 'healthcare',
    label: 'Healthcare / Medical',
    description: 'Clinics, practices, wellness'
  },
  {
    value: 'education',
    label: 'Education / Training',
    description: 'Schools, courses, tutoring'
  },
  {
    value: 'nonprofit',
    label: 'Nonprofit / Community',
    description: 'Charity, advocacy, social good'
  },
  {
    value: 'ecommerce',
    label: 'E-commerce / Online Business',
    description: 'Digital products, marketplace'
  },
  {
    value: 'saas',
    label: 'SaaS / Software',
    description: 'Software as a service, platforms'
  },
  {
    value: 'manufacturing',
    label: 'Manufacturing / Industrial',
    description: 'Production, distribution, supply chain'
  },
  {
    value: 'real-estate',
    label: 'Real Estate',
    description: 'Property management, brokerage'
  },
  {
    value: 'fitness',
    label: 'Fitness / Wellness',
    description: 'Gyms, studios, personal training'
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Something else'
  }
]

export function QuestionOne() {
  const { state, updateResponse, nextQuestion } = useQuestionnaire()
  const selectedType = state.responses.businessType

  const handleSelect = (type: BusinessType) => {
    updateResponse('businessType', type)
    
    // Auto-advance after selection (momentum building)
    setTimeout(() => {
      nextQuestion()
    }, 300)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Question Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          What type of business are you building this for?
        </h1>
        <p className="text-base text-gray-600">
          This helps us understand your needs and provide relevant recommendations.
        </p>
      </div>

      {/* Business Type Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {BUSINESS_TYPES.map((businessType) => (
          <button
            key={businessType.value}
            onClick={() => handleSelect(businessType.value)}
            className={`
              relative p-4 rounded-lg border-2 text-left transition-all
              hover:border-blue-500 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${
                selectedType === businessType.value
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white'
              }
            `}
            style={{ minHeight: '100px' }}
            aria-pressed={selectedType === businessType.value}
          >
            {/* Selection Indicator */}
            {selectedType === businessType.value && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {/* Content */}
            <div className="pr-8">
              <h3 className={`text-base font-semibold mb-1 ${
                selectedType === businessType.value ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {businessType.label}
              </h3>
              <p className={`text-xs ${
                selectedType === businessType.value ? 'text-blue-700' : 'text-gray-600'
              }`}>
                {businessType.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile-friendly touch targets confirmation */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Select your business type to continue
      </div>
    </div>
  )
}


