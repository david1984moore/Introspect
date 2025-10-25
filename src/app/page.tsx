'use client'

import { QuestionnaireProvider } from '@/components/QuestionnaireProvider'
import { LandingPage } from '@/components/LandingPage'

export default function Home() {
  return (
    <QuestionnaireProvider>
      <LandingPage />
    </QuestionnaireProvider>
  )
}
