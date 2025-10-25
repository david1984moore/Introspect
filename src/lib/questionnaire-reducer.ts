import { QuestionnaireState, QuestionnaireAction } from '@/types/questionnaire'
import { generateSessionId } from './utils'
import { calculateProjectCost } from './cost-calculator'

// Initial state for the questionnaire
export const initialState: QuestionnaireState = {
  currentQuestion: 1,
  isComplete: false,
  startedAt: null,
  completedAt: null,
  sessionId: '',
  lastSaved: null,
  responses: {
    businessType: null,
    businessDescription: '',
    targetCustomers: [],
    primaryGoal: null,
    successMetrics: [],
    features: [],
    platforms: [],
    integrations: [],
    budgetRange: null,
    timelinePreference: null,
    contactInfo: null,
  },
  costCalculation: {
    baseFeatureCost: 0,
    platformMultiplier: 1,
    integrationCosts: 0,
    complexityMultiplier: 1,
    totalEstimate: 0,
    lastCalculated: null,
  },
  conditionalLogic: {
    showQ9: false,
    showQ11: false,
    showQ12: false,
  },
}

// Reducer function for questionnaire state management
export function questionnaireReducer(
  state: QuestionnaireState,
  action: QuestionnaireAction
): QuestionnaireState {
  switch (action.type) {
    case 'START_QUESTIONNAIRE':
      return {
        ...state,
        startedAt: new Date(),
        sessionId: generateSessionId(),
        currentQuestion: 1,
      }

    case 'NEXT_QUESTION':
      const nextQuestion = Math.min(state.currentQuestion + 1, 18)
      return {
        ...state,
        currentQuestion: nextQuestion,
      }

    case 'PREVIOUS_QUESTION':
      const prevQuestion = Math.max(state.currentQuestion - 1, 1)
      return {
        ...state,
        currentQuestion: prevQuestion,
      }

    case 'JUMP_TO_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(1, Math.min(18, action.payload)),
      }

    case 'UPDATE_RESPONSE':
      const updatedResponses = {
        ...state.responses,
        [action.payload.question]: action.payload.value,
      }
      
      // Update conditional logic based on responses
      const updatedConditionalLogic = updateConditionalLogic(updatedResponses)
      
      return {
        ...state,
        responses: updatedResponses,
        conditionalLogic: updatedConditionalLogic,
      }

    case 'UPDATE_FEATURES':
      const updatedState = {
        ...state,
        responses: {
          ...state.responses,
          features: action.payload,
        },
      }
      
      // Recalculate cost when features change
      const newCostCalculation = calculateProjectCost(updatedState)
      
      return {
        ...updatedState,
        costCalculation: newCostCalculation,
      }

    case 'CALCULATE_COST':
      return {
        ...state,
        costCalculation: calculateProjectCost(state),
      }

    case 'SAVE_SESSION':
      return {
        ...state,
        lastSaved: new Date(),
      }

    case 'LOAD_SESSION':
      return {
        ...action.payload,
        lastSaved: new Date(),
      }

    case 'COMPLETE_QUESTIONNAIRE':
      return {
        ...state,
        isComplete: true,
        completedAt: new Date(),
        currentQuestion: 18,
      }

    case 'RESET_QUESTIONNAIRE':
      return {
        ...initialState,
        sessionId: generateSessionId(),
      }

    default:
      return state
  }
}

// Helper function to update conditional logic based on responses
function updateConditionalLogic(responses: QuestionnaireState['responses']) {
  const { features, platforms, businessType } = responses
  
  return {
    // Show Q9 (Advanced Features) if user selected complex core features
    showQ9: features.some(f => 
      f.selected && 
      f.category === 'core-functionality' && 
      f.complexity === 'complex'
    ),
    
    // Show Q11 (E-commerce specific) if business type is e-commerce or retail
    showQ11: businessType === 'ecommerce' || businessType === 'retail',
    
    // Show Q12 (Mobile app specific) if user selected mobile platforms
    showQ12: platforms.some(p => 
      p === 'ios-native' || 
      p === 'android-native'
    ),
  }
}
