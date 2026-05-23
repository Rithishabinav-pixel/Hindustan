import { Suspense } from 'react'
import CaseStudyClient from './CaseStudyClient'
import Header from '../components/Header'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Drone Case Studies | Hindustan Drones",
  description: "Explore drone project case studies, real-world applications and measurable outcomes across industries served by Hindustan Drones.",
  alternates: {
    canonical: `${baseUrl}/case-study`,
  },
}

export default function CaseStudyPage() {
  return (
    <Suspense fallback={<><Header/></>}>
      <CaseStudyClient />
    </Suspense>
  )
}
