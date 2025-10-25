'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { QuestionnaireState, QuestionnaireAction } from '@/types/questionnaire'
import { questionnaireReducer, initialState } from '@/lib/questionnaire-reducer'
import { localStorage, debounce } from '@/lib/utils'

// Context type
interface QuestionnaireContextType {
  state: QuestionnaireState
  dispatch: React.Dispatch<QuestionnaireAction>
  
  // Helper functions
  startQuestionnaire: () => void
  nextQuestion: () => void
  previousQuestion: () => void
  jumpToQuestion: (questionNumber: number) => void
  updateResponse: (question: keyof QuestionnaireState['responses'], value: any) => void
  saveSession: () => void
  loadSession: () => void
  completeQuestionnaire: () => void
  resetQuestionnaire: () => void
}

// Create context
const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined)

// Custom hook to use the questionnaire context
export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext)
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider')
  }
  return context
}

// Session storage key
const SESSION_STORAGE_KEY = 'introspect_questionnaire_session'

// Provider component
export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(questionnaireReducer, initialState)
  
  // Debounced save function (500ms delay as per scope)
  const debouncedSave = debounce(() => {
    if (state.sessionId) {
      localStorage.set(SESSION_STORAGE_KEY, {
        ...state,
        lastSaved: new Date(),
      })
      dispatch({ type: 'SAVE_SESSION' })
    }
  }, 500)
  
  // Auto-save when state changes (except for navigation-only changes)
  useEffect(() => {
    if (state.startedAt && !state.isComplete) {
      debouncedSave()
    }
  }, [
    state.responses,
    state.costCalculation,
    debouncedSave
  ])
  
  // Load session on mount
  useEffect(() => {
    const savedSession = localStorage.get(SESSION_STORAGE_KEY)
    if (savedSession && savedSession.sessionId) {
      // Check if session is within 7-day retention period
      const savedDate = new Date(savedSession.lastSaved)
      const daysSinceLastSave = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60 * 24)
      
      if (daysSinceLastSave <= 7) {
        dispatch({ type: 'LOAD_SESSION', payload: savedSession })
      } else {
        // Session expired, clear it
        localStorage.remove(SESSION_STORAGE_KEY)
      }
    }
  }, [])
  
  // Helper functions
  const startQuestionnaire = () => {
    dispatch({ type: 'START_QUESTIONNAIRE' })
  }
  
  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' })
  }
  
  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' })
  }
  
  const jumpToQuestion = (questionNumber: number) => {
    dispatch({ type: 'JUMP_TO_QUESTION', payload: questionNumber })
  }
  
  const updateResponse = (question: keyof QuestionnaireState['responses'], value: any) => {
    dispatch({ type: 'UPDATE_RESPONSE', payload: { question, value } })
    
    // Trigger cost calculation if it's a feature-related update
    if (question === 'features' || question === 'platforms' || question === 'integrations') {
      setTimeout(() => {
        dispatch({ type: 'CALCULATE_COST' })
      }, 0)
    }
  }
  
  const saveSession = () => {
    if (state.sessionId) {
      localStorage.set(SESSION_STORAGE_KEY, {
        ...state,
        lastSaved: new Date(),
      })
      dispatch({ type: 'SAVE_SESSION' })
    }
  }
  
  const loadSession = () => {
    const savedSession = localStorage.get(SESSION_STORAGE_KEY)
    if (savedSession) {
      dispatch({ type: 'LOAD_SESSION', payload: savedSession })
    }
  }
  
  const completeQuestionnaire = () => {
    dispatch({ type: 'COMPLETE_QUESTIONNAIRE' })
    // Clear session after completion
    setTimeout(() => {
      localStorage.remove(SESSION_STORAGE_KEY)
    }, 1000)
  }
  
  const resetQuestionnaire = () => {
    dispatch({ type: 'RESET_QUESTIONNAIRE' })
    localStorage.remove(SESSION_STORAGE_KEY)
  }
  
  const contextValue: QuestionnaireContextType = {
    state,
    dispatch,
    startQuestionnaire,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    updateResponse,
    saveSession,
    loadSession,
    completeQuestionnaire,
    resetQuestionnaire,
  }
  
  return (
    <QuestionnaireContext.Provider value={contextValue}>
      {children}
    </QuestionnaireContext.Provider>
  )
}
