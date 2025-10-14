import { NextRequest, NextResponse } from 'next/server'

interface FormData {
  section1: {
    businessName: string
    businessDescription: string
    targetCustomers: string[]
    differentiators: string
  }
  section2: {
    visitorGoals: string[]
    paymentMethods: string[]
    bookingType: string
    contactPreference: string
    additionalFeatures: string[]
  }
  section3: {
    selectedPages: string[]
    contentStatus: Record<string, string>
  }
  section4: {
    exampleWebsites: string[]
    designLikes: string[]
    emotionalTone: string[]
    logoStatus: string
    colorPreferences: string[]
  }
  section5: {
    whoUpdates: string
    updateFrequency: string
    domainStatus: string
    emailNeeds: string[]
  }
  section6: {
    budgetRange: string
    launchTimeline: string
    urgencyReason: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()
    
    // Validate required fields
    if (!formData.section1?.businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      )
    }

    // Log the submission for now (in production, this would go to a database)
    console.log('Form submission received:', {
      businessName: formData.section1.businessName,
      timestamp: new Date().toISOString(),
      sections: {
        business: !!formData.section1,
        goals: !!formData.section2,
        pages: !!formData.section3,
        design: !!formData.section4,
        technical: !!formData.section5,
        budget: !!formData.section6
      }
    })

    // Generate a simple project scope response
    // In a real implementation, this would use AI/LLM to generate comprehensive recommendations
    const projectScope = generateProjectScope(formData)

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      message: 'Project scope generated successfully',
      data: {
        projectScope,
        submissionId: `proj_${Date.now()}`,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateProjectScope(formData: FormData) {
  const { section1, section2, section3, section4, section5, section6 } = formData

  // Basic tech stack recommendation based on requirements
  const getTechStack = () => {
    const hasEcommerce = section2.visitorGoals.includes('Make purchases')
    const hasBooking = section2.visitorGoals.includes('Book appointments/services')
    const hasComplex = section3.selectedPages.length > 8
    const needsCMS = section5.whoUpdates === 'me' || section5.updateFrequency === 'daily'

    if (hasEcommerce) {
      return {
        framework: 'Next.js with TypeScript',
        ecommerce: 'Shopify or WooCommerce',
        database: 'PostgreSQL',
        hosting: 'Vercel or AWS',
        cms: needsCMS ? 'Sanity CMS' : 'Built-in admin'
      }
    } else if (hasBooking) {
      return {
        framework: 'Next.js with TypeScript',
        booking: 'Calendly integration or custom system',
        database: 'PostgreSQL',
        hosting: 'Vercel',
        cms: needsCMS ? 'Sanity CMS' : 'Built-in admin'
      }
    } else if (hasComplex || needsCMS) {
      return {
        framework: 'Next.js with TypeScript',
        database: 'PostgreSQL or MongoDB',
        hosting: 'Vercel',
        cms: 'Sanity CMS or Strapi'
      }
    } else {
      return {
        framework: 'Next.js with TypeScript',
        hosting: 'Vercel',
        cms: 'File-based or simple admin'
      }
    }
  }

  // Timeline estimation
  const getTimeline = () => {
    const pageCount = section3.selectedPages.length
    const hasEcommerce = section2.visitorGoals.includes('Make purchases')
    const hasBooking = section2.visitorGoals.includes('Book appointments/services')
    const hasCustomDesign = section4.designLikes.length > 3

    let weeks = 4 // Base timeline

    if (pageCount > 8) weeks += 2
    if (hasEcommerce) weeks += 3
    if (hasBooking) weeks += 2
    if (hasCustomDesign) weeks += 1
    if (section6.launchTimeline === 'asap') weeks = Math.max(weeks - 1, 3)

    return {
      estimated: `${weeks} weeks`,
      phases: [
        { phase: 'Planning & Design', duration: '1-2 weeks' },
        { phase: 'Development', duration: `${Math.ceil(weeks * 0.6)} weeks` },
        { phase: 'Testing & Launch', duration: '1 week' }
      ]
    }
  }

  // Budget estimation
  const getBudgetEstimate = () => {
    const selectedRange = section6.budgetRange
    const pageCount = section3.selectedPages.length
    const hasEcommerce = section2.visitorGoals.includes('Make purchases')
    
    let estimate = ''
    let breakdown = {}

    switch (selectedRange) {
      case 'basic':
        estimate = '$2,000 - $5,000'
        breakdown = {
          design: '$500 - $1,000',
          development: '$1,200 - $3,000',
          setup: '$300 - $1,000'
        }
        break
      case 'professional':
        estimate = '$5,000 - $15,000'
        breakdown = {
          design: '$1,000 - $3,000',
          development: '$3,000 - $10,000',
          setup: '$1,000 - $2,000'
        }
        break
      case 'enterprise':
        estimate = '$15,000+'
        breakdown = {
          design: '$3,000 - $8,000',
          development: '$10,000+',
          setup: '$2,000+'
        }
        break
      default:
        estimate = 'Custom quote needed'
    }

    return { estimate, breakdown }
  }

  return {
    businessSummary: {
      name: section1.businessName,
      description: section1.businessDescription,
      targetAudience: section1.targetCustomers.join(', '),
      uniqueValue: section1.differentiators
    },
    projectGoals: {
      primary: section2.visitorGoals,
      features: section2.additionalFeatures,
      pages: section3.selectedPages
    },
    techStack: getTechStack(),
    timeline: getTimeline(),
    budget: getBudgetEstimate(),
    designDirection: {
      tone: section4.emotionalTone.join(', '),
      style: section4.designLikes.join(', '),
      colors: section4.colorPreferences.join(', '),
      logoStatus: section4.logoStatus
    },
    technicalRequirements: {
      maintenance: section5.whoUpdates,
      updateFrequency: section5.updateFrequency,
      domain: section5.domainStatus,
      email: section5.emailNeeds
    },
    nextSteps: [
      'Review and approve this project scope',
      'Finalize contract and timeline',
      'Begin design phase with wireframes',
      'Set up development environment',
      'Regular check-ins and progress updates'
    ]
  }
}
