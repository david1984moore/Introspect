'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Code, 
  Palette, 
  Globe, 
  Mail,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react'

interface ProjectScope {
  submissionId: string
  businessSummary: {
    name: string
    description: string
    targetAudience: string
    uniqueValue: string
  }
  projectGoals: {
    primary: string[]
    features: string[]
    pages: string[]
  }
  designDirection: {
    tone: string
    style: string
    colors: string
    logoStatus: string
  }
  techStack: {
    framework: string
    cms?: string
    hosting: string
    database?: string
    ecommerce?: string
    booking?: string
  }
  timeline: {
    estimated: string
    phases: Array<{
      phase: string
      duration: string
    }>
  }
  budget: {
    estimate: string
    breakdown: Record<string, string>
  }
  technicalRequirements: {
    maintenance: string
    updateFrequency: string
    domain: string
    email: string[]
  }
  nextSteps: string[]
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [projectScope, setProjectScope] = useState<ProjectScope | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const generateScopeMarkdown = (projectScope: ProjectScope) => {
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    return `# ${projectScope.businessSummary.name} - Project Scope
*Generated: ${today}*

## Project Context
${projectScope.businessSummary.description}

**Target Audience:** ${projectScope.businessSummary.targetAudience}

**Unique Value Proposition:** ${projectScope.businessSummary.uniqueValue}

---

## IN SCOPE

### Core Features
${projectScope.projectGoals.primary.map(goal => `- ${goal}`).join('\n')}

### Website Pages
${projectScope.projectGoals.pages.map(page => `- ${page}`).join('\n')}

### Key Features
${projectScope.projectGoals.features.map(feature => `- ${feature}`).join('\n')}

### Must-Have Requirements
- **Timeline:** ${projectScope.timeline.estimated}
- **Budget:** ${projectScope.budget.estimate}
- **Framework:** ${projectScope.techStack.framework}
- **Hosting:** ${projectScope.techStack.hosting}
${projectScope.techStack.cms ? `- **CMS:** ${projectScope.techStack.cms}` : ''}
${projectScope.techStack.database ? `- **Database:** ${projectScope.techStack.database}` : ''}

### Success Criteria
- All ${projectScope.projectGoals.pages.length} pages functional and responsive
- ${projectScope.designDirection.tone} tone achieved in design
- ${projectScope.designDirection.style} style implemented
- Project completed within ${projectScope.timeline.estimated}
- Budget stays within ${projectScope.budget.estimate}

---

## OUT OF SCOPE
*Version 1.0 will NOT include:*
- Advanced analytics beyond basic tracking
- Multi-language support
- Advanced user roles/permissions
- Third-party integrations not specified above
- Mobile app development
- SEO optimization beyond basic setup

---

## PARKING LOT
*Great ideas for Version 2.0:*
- Advanced analytics dashboard
- Customer portal/login area
- Advanced booking features
- Integration with CRM systems
- Mobile app companion
- Advanced SEO tools
- A/B testing capabilities

---

## PROJECT PHASES

${projectScope.timeline.phases.map((phase, index) => 
  `### Phase ${index + 1}: ${phase.phase}
**Duration:** ${phase.duration}
**Focus:** Implementation and testing`
).join('\n\n')}

---

## TECHNICAL REQUIREMENTS

**Framework:** ${projectScope.techStack.framework}
**Hosting:** ${projectScope.techStack.hosting}
${projectScope.techStack.cms ? `**CMS:** ${projectScope.techStack.cms}` : ''}
${projectScope.techStack.database ? `**Database:** ${projectScope.techStack.database}` : ''}
${projectScope.techStack.ecommerce ? `**E-commerce:** ${projectScope.techStack.ecommerce}` : ''}
${projectScope.techStack.booking ? `**Booking:** ${projectScope.techStack.booking}` : ''}
**Domain Status:** ${projectScope.technicalRequirements.domain}
**Email Services:** ${projectScope.technicalRequirements.email.join(', ')}
**Maintenance:** ${projectScope.technicalRequirements.maintenance}
**Update Frequency:** ${projectScope.technicalRequirements.updateFrequency}

---

## NEXT STEPS

${projectScope.nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

---

*This scope was generated using the Requirements Wizard on ${today}*
*Submission ID: ${projectScope.submissionId}*`
  }

