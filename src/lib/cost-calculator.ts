import { QuestionnaireState, Platform, SelectedFeature } from '@/types/questionnaire'

// Cost calculation configuration
export const COST_CONFIG = {
  // Base feature costs (in USD)
  baseCosts: {
    // Core functionality
    'user-authentication': 2500,
    'user-profiles': 1500,
    'dashboard': 3000,
    'search-functionality': 2000,
    'content-management': 4000,
    'file-upload': 1500,
    'notifications': 2000,
    'messaging-system': 3500,
    
    // E-commerce features
    'product-catalog': 3000,
    'shopping-cart': 2500,
    'payment-processing': 4000,
    'order-management': 3500,
    'inventory-tracking': 3000,
    'shipping-integration': 2500,
    
    // Advanced features
    'real-time-chat': 4000,
    'video-calling': 6000,
    'ai-integration': 8000,
    'analytics-dashboard': 3500,
    'reporting-system': 3000,
    'api-development': 4500,
    'third-party-integrations': 2500,
    'custom-workflows': 5000,
    
    // Mobile-specific
    'push-notifications': 1500,
    'offline-functionality': 3000,
    'camera-integration': 2000,
    'gps-location': 1500,
    'biometric-auth': 2500,
  },
  
  // Platform multipliers
  platformMultipliers: {
    'web-responsive': 1.0,
    'ios-native': 1.5,
    'android-native': 1.5,
    'desktop-app': 1.3,
    'web-app-pwa': 1.1,
  } as Record<Platform, number>,
  
  // Complexity multipliers
  complexityMultipliers: {
    'simple': 1.0,
    'moderate': 1.3,
    'complex': 1.8,
  },
  
  // Integration costs
  integrationCosts: {
    // Payment processors
    'stripe': 1500,
    'paypal': 1200,
    'square': 1800,
    
    // CRM systems
    'salesforce': 3000,
    'hubspot': 2500,
    'pipedrive': 2000,
    
    // Marketing tools
    'mailchimp': 1500,
    'constant-contact': 1200,
    'sendgrid': 1000,
    
    // Analytics
    'google-analytics': 800,
    'mixpanel': 1500,
    'amplitude': 1800,
    
    // Communication
    'twilio': 2000,
    'sendbird': 2500,
    'slack': 1500,
    
    // Other
    'zapier': 1200,
    'custom-api': 3000,
  },
}

// Calculate total project cost based on current state
export function calculateProjectCost(state: QuestionnaireState) {
  const { features, platforms, integrations } = state.responses
  
  // Calculate base feature costs
  const baseFeatureCost = features.reduce((total, feature) => {
    if (!feature.selected) return total
    
    const baseCost = COST_CONFIG.baseCosts[feature.id] || feature.baseCost || 0
    const complexityMultiplier = COST_CONFIG.complexityMultipliers[feature.complexity] || 1
    
    return total + (baseCost * complexityMultiplier)
  }, 0)
  
  // Calculate platform multiplier (highest multiplier if multiple platforms)
  const platformMultiplier = platforms.length > 0 
    ? Math.max(...platforms.map(p => COST_CONFIG.platformMultipliers[p] || 1))
    : 1
  
  // Calculate integration costs
  const integrationCosts = integrations.reduce((total, integration) => {
    const cost = COST_CONFIG.integrationCosts[integration.id] || integration.estimatedCost || 0
    const complexityMultiplier = COST_CONFIG.complexityMultipliers[integration.complexity] || 1
    
    return total + (cost * complexityMultiplier)
  }, 0)
  
  // Calculate complexity multiplier based on overall project complexity
  const complexityMultiplier = calculateComplexityMultiplier(features, platforms, integrations)
  
  // Calculate total estimate
  const subtotal = (baseFeatureCost * platformMultiplier) + integrationCosts
  const totalEstimate = Math.round(subtotal * complexityMultiplier)
  
  return {
    baseFeatureCost,
    platformMultiplier,
    integrationCosts,
    complexityMultiplier,
    totalEstimate,
    lastCalculated: new Date(),
  }
}

// Calculate overall project complexity multiplier
function calculateComplexityMultiplier(
  features: SelectedFeature[],
  platforms: Platform[],
  integrations: any[]
): number {
  let complexityScore = 1.0
  
  // Add complexity for multiple platforms
  if (platforms.length > 1) {
    complexityScore += 0.2 * (platforms.length - 1)
  }
  
  // Add complexity for advanced features
  const advancedFeatures = features.filter(f => 
    f.selected && f.complexity === 'complex'
  ).length
  
  if (advancedFeatures > 0) {
    complexityScore += 0.1 * advancedFeatures
  }
  
  // Add complexity for multiple integrations
  if (integrations.length > 2) {
    complexityScore += 0.05 * (integrations.length - 2)
  }
  
  // Cap the complexity multiplier at 2.0
  return Math.min(complexityScore, 2.0)
}

// Get cost breakdown for display
export function getCostBreakdown(state: QuestionnaireState) {
  const calculation = calculateProjectCost(state)
  const { features, platforms, integrations } = state.responses
  
  return {
    features: features
      .filter(f => f.selected)
      .map(f => ({
        name: f.name,
        baseCost: COST_CONFIG.baseCosts[f.id] || f.baseCost || 0,
        complexity: f.complexity,
        finalCost: (COST_CONFIG.baseCosts[f.id] || f.baseCost || 0) * 
                  (COST_CONFIG.complexityMultipliers[f.complexity] || 1),
      })),
    
    platforms: platforms.map(p => ({
      name: p,
      multiplier: COST_CONFIG.platformMultipliers[p] || 1,
    })),
    
    integrations: integrations.map(i => ({
      name: i.name,
      baseCost: COST_CONFIG.integrationCosts[i.id] || i.estimatedCost || 0,
      complexity: i.complexity,
      finalCost: (COST_CONFIG.integrationCosts[i.id] || i.estimatedCost || 0) * 
                (COST_CONFIG.complexityMultipliers[i.complexity] || 1),
    })),
    
    totals: calculation,
  }
}

// Get cost estimate range based on budget selection
export function getBudgetRangeEstimate(budgetRange: string): { min: number; max: number } {
  const ranges: Record<string, { min: number; max: number }> = {
    'under-25k': { min: 10000, max: 25000 },
    '25k-50k': { min: 25000, max: 50000 },
    '50k-100k': { min: 50000, max: 100000 },
    '100k-250k': { min: 100000, max: 250000 },
    '250k-500k': { min: 250000, max: 500000 },
    'over-500k': { min: 500000, max: 1000000 },
  }
  
  return ranges[budgetRange] || { min: 0, max: 0 }
}

// Check if calculated cost aligns with selected budget range
export function isCostInBudgetRange(calculatedCost: number, budgetRange: string): boolean {
  const range = getBudgetRangeEstimate(budgetRange)
  return calculatedCost >= range.min && calculatedCost <= range.max
}
