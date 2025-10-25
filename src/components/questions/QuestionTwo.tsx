'use client'

import React, { useState, useEffect } from 'react'
import { BusinessType } from '@/types/questionnaire'
import { useQuestionnaire } from '@/components/QuestionnaireProvider'

// Adaptive question text based on business type
const ADAPTIVE_QUESTIONS: Record<BusinessType, { title: string; placeholder: string; examples: string[] }> = {
  'restaurant': {
    title: 'Tell us about your restaurant',
    placeholder: 'Example: A family-friendly Italian restaurant focusing on authentic pasta and wood-fired pizzas...',
    examples: [
      'What type of cuisine do you serve?',
      'What makes your restaurant unique?',
      'Who is your target customer?'
    ]
  },
  'retail': {
    title: 'Tell us about your retail business',
    placeholder: 'Example: A boutique clothing store specializing in sustainable fashion for young professionals...',
    examples: [
      'What products do you sell?',
      'What makes your store different?',
      'Who shops at your store?'
    ]
  },
  'professional-services': {
    title: 'Tell us about your professional services',
    placeholder: 'Example: A consulting firm helping small businesses optimize their operations and reduce costs...',
    examples: [
      'What services do you provide?',
      'Who are your typical clients?',
      'What problems do you solve?'
    ]
  },
  'healthcare': {
    title: 'Tell us about your healthcare practice',
    placeholder: 'Example: A family medicine clinic offering preventive care and chronic disease management...',
    examples: [
      'What type of care do you provide?',
      'Who are your patients?',
      'What makes your practice special?'
    ]
  },
  'education': {
    title: 'Tell us about your educational services',
    placeholder: 'Example: An online tutoring platform helping high school students prepare for college entrance exams...',
    examples: [
      'What do you teach or train?',
      'Who are your students?',
      'What learning outcomes do you provide?'
    ]
  },
  'nonprofit': {
    title: 'Tell us about your nonprofit organization',
    placeholder: 'Example: A community organization providing job training and placement services for underserved populations...',
    examples: [
      'What is your mission?',
      'Who do you serve?',
      'What impact do you create?'
    ]
  },
  'ecommerce': {
    title: 'Tell us about your e-commerce business',
    placeholder: 'Example: An online marketplace connecting local artisans with customers seeking handmade home decor...',
    examples: [
      'What products do you sell online?',
      'Who are your customers?',
      'What makes your business unique?'
    ]
  },
  'saas': {
    title: 'Tell us about your SaaS product',
    placeholder: 'Example: A project management tool designed for remote teams to collaborate and track deliverables...',
    examples: [
      'What problem does your software solve?',
      'Who are your target users?',
      'What makes your solution different?'
    ]
  },
  'manufacturing': {
    title: 'Tell us about your manufacturing business',
    placeholder: 'Example: A precision parts manufacturer serving the aerospace and automotive industries...',
    examples: [
      'What do you manufacture?',
      'Who are your customers?',
      'What is your specialty?'
    ]
  },
  'real-estate': {
    title: 'Tell us about your real estate business',
    placeholder: 'Example: A property management company specializing in residential rentals in urban areas...',
    examples: [
      'What real estate services do you provide?',
      'What type of properties do you handle?',
      'Who are your clients?'
    ]
  },
  'fitness': {
    title: 'Tell us about your fitness business',
    placeholder: 'Example: A boutique gym offering personalized training programs and group fitness classes...',
    examples: [
      'What fitness services do you offer?',
      'Who are your members?',
      'What makes your approach unique?'
    ]
  },
  'other': {
    title: 'Tell us about your business',
    placeholder: 'Example: Describe what your business does, who you serve, and what makes you unique...',
    examples: [
      'What does your business do?',
      'Who are your customers?',
      'What makes you different?'
    ]
  }
}

export function QuestionTwo() {
  const { state, updateResponse } = useQuestionnaire()
  const businessType = state.responses.businessType
  const savedDescription = state.responses.businessDescription || ''
  
  const [description, setDescription] = useState(savedDescription)
  const [charCount, setCharCount] = useState(savedDescription.length)
  
  // Get adaptive content based on business type
  const adaptiveContent = businessType 
    ? ADAPTIVE_QUESTIONS[businessType]
    : ADAPTIVE_QUESTIONS['other']

  // Update character count and save to state
  useEffect(() => {
    setCharCount(description.length)
  }, [description])

  // Debounced save to state (auto-save as user types)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateResponse('businessDescription', description)
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [description, updateResponse])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const minLength = 50
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
          Help us understand your business so we can provide the most relevant recommendations.
        </p>
        
        {/* Helper prompts */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-900 mb-1">Consider including:</p>
          <ul className="text-xs text-blue-800 space-y-0.5">
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
          value={description}
          onChange={handleChange}
          placeholder={adaptiveContent.placeholder}
          className={`
            w-full px-3 py-2 rounded-lg border-2 text-sm text-gray-900 
            placeholder-gray-400 resize-none transition-all
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${isValid ? 'border-gray-300' : charCount > 0 ? 'border-amber-300' : 'border-gray-300'}
          `}
          rows={6}
          maxLength={maxLength}
          aria-label="Business description"
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
          <strong>Tip:</strong> The more detail you provide, the more accurate your project scope will be. 
          Aim for 2-3 sentences describing what you do, who you serve, and what makes you unique.
        </p>
      </div>
    </div>
  )
}

