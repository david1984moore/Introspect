'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Palette, Eye, Heart, Lightbulb, Image, Check, X, Plus } from 'lucide-react'

interface Section4Data {
  exampleWebsites: string[]
  designLikes: string[]
  emotionalTone: string[]
  logoStatus: string
  colorPreferences: string[]
}

interface Section4LookFeelProps {
  data: Section4Data
  onDataChange: (data: Section4Data) => void
  onNext: () => void
  onBack: () => void
}

export default function Section4LookFeel({ data, onDataChange, onNext, onBack }: Section4LookFeelProps) {
  const [formData, setFormData] = useState<Section4Data>(data)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('')

  // Design elements they might like about websites
  const designElements = [
    'Clean and minimal design',
    'Bold and colorful',
    'Professional and corporate',
    'Modern and trendy',
    'Elegant typography',
    'Beautiful photography',
    'Easy navigation',
    'Interactive elements',
    'Mobile-friendly layout',
    'Fast loading speed',
    'Clear call-to-action buttons',
    'Organized content layout'
  ]

  // Emotional tones (pick 3)
  const emotionalTones = [
    'Professional',
    'Friendly',
    'Trustworthy',
    'Innovative',
    'Luxurious',
    'Approachable',
    'Energetic',
    'Calm',
    'Bold',
    'Sophisticated',
    'Playful',
    'Reliable'
  ]

  // Logo status options
  const logoStatusOptions = [
    { value: 'have', label: 'I have a logo ready to use' },
    { value: 'need-design', label: 'I need a logo designed' },
    { value: 'need-update', label: 'I have a logo but it needs updating' },
    { value: 'no-logo', label: 'I don\'t want a logo' }
  ]

  // Color preference options
  const colorOptions = [
    'Blue (trust, professional)',
    'Green (growth, nature)',
    'Red (energy, urgency)',
    'Orange (friendly, creative)',
    'Purple (luxury, creative)',
    'Black (elegant, sophisticated)',
    'Gray (neutral, modern)',
    'Gold (premium, luxury)',
    'Teal (calm, balanced)',
    'Pink (friendly, approachable)',
    'Brown (earthy, reliable)',
    'No preference - surprise me!'
  ]

  useEffect(() => {
    onDataChange(formData)
  }, [formData])

  const handleWebsiteAdd = () => {
    if (newWebsiteUrl.trim() && formData.exampleWebsites.length < 5) {
      let url = newWebsiteUrl.trim()
      // Add https:// if no protocol specified
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      
      setFormData(prev => ({
        ...prev,
        exampleWebsites: [...prev.exampleWebsites, url]
      }))
      setNewWebsiteUrl('')
    }
  }

  const handleWebsiteRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exampleWebsites: prev.exampleWebsites.filter((_, i) => i !== index)
    }))
  }

  const handleDesignLikeToggle = (element: string) => {
    setFormData(prev => ({
      ...prev,
      designLikes: prev.designLikes.includes(element)
        ? prev.designLikes.filter(item => item !== element)
        : [...prev.designLikes, element]
    }))
  }

  const handleEmotionalToneToggle = (tone: string) => {
    setFormData(prev => {
      const currentTones = prev.emotionalTone
      if (currentTones.includes(tone)) {
        return {
          ...prev,
          emotionalTone: currentTones.filter(item => item !== tone)
        }
      } else if (currentTones.length < 3) {
        return {
          ...prev,
          emotionalTone: [...currentTones, tone]
        }
      }
      return prev
    })
  }

  const handleLogoStatusChange = (status: string) => {
    setFormData(prev => ({
      ...prev,
      logoStatus: status
    }))
  }

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colorPreferences: prev.colorPreferences.includes(color)
        ? prev.colorPreferences.filter(item => item !== color)
        : [...prev.colorPreferences, color]
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.emotionalTone.length === 0) {
      newErrors.emotionalTone = 'Please select at least one emotional tone'
    }

    if (!formData.logoStatus) {
      newErrors.logoStatus = 'Please select your logo status'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-8">
      {/* Example Websites */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-600" />
            <span>Website Inspiration</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Share up to 5 websites you like (optional). We'll analyze what makes them appealing.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Website URL Input */}
          <div className="flex space-x-2">
            <input
              type="url"
              value={newWebsiteUrl}
              onChange={(e) => setNewWebsiteUrl(e.target.value)}
              placeholder="Enter website URL (e.g., example.com)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleWebsiteAdd()}
            />
            <Button 
              onClick={handleWebsiteAdd}
              disabled={!newWebsiteUrl.trim() || formData.exampleWebsites.length >= 5}
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Added Websites */}
          {formData.exampleWebsites.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Added websites:</div>
              {formData.exampleWebsites.map((url, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline text-sm truncate flex-1"
                  >
                    {url}
                  </a>
                  <Button
                    onClick={() => handleWebsiteRemove(index)}
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* What They Like About Websites */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-purple-600" />
            <span>Design Elements You Appreciate</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Select the design elements that appeal to you (select any that apply).
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {designElements.map((element) => (
              <div
                key={element}
                onClick={() => handleDesignLikeToggle(element)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.designLikes.includes(element)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{element}</span>
                  {formData.designLikes.includes(element) && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emotional Tone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <span>Desired Emotional Tone</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Pick up to 3 words that describe how you want visitors to feel about your brand.
          </p>
          {errors.emotionalTone && (
            <p className="text-sm text-red-600">{errors.emotionalTone}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {emotionalTones.map((tone) => (
              <div
                key={tone}
                onClick={() => handleEmotionalToneToggle(tone)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.emotionalTone.includes(tone)
                    ? 'border-purple-500 bg-purple-50'
                    : formData.emotionalTone.length >= 3
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{tone}</span>
                  {formData.emotionalTone.includes(tone) && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {formData.emotionalTone.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Selected tones:</div>
              <div className="flex flex-wrap gap-2">
                {formData.emotionalTone.map((tone) => (
                  <Badge key={tone} variant="secondary" className="bg-purple-100 text-purple-800">
                    {tone}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Logo Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5 text-purple-600" />
            <span>Logo Status</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            What's your current logo situation?
          </p>
          {errors.logoStatus && (
            <p className="text-sm text-red-600">{errors.logoStatus}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logoStatusOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleLogoStatusChange(option.value)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  formData.logoStatus === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {formData.logoStatus === option.value && (
                    <Check className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-purple-600" />
            <span>Color Preferences</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Select colors that appeal to you for your website (optional).
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {colorOptions.map((color) => (
              <div
                key={color}
                onClick={() => handleColorToggle(color)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.colorPreferences.includes(color)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{color}</span>
                  {formData.colorPreferences.includes(color) && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {formData.colorPreferences.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Selected colors:</div>
              <div className="flex flex-wrap gap-2">
                {formData.colorPreferences.map((color) => (
                  <Badge key={color} variant="secondary" className="bg-purple-100 text-purple-800">
                    {color.split(' (')[0]}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Button onClick={handleNext} className="flex items-center space-x-2">
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
