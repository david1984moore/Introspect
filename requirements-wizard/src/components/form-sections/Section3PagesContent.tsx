'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, FileText, Users, Mail, ShoppingCart, Calendar, Info, Phone, Search, Star, Briefcase, Camera } from 'lucide-react'

interface Section3Data {
  selectedPages: string[]
  contentStatus: Record<string, string>
}

interface Section3Props {
  data: Section3Data
  onUpdate: (data: Section3Data) => void
  onNext: () => void
  onBack: () => void
}

const pageOptions = [
  {
    id: 'home',
    name: 'Home/Landing Page',
    icon: FileText,
    description: 'Main page visitors see first',
    defaultSelected: true
  },
  {
    id: 'about',
    name: 'About Us',
    icon: Users,
    description: 'Your story, mission, and team',
    defaultSelected: true
  },
  {
    id: 'services',
    name: 'Services/Products',
    icon: Briefcase,
    description: 'What you offer and pricing',
    defaultSelected: true
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: Phone,
    description: 'How customers reach you',
    defaultSelected: true
  },
  {
    id: 'gallery',
    name: 'Gallery/Portfolio',
    icon: Camera,
    description: 'Showcase your work',
    defaultSelected: false
  },
  {
    id: 'testimonials',
    name: 'Testimonials/Reviews',
    icon: Star,
    description: 'Customer feedback and reviews',
    defaultSelected: false
  },
  {
    id: 'blog',
    name: 'Blog/News',
    icon: FileText,
    description: 'Regular updates and articles',
    defaultSelected: false
  },
  {
    id: 'faq',
    name: 'FAQ',
    icon: Info,
    description: 'Frequently asked questions',
    defaultSelected: false
  },
  {
    id: 'booking',
    name: 'Online Booking',
    icon: Calendar,
    description: 'Schedule appointments online',
    defaultSelected: false
  },
  {
    id: 'shop',
    name: 'Online Store',
    icon: ShoppingCart,
    description: 'Sell products online',
    defaultSelected: false
  },
  {
    id: 'search',
    name: 'Search',
    icon: Search,
    description: 'Help visitors find content',
    defaultSelected: false
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    icon: Mail,
    description: 'Build email list',
    defaultSelected: false
  }
]

const contentStatusOptions = [
  {
    value: 'have',
    label: 'I have it ready',
    description: 'Content is written and ready to use',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    value: 'help',
    label: 'I need help writing it',
    description: 'I know what to say but need help with writing',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    value: 'nothing',
    label: 'I have nothing yet',
    description: 'Need complete content creation',
    color: 'bg-red-100 text-red-800 border-red-200'
  }
]

export default function Section3PagesContent({ data, onUpdate, onNext, onBack }: Section3Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize with smart defaults on first load
  const initializeDefaults = () => {
    if (data.selectedPages.length === 0) {
      const defaultPages = pageOptions.filter(page => page.defaultSelected).map(page => page.id)
      const defaultContentStatus: Record<string, string> = {}
      defaultPages.forEach(pageId => {
        defaultContentStatus[pageId] = 'help' // Default to needing help
      })
      
      onUpdate({
        selectedPages: defaultPages,
        contentStatus: defaultContentStatus
      })
    }
  }

  // Initialize defaults on component mount
  useEffect(() => {
    initializeDefaults()
  }, [])

  const togglePage = (pageId: string) => {
    const newSelectedPages = data.selectedPages.includes(pageId)
      ? data.selectedPages.filter(id => id !== pageId)
      : [...data.selectedPages, pageId]

    const newContentStatus = { ...data.contentStatus }
    
    if (!newSelectedPages.includes(pageId)) {
      // Remove content status if page is deselected
      delete newContentStatus[pageId]
    } else if (!newContentStatus[pageId]) {
      // Add default content status if page is newly selected
      newContentStatus[pageId] = 'help'
    }

    onUpdate({
      selectedPages: newSelectedPages,
      contentStatus: newContentStatus
    })

    // Clear any errors for this page
    if (errors[pageId]) {
      const newErrors = { ...errors }
      delete newErrors[pageId]
      setErrors(newErrors)
    }
  }

  const updateContentStatus = (pageId: string, status: string) => {
    onUpdate({
      ...data,
      contentStatus: {
        ...data.contentStatus,
        [pageId]: status
      }
    })

    // Clear error for this page
    if (errors[pageId]) {
      const newErrors = { ...errors }
      delete newErrors[pageId]
      setErrors(newErrors)
    }
  }

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {}

    // Check if at least one page is selected
    if (data.selectedPages.length === 0) {
      newErrors.general = 'Please select at least one page for your website'
    }

    // Check if all selected pages have content status
    data.selectedPages.forEach(pageId => {
      if (!data.contentStatus[pageId]) {
        newErrors[pageId] = 'Please select content status for this page'
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onNext()
    }
  }

  const getSelectedPageCount = () => data.selectedPages.length
  const getTotalPageCount = () => pageOptions.length

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pages & Content</h2>
        <p className="text-gray-600">
          Which pages do you need and what's your content situation?
        </p>
        <div className="mt-2 text-sm text-gray-500">
          {getSelectedPageCount()} of {getTotalPageCount()} pages selected
        </div>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{errors.general}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Select Your Pages
          </CardTitle>
          <CardDescription>
            Choose which pages you need. We've pre-selected the most common ones.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {pageOptions.map((page) => {
              const Icon = page.icon
              const isSelected = data.selectedPages.includes(page.id)
              
              return (
                <div key={page.id} className="space-y-3">
                  <div
                    onClick={() => togglePage(page.id)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {page.name}
                      </div>
                      <div className="text-sm text-gray-600">{page.description}</div>
                    </div>
                  </div>

                  {/* Content Status Selection - Only show if page is selected */}
                  {isSelected && (
                    <div className="ml-8 space-y-2">
                      <div className="text-sm font-medium text-gray-700">
                        Content status for {page.name}:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {contentStatusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => updateContentStatus(page.id, option.value)}
                            className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                              data.contentStatus[page.id] === option.value
                                ? option.color
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs opacity-75">{option.description}</div>
                          </button>
                        ))}
                      </div>
                      {errors[page.id] && (
                        <div className="text-red-600 text-sm">{errors[page.id]}</div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {data.selectedPages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Pages Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.selectedPages.map((pageId) => {
                const page = pageOptions.find(p => p.id === pageId)
                const status = data.contentStatus[pageId]
                const statusOption = contentStatusOptions.find(opt => opt.value === status)
                
                if (!page || !statusOption) return null

                return (
                  <div key={pageId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <page.icon className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">{page.name}</span>
                    </div>
                    <Badge variant="outline" className={statusOption.color}>
                      {statusOption.label}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={validateAndProceed}
          className="flex items-center gap-2"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