  const handleDownload = () => {
    if (!projectScope) return
    
    const markdown = generateScopeMarkdown(projectScope)
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectScope.businessSummary.name.replace(/[^a-zA-Z0-9]/g, '_')}_SCOPE.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (!projectScope) return
    
    const markdown = generateScopeMarkdown(projectScope)
    
    // Create email content
    const subject = encodeURIComponent(`${projectScope.businessSummary.name} - Website Project Scope`)
    const emailBody = encodeURIComponent(`Hi,

I've generated a comprehensive project scope for the ${projectScope.businessSummary.name} website using the Requirements Wizard.

Project Summary:
• Business: ${projectScope.businessSummary.name}
• Timeline: ${projectScope.timeline.estimated}
• Budget: ${projectScope.budget.estimate}
• Pages: ${projectScope.projectGoals.pages.length} pages
• Tech Stack: ${projectScope.techStack.framework}

The complete project scope document is attached below:

---

${markdown}

---

Generated by Requirements Wizard
Submission ID: ${projectScope.submissionId}`)

    // Try to send via API first (for proper attachment support)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `${projectScope.businessSummary.name} - Website Project Scope`,
          markdown: markdown,
          projectName: projectScope.businessSummary.name,
          submissionId: projectScope.submissionId
        })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.mailtoUrl) {
          // Use the API-generated mailto URL
          window.location.href = result.mailtoUrl
          alert('📧 Email client opened with project scope!\n\nPlease add recipient and send.')
          return
        }
      }
    } catch (err) {
      console.log('Email API not available, falling back to mailto')
    }
    
    // Fallback to mailto link
    const mailtoLink = `mailto:?subject=${subject}&body=${emailBody}`
    
    // Check if the mailto link is too long (some email clients have limits)
    if (mailtoLink.length > 2000) {
      // If too long, use a shorter version and suggest downloading
      const shortEmailBody = encodeURIComponent(`Hi,

I've generated a comprehensive project scope for the ${projectScope.businessSummary.name} website.

Project Summary:
• Business: ${projectScope.businessSummary.name}
• Timeline: ${projectScope.timeline.estimated}
• Budget: ${projectScope.budget.estimate}
• Pages: ${projectScope.projectGoals.pages.length} pages

The complete project scope document is too large to include in this email. Please download it using the "Download SCOPE.md" button on the results page.

Generated by Requirements Wizard
Submission ID: ${projectScope.submissionId}`)
      
      const shortMailtoLink = `mailto:?subject=${subject}&body=${shortEmailBody}`
      window.location.href = shortMailtoLink
      
      alert('📧 Email opened with project summary!\n\nNote: The full scope document is too large for email. Please use the Download button to get the complete SCOPE.md file.')
    } else {
      // Open email client with full content
      window.location.href = mailtoLink
      alert('📧 Email opened with complete project scope!\n\nPlease add recipient and send.')
    }
  }

  useEffect(() => {
    // In a real app, we'd fetch the results by ID from the API
    // For now, we'll get it from sessionStorage (set during form submission)
    const storedResults = sessionStorage.getItem('projectScopeResults')
    if (storedResults) {
      try {
        const results = JSON.parse(storedResults)
        setProjectScope(results.projectScope)
      } catch (err) {
        setError('Failed to load project scope results')
      }
    } else {
      setError('No project scope results found. Please complete the questionnaire first.')
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your project scope...</p>
        </div>
      </div>
    )
  }

  if (error || !projectScope) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <CheckCircle className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Results Not Found</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link href="/website">
              <Button>Start New Questionnaire</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/website" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questionnaire
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Website Project Scope
              </h1>
              <p className="text-gray-600">
                Based on your responses, here's your comprehensive project plan
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download SCOPE.md
              </Button>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  Project Scope Generated Successfully!
                </h3>
                <p className="text-green-700">
                  Submission ID: <code className="bg-green-100 px-2 py-1 rounded text-sm">{projectScope.submissionId}</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {/* Business Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                Business Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{projectScope.businessSummary.name}</h4>
                  <p className="text-gray-600 mt-1">{projectScope.businessSummary.description}</p>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Target Audience</h5>
                  <p className="text-gray-700">{projectScope.businessSummary.targetAudience}</p>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Unique Value Proposition</h5>
                  <p className="text-gray-700">{projectScope.businessSummary.uniqueValue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Budget Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Project Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{projectScope.timeline.estimated}</div>
                    <div className="text-sm text-blue-700">Estimated Duration</div>
                  </div>
                  
                  <div className="space-y-3">
                    {projectScope.timeline.phases.map((phase, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{phase.phase}</h5>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  Budget Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{projectScope.budget.estimate}</div>
                    <div className="text-sm text-green-700">Total Estimate</div>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(projectScope.budget.breakdown).map(([category, amount], index) => (
                      <div key={index} className="flex justify-between items-center">
                        <h5 className="font-medium capitalize">{category}</h5>
                        <div className="font-semibold text-green-600">{amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Website Goals & Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-purple-600" />
                Website Goals & Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Primary Goals</h5>
                  <div className="space-y-2">
                    {projectScope.projectGoals.primary.map((goal, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">Key Features</h5>
                  <div className="flex flex-wrap gap-2">
                    {projectScope.projectGoals.features.map((feature, index) => (
                      <Badge key={index} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                Content Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-3">Website Pages ({projectScope.projectGoals.pages.length})</h5>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {projectScope.projectGoals.pages.map((page, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="font-medium">{page}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design Direction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2 text-pink-600" />
                Design Direction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Design Style</h5>
                    <p className="text-gray-700">{projectScope.designDirection.style}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Emotional Tone</h5>
                    <p className="text-gray-700">{projectScope.designDirection.tone}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Color Preferences</h5>
                    <p className="text-gray-700">{projectScope.designDirection.colors}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Logo Status</h5>
                    <Badge variant="outline">{projectScope.designDirection.logoStatus}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-gray-600" />
                Recommended Technical Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Framework</h5>
                  <p className="text-sm text-gray-600">{projectScope.techStack.framework}</p>
                </div>
                
                {projectScope.techStack.cms && (
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Content Management</h5>
                    <p className="text-sm text-gray-600">{projectScope.techStack.cms}</p>
                  </div>
                )}
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Hosting</h5>
                  <p className="text-sm text-gray-600">{projectScope.techStack.hosting}</p>
                </div>
                
                {projectScope.techStack.database && (
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Database</h5>
                    <p className="text-sm text-gray-600">{projectScope.techStack.database}</p>
                  </div>
                )}
                
                {projectScope.techStack.ecommerce && (
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">E-commerce</h5>
                    <p className="text-sm text-gray-600">{projectScope.techStack.ecommerce}</p>
                  </div>
                )}
                
                {projectScope.techStack.booking && (
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Booking System</h5>
                    <p className="text-sm text-gray-600">{projectScope.techStack.booking}</p>
                  </div>
                )}
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Domain Status</h5>
                  <p className="text-sm text-gray-600">{projectScope.technicalRequirements.domain}</p>
                </div>
                
                <div className="p-4 border rounded-lg lg:col-span-2">
                  <h5 className="font-medium mb-2">Email Services</h5>
                  <div className="flex flex-wrap gap-2">
                    {projectScope.technicalRequirements.email.map((service, index) => (
                      <Badge key={index} variant="outline">{service}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                Your project scope has been generated and saved. Here's what happens next:
              </p>
              
              <div className="space-y-3">
                {projectScope.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button>Schedule Consultation</Button>
                <Button variant="outline">Request Changes</Button>
                <Link href="/website">
                  <Button variant="outline">Start New Project</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
