'use client'

import React from 'react'
import { useQuestionnaire } from './QuestionnaireProvider'

interface QuestionContainerProps {
  children: React.ReactNode
  showNavigation?: boolean
  showProgress?: boolean
}

export function QuestionContainer({ 
  children, 
  showNavigation = true,
  showProgress = true 
}: QuestionContainerProps) {
  const { state, previousQuestion, nextQuestion } = useQuestionnaire()
  const { currentQuestion } = state

  const canGoBack = currentQuestion > 1
  const canGoForward = currentQuestion < 18
  const progressPercentage = (currentQuestion / 18) * 100

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with progress */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Introspect</h2>
            </div>
            
            {/* Cost Display */}
            <div className="text-right">
              <div className="text-xs text-gray-600">Estimated Cost</div>
              <div className="text-lg font-bold text-blue-600">
                ${state.costCalculation.totalEstimate.toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          {showProgress && (
            <div className="space-y-1">
              <div className="flex justify-end">
                <span className="text-xs text-gray-600">
                  {Math.round(progressPercentage)}% complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                  role="progressbar"
                  aria-valuenow={currentQuestion}
                  aria-valuemin={1}
                  aria-valuemax={18}
                  aria-label={`Progress: ${Math.round(progressPercentage)}% complete`}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto py-6">
        <div className="w-full">
          {children}
        </div>
      </main>

      {/* Navigation Footer */}
      {showNavigation && (
        <footer className="bg-white border-t border-gray-200 sticky bottom-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={previousQuestion}
              disabled={!canGoBack}
              className={`
                px-5 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  canGoBack
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }
              `}
              aria-label="Previous question"
            >
              ← Back
            </button>

            <button
              onClick={nextQuestion}
              disabled={!canGoForward}
              className={`
                px-5 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  canGoForward
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }
              `}
              aria-label="Next question"
            >
              Continue →
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}


