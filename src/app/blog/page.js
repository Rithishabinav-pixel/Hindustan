import { Suspense } from 'react'
import BlogClient from './BlogClient'
import Header from '../components/Header'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Drone Blog & Insights | Hindustan Drones",
  description: "Read drone industry insights, aerial technology trends, service updates and expert articles from Hindustan Drones.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
}

export default function BlogPage() {
  return (
    <Suspense fallback={<><Header/></>}>
      <BlogClient />
    </Suspense>
  )
}
