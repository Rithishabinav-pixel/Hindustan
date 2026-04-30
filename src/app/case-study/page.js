import { Suspense } from 'react'
import CaseStudyClient from './CaseStudyClient'
import Header from '../components/Header'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Case Studies | Hindustan Drone Services",
  description: "Explore our case studies to see how Hindustan Drone Services solves real industry challenges with precision drone technology.",
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
