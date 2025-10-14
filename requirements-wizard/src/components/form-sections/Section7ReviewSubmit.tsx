'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Target, 
  FileText, 
  Palette, 
  Settings, 
  DollarSign,
  Edit3,
  Send,
  CheckCircle
} from 'lucide-react'
import { useState } from 'react'

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

interface Section7ReviewSubmitProps {
  data: FormData
  onEdit: (section: number) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting?: boolean
}

export default function Section7ReviewSubmit({ 
  data, 
  onEdit, 
  onSubmit, 
  onBack,
  isSubmitting = false 
}: Section7ReviewSubmitProps) {
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false
  })

  const toggleExpanded = (section: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const renderSection1Summary = () => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Your Business</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(1)}
            className="flex items-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-sm text-gray-600">Business Name</div>
            <div className="text-gray-900">{data.section1.businessName || 'Not provided'}</div>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-600">Description</div>
            <div className="text-gray-900">{data.section1.businessDescription || 'Not provided'}</div>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-600">Target Customers ({data.section1.targetCustomers.length})</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.section1.targetCustomers.map((customer, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {customer}
                </Badge>
              ))}
            </div>
          </div>
          {isExpanded.section1 && data.section1.differentiators && (
            <div>
              <div className="font-medium text-sm text-gray-600">What Makes You Different</div>
              <div className="text-gray-900">{data.section1.differentiators}</div>
            </div>
          )}
        </div>
        {data.section1.differentiators && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpanded('section1')}
            className="mt-2 text-xs"
          >
            {isExpanded.section1 ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </CardContent>
    </Card>
  )

  const renderSection2Summary = () => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Target className="w-5 h-5 text-green-600" />
            <span>Website Goals</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            className="flex items-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-sm text-gray-600">Visitor Goals ({data.section2.visitorGoals.length})</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.section2.visitorGoals.map((goal, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
          {isExpanded.section2 && (
            <>
              {data.section2.paymentMethods.length > 0 && (
                <div>
                  <div className="font-medium text-sm text-gray-600">Payment Methods</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.section2.paymentMethods.map((method, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.section2.bookingType && (
                <div>
                  <div className="font-medium text-sm text-gray-600">Booking Type</div>
                  <div className="text-gray-900">{data.section2.bookingType}</div>
                </div>
              )}
              {data.section2.contactPreference && (
                <div>
                  <div className="font-medium text-sm text-gray-600">Contact Preference</div>
                  <div className="text-gray-900">{data.section2.contactPreference}</div>
                </div>
              )}
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleExpanded('section2')}
          className="mt-2 text-xs"
        >
          {isExpanded.section2 ? 'Show Less' : 'Show More'}
        </Button>
      </CardContent>
    </Card>
  )

  const renderSection3Summary = () => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Pages & Content</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(3)}
            className="flex items-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-sm text-gray-600">Selected Pages ({data.section3.selectedPages.length})</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.section3.selectedPages.map((page, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {page}
                </Badge>
              ))}
            </div>
          </div>
          {isExpanded.section3 && (
            <div>
              <div className="font-medium text-sm text-gray-600">Content Status</div>
              <div className="grid grid-cols-1 gap-1 mt-1">
                {Object.entries(data.section3.contentStatus).map(([page, status]) => (
                  <div key={page} className="flex justify-between text-xs">
                    <span className="text-gray-700">{page}</span>
                    <Badge 
                      variant={status === 'have-it' ? 'default' : status === 'need-help' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {status === 'have-it' ? 'Have it' : status === 'need-help' ? 'Need help' : 'Have nothing'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleExpanded('section3')}
          className="mt-2 text-xs"
        >
          {isExpanded.section3 ? 'Show Less' : 'Show More'}
        </Button>
      </CardContent>
    </Card>
  )

  const renderSection4Summary = () => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Palette className="w-5 h-5 text-pink-600" />
            <span>Look & Feel</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(4)}
            className="flex items-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-sm text-gray-600">Emotional Tone ({data.section4.emotionalTone.length})</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.section4.emotionalTone.map((tone, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tone}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-600">Logo Status</div>
            <div className="text-gray-900">{data.section4.logoStatus || 'Not specified'}</div>
          </div>
          {isExpanded.section4 && (
            <>
              {data.section4.designLikes.length > 0 && (
                <div>
                  <div className="font-medium text-sm text-gray-600">Design Preferences</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.section4.designLikes.map((like, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {like}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.section4.colorPreferences.length > 0 && (
                <div>
                  <div className="font-medium text-sm text-gray-600">Color Preferences</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.section4.colorPreferences.map((color, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleExpanded('section4')}
          className="mt-2 text-xs"
        >
          {isExpanded.section4 ? 'Show Less' : 'Show More'}
        </Button>
      </CardContent>
    </Card>
  )

  const renderSection5Summary = () => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Settings className="w-5 h-5 text-orange-600" />
            <span>Technical Details</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(5)}
            className="flex items-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-sm text-gray-600">Who Updates Website</div>
            <div className="text-gray-900">{data.section5.whoUpdates || 'Not specified'}</div>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-600">Update Frequency</div>
            <div className="text-gray-900">{data.section5.updateFrequency || 'Not specified'}</div>
          </div>
          {isExpanded.section5 && (
            <>
              <div>
                <div className="font-medium text-sm text-gray-600">Domain Status</div>
                <div className="text-gray-900">{data.section5.domainStatus || 'Not specified'}</div>
              </div>
              {data.section5.emailNeeds.length > 0 && (
                <div>
                  <div className="font-medium text-sm text-gray-600">Email Needs</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.section5.emailNeeds.map((need, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleExpanded('section5')}
          className="mt-2 text-xs"
        >
          {isExpanded.section5 ? 'Show Less' : 'Show More'}
        </Button>
      </CardContent>
    </Card>
  )

  const renderSection6Summary = () => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Budget & Timeline</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(6)}
            className="flex items-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-sm text-gray-600">Budget Range</div>
            <div className="text-gray-900">{data.section6.budgetRange || 'Not specified'}</div>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-600">Launch Timeline</div>
            <div className="text-gray-900">{data.section6.launchTimeline || 'Not specified'}</div>
          </div>
          {isExpanded.section6 && data.section6.urgencyReason && (
            <div>
              <div className="font-medium text-sm text-gray-600">Urgency Reason</div>
              <div className="text-gray-900">{data.section6.urgencyReason}</div>
            </div>
          )}
        </div>
        {data.section6.urgencyReason && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpanded('section6')}
            className="mt-2 text-xs"
          >
            {isExpanded.section6 ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>Review Your Responses</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Please review all your responses below. You can edit any section by clicking the "Edit" button. 
            Once you're satisfied, click "Generate Project Scope" to receive your personalized recommendations.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">What happens next?</div>
                <div className="text-sm text-blue-700 mt-1">
                  Our AI will analyze your responses and generate a comprehensive project scope including 
                  tech stack recommendations, timeline, budget breakdown, and detailed requirements document.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Summary */}
      <div className="space-y-4">
        {renderSection1Summary()}
        {renderSection2Summary()}
        {renderSection3Summary()}
        {renderSection4Summary()}
        {renderSection5Summary()}
        {renderSection6Summary()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back to Budget & Timeline
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-8"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Generate Project Scope</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
