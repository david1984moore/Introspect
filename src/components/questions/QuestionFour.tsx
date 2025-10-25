'use client'

import React, { useState, useEffect } from 'react'
import { BusinessType } from '@/types/questionnaire'
import { useQuestionnaire } from '@/components/QuestionnaireProvider'

// Adaptive question text based on business type
const ADAPTIVE_QUESTIONS: Record<BusinessType, { title: string; subtitle: string; placeholder: string; examples: string[] }> = {
  'restaurant': {
    title: 'What problem does your app solve for your restaurant?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Customers wait too long to order and pay, reducing table turnover and creating frustration during busy hours...',
    examples: [
      'Long wait times for ordering or payment',
      'Difficulty managing reservations and waitlists',
      'Poor communication between kitchen and servers',
      'Limited visibility into customer preferences'
    ]
  },
  'retail': {
    title: 'What problem does your app solve for your retail business?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Customers can\'t easily find product availability across our multiple locations, leading to lost sales...',
    examples: [
      'Customers can\'t check inventory before visiting',
      'Long checkout lines drive customers away',
      'Difficulty tracking customer purchase history',
      'Limited ability to notify customers about new arrivals'
    ]
  },
  'professional-services': {
    title: 'What problem does your app solve for your clients?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Clients struggle to schedule appointments and track project progress, leading to miscommunication and delays...',
    examples: [
      'Difficult appointment scheduling and rescheduling',
      'Poor visibility into project status and deliverables',
      'Time-consuming manual invoicing and payment collection',
      'Inefficient document sharing and collaboration'
    ]
  },
  'healthcare': {
    title: 'What problem does your app solve for your patients?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Patients have difficulty scheduling appointments and accessing their medical records, creating frustration and delays in care...',
    examples: [
      'Complicated appointment booking process',
      'Patients can\'t easily access medical records',
      'Long wait times and poor communication',
      'Difficulty managing prescriptions and refills'
    ]
  },
  'education': {
    title: 'What problem does your app solve for your students?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Students lack personalized learning paths and real-time feedback, making it hard to stay motivated and track progress...',
    examples: [
      'Difficulty tracking learning progress and goals',
      'Limited access to learning materials outside class',
      'Lack of personalized learning recommendations',
      'Poor communication between students and instructors'
    ]
  },
  'nonprofit': {
    title: 'What problem does your app solve for your community?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Community members don\'t know about available services and resources, preventing them from getting the help they need...',
    examples: [
      'Difficulty connecting people with available services',
      'Limited visibility into program impact and outcomes',
      'Complicated volunteer coordination and scheduling',
      'Inefficient donation and fundraising processes'
    ]
  },
  'ecommerce': {
    title: 'What problem does your app solve for your customers?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Customers can\'t easily discover products that match their specific needs and preferences, leading to decision fatigue...',
    examples: [
      'Difficulty finding the right products',
      'Complicated checkout and payment process',
      'Lack of personalized product recommendations',
      'Poor post-purchase support and tracking'
    ]
  },
  'saas': {
    title: 'What problem does your software solve for users?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Teams waste hours on manual data entry and spreadsheet management, leading to errors and lost productivity...',
    examples: [
      'Time-consuming manual processes and data entry',
      'Lack of real-time collaboration and visibility',
      'Difficulty integrating with existing tools',
      'Poor reporting and analytics capabilities'
    ]
  },
  'manufacturing': {
    title: 'What problem does your app solve for your operations?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: We lack real-time visibility into production status and inventory levels, causing delays and inefficiencies...',
    examples: [
      'Limited visibility into production status',
      'Inefficient inventory and supply chain management',
      'Difficulty tracking quality control and compliance',
      'Poor communication between production and sales'
    ]
  },
  'real-estate': {
    title: 'What problem does your app solve for your clients?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Clients struggle to schedule property viewings and track their search progress, leading to missed opportunities...',
    examples: [
      'Difficulty scheduling property viewings',
      'Limited access to property information and updates',
      'Complicated document signing and payment processes',
      'Poor communication between agents and clients'
    ]
  },
  'fitness': {
    title: 'What problem does your app solve for your members?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Members struggle to book classes and track their fitness progress, reducing engagement and retention...',
    examples: [
      'Difficulty booking and managing class reservations',
      'Lack of personalized workout recommendations',
      'Poor visibility into fitness progress and goals',
      'Limited community engagement and motivation'
    ]
  },
  'other': {
    title: 'What problem does your app solve?',
    subtitle: 'Understanding the core problem helps us recommend the right features.',
    placeholder: 'Example: Describe the main challenge or pain point your app addresses for your users or customers...',
    examples: [
      'What frustration or inefficiency does it eliminate?',
      'What task does it make easier or faster?',
      'What information does it make more accessible?',
      'What process does it streamline or automate?'
    ]
  }
}

export function QuestionFour() {
  const { state, updateResponse } = useQuestionnaire()
  const businessType = state.responses.businessType
  const savedProblem = state.responses.problemStatement || ''
  
  const [problemStatement, setProblemStatement] = useState(savedProblem)
  const [charCount, setCharCount] = useState(savedProblem.length)
  
  // Get adaptive content based on business type
  const adaptiveContent = businessType 
    ? ADAPTIVE_QUESTIONS[businessType]
    : ADAPTIVE_QUESTIONS['other']

  // Update character count
  useEffect(() => {
    setCharCount(problemStatement.length)
  }, [problemStatement])

  // Debounced save to state (auto-save as user types)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateResponse('problemStatement', problemStatement)
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [problemStatement, updateResponse])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblemStatement(e.target.value)
  }

  const minLength = 100
  const maxLength = 500
  const isValid = charCount >= minLength && charCount <= maxLength

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Question Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {adaptiveContent.title}
        </h1>
        <p className="text-base text-gray-600 mb-4">
          {adaptiveContent.subtitle}
        </p>
        
        {/* Helper prompts */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-900 mb-2">Common problems we help solve:</p>
          <ul className="text-xs text-blue-800 space-y-1">
            {adaptiveContent.examples.map((example, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Textarea Input */}
      <div className="mb-4">
        <textarea
          value={problemStatement}
          onChange={handleChange}
          placeholder={adaptiveContent.placeholder}
          className={`
            w-full px-3 py-2 rounded-lg border-2 text-sm text-gray-900 
            placeholder-gray-400 resize-none transition-all
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${isValid ? 'border-gray-300' : charCount > 0 ? 'border-amber-300' : 'border-gray-300'}
          `}
          rows={7}
          maxLength={maxLength}
          aria-label="Problem statement"
          aria-describedby="char-count-hint"
        />
        
        {/* Character Count */}
        <div className="flex items-center justify-between mt-2">
          <div id="char-count-hint" className="text-sm">
            {charCount < minLength ? (
              <span className="text-amber-600">
                {minLength - charCount} more characters needed (minimum {minLength})
              </span>
            ) : (
              <span className="text-green-600">
                ✓ Great! You can continue or add more detail
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {charCount} / {maxLength}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <p className="text-xs text-gray-700">
          <strong>Tip:</strong> Focus on the core problem from your users' perspective. 
          What frustrates them? What takes too long? What's confusing or difficult? 
          A clear problem statement helps us recommend the most valuable features.
        </p>
      </div>
    </div>
  )
}

