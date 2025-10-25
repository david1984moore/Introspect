'use client'

import { useQuestionnaire } from './QuestionnaireProvider'
import { formatCurrency } from '@/lib/utils'
import { QuestionContainer } from './QuestionContainer'
import { QuestionOne } from './questions/QuestionOne'
import { QuestionTwo } from './questions/QuestionTwo'
import { QuestionThree } from './questions/QuestionThree'
import { QuestionFour } from './questions/QuestionFour'

export function LandingPage() {
  const { state, startQuestionnaire } = useQuestionnaire()
  
  // If questionnaire is in progress, show current question
  if (state.startedAt && !state.isComplete) {
    return <QuestionnaireFlow />
  }
  
  // If questionnaire is complete, show results
  if (state.isComplete) {
    return <QuestionnaireComplete />
  }
  
  // Default landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-responsive-xl font-bold text-gray-900 mb-6">
              Introspect
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get an intelligent project scope and cost estimate in just 4-8 minutes. 
              Our adaptive questionnaire creates a comprehensive 24-40 page scope document 
              tailored to your business needs.
            </p>
          </div>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Cost Calculator</h3>
              <p className="text-gray-600">See your project cost update instantly as you select features. No surprises at the end.</p>
            </div>
            
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Scope Document</h3>
              <p className="text-gray-600">Receive a detailed 24-40 page PDF with technical specs, timeline, and risk assessment.</p>
            </div>
            
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">48-Hour Prototype Delivery</h3>
              <p className="text-gray-600">Get an interactive prototype and detailed specification within 48 hours of completion.</p>
            </div>
          </div>
          
          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Answer 18 Smart Questions</h3>
                <p className="text-gray-600">Our adaptive questionnaire learns from your answers to ask the right follow-up questions.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Instant Cost Estimate</h3>
                <p className="text-gray-600">Watch your project cost calculate in real-time as you select features and requirements.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Receive Complete Scope</h3>
                <p className="text-gray-600">Get a comprehensive project scope and interactive prototype delivered to your inbox.</p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="card p-8 bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of businesses who have used Introspect to plan their custom software projects. 
              The questionnaire takes just 4-8 minutes and your session is automatically saved.
            </p>
            
            <button
              onClick={startQuestionnaire}
              className="btn btn-primary px-8 py-3 text-lg font-semibold"
            >
              Start Your Project Scope
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              ✓ Free to use • ✓ No account required • ✓ Auto-saves progress
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuestionnaireFlow() {
  const { state } = useQuestionnaire()
  const { currentQuestion } = state
  
  // Render appropriate question based on currentQuestion
  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return <QuestionOne />
      case 2:
        return <QuestionTwo />
      case 3:
        return <QuestionThree />
      case 4:
        return <QuestionFour />
      default:
        return <div className="text-center p-8">Question {currentQuestion} - Coming Soon</div>
    }
  }
  
  return (
    <QuestionContainer showNavigation={true} showProgress={true}>
      {renderQuestion()}
    </QuestionContainer>
  )
}

function QuestionnaireComplete() {
  const { state, resetQuestionnaire } = useQuestionnaire()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="card p-8 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Questionnaire Complete!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing the Introspect questionnaire. Your comprehensive project scope 
          has been generated and sent to our team for review.
        </p>
        
        <div className="bg-primary-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-primary-900 mb-2">Project Estimate</h3>
          <p className="text-3xl font-bold text-primary-900 mb-2">
            {formatCurrency(state.costCalculation.totalEstimate)}
          </p>
          <p className="text-sm text-primary-700">
            Based on your selected features and requirements
          </p>
        </div>
        
        <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">What Happens Next:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• You'll receive a comprehensive scope document via email within 30 seconds</li>
            <li>• Our team will create an interactive prototype within 48 hours</li>
            <li>• We'll send you the prototype link and detailed specification</li>
            <li>• Schedule a call to discuss your project and next steps</li>
          </ul>
        </div>
        
        <button
          onClick={resetQuestionnaire}
          className="btn btn-secondary"
        >
          Start New Questionnaire
        </button>
      </div>
    </div>
  )
}
