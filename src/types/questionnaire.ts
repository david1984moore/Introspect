// Core questionnaire types based on 18-question adaptive flow

export interface QuestionnaireState {
  // Current progress
  currentQuestion: number
  isComplete: boolean
  startedAt: Date | null
  completedAt: Date | null
  
  // Session persistence
  sessionId: string
  lastSaved: Date | null
  
  // Question responses (Q1-Q18)
  responses: {
    // Q1: Business Type (drives adaptive Q2 wording)
    businessType: BusinessType | null
    
    // Q2: Business Description (adaptive wording based on Q1)
    businessDescription: string
    
    // Q3: Target Customers (smart default from Q2)
    targetCustomers: string[]
    
    // Q4: Problem Statement (adaptive based on Q1)
    problemStatement: string
    
    // Q5: Primary Goal
    primaryGoal: ProjectGoal | null
    
    // Q5: Success Metrics
    successMetrics: string[]
    
    // Q6-Q13: Feature Selection (drives cost calculation)
    features: SelectedFeature[]
    
    // Q14: Platform Requirements
    platforms: Platform[]
    
    // Q15: Integration Needs
    integrations: Integration[]
    
    // Q16: Budget Range
    budgetRange: BudgetRange | null
    
    // Q17: Timeline Preference
    timelinePreference: TimelineOption | null
    
    // Q18: Contact Information
    contactInfo: ContactInfo | null
  }
  
  // Real-time cost calculation
  costCalculation: {
    baseFeatureCost: number
    platformMultiplier: number
    integrationCosts: number
    complexityMultiplier: number
    totalEstimate: number
    lastCalculated: Date | null
  }
  
  // Conditional logic state
  conditionalLogic: {
    showQ9: boolean  // Advanced features based on Q6-Q8 selections
    showQ11: boolean // E-commerce specific based on Q10
    showQ12: boolean // Mobile app specific based on Q14
  }
}

export type BusinessType = 
  | 'restaurant'
  | 'retail'
  | 'professional-services'
  | 'healthcare'
  | 'education'
  | 'nonprofit'
  | 'ecommerce'
  | 'saas'
  | 'manufacturing'
  | 'real-estate'
  | 'fitness'
  | 'other'

export type ProjectGoal =
  | 'increase-sales'
  | 'improve-efficiency'
  | 'better-customer-service'
  | 'expand-market-reach'
  | 'reduce-costs'
  | 'modernize-operations'
  | 'comply-regulations'
  | 'other'

export interface SelectedFeature {
  id: string
  name: string
  category: FeatureCategory
  baseCost: number
  complexity: 'simple' | 'moderate' | 'complex'
  selected: boolean
}

export type FeatureCategory =
  | 'core-functionality'
  | 'user-management'
  | 'payment-processing'
  | 'content-management'
  | 'analytics-reporting'
  | 'integrations'
  | 'mobile-features'
  | 'advanced-features'

export type Platform = 
  | 'web-responsive'
  | 'ios-native'
  | 'android-native'
  | 'desktop-app'
  | 'web-app-pwa'

export interface Integration {
  id: string
  name: string
  category: 'payment' | 'crm' | 'marketing' | 'analytics' | 'communication' | 'other'
  estimatedCost: number
  complexity: 'simple' | 'moderate' | 'complex'
}

export type BudgetRange =
  | 'under-25k'
  | '25k-50k'
  | '50k-100k'
  | '100k-250k'
  | '250k-500k'
  | 'over-500k'

export type TimelineOption =
  | 'asap'
  | '3-months'
  | '6-months'
  | '12-months'
  | 'flexible'

export interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  company: string
  phone?: string
  preferredContact: 'email' | 'phone' | 'either'
}

// Action types for useReducer
export type QuestionnaireAction =
  | { type: 'START_QUESTIONNAIRE' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'JUMP_TO_QUESTION'; payload: number }
  | { type: 'UPDATE_RESPONSE'; payload: { question: keyof QuestionnaireState['responses']; value: any } }
  | { type: 'UPDATE_FEATURES'; payload: SelectedFeature[] }
  | { type: 'CALCULATE_COST' }
  | { type: 'SAVE_SESSION' }
  | { type: 'LOAD_SESSION'; payload: QuestionnaireState }
  | { type: 'COMPLETE_QUESTIONNAIRE' }
  | { type: 'RESET_QUESTIONNAIRE' }

// Cost calculation configuration
export interface CostConfig {
  baseCosts: Record<string, number>
  platformMultipliers: Record<Platform, number>
  complexityMultipliers: Record<string, number>
  integrationCosts: Record<string, number>
}

// Question configuration for adaptive logic
export interface QuestionConfig {
  id: number
  title: string
  description?: string
  type: 'single-select' | 'multi-select' | 'text' | 'contact-form'
  required: boolean
  conditional?: {
    dependsOn: number[]
    showIf: (state: QuestionnaireState) => boolean
  }
  adaptiveContent?: {
    [key in BusinessType]?: {
      title?: string
      description?: string
      options?: any[]
    }
  }
}
