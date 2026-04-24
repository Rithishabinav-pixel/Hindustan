import { Suspense } from 'react'
import BlogClient from './BlogClient'
import Header from '../components/Header'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "AgriFlow HDS40 | Hindustan Drone Services",
  description: "Our AgriFlow HDS40 is designed to simplify and scale modern farming operations with precision and consistency. Built for demanding field conditions, we ensure efficient coverage, reduced manual effort, and reliable performance across large agricultural landscapes.",
  alternates: {
    canonical: `${baseUrl}/products/agriflow-hds40`,
  },
}

export default function BlogPage() {
  return (
    <Suspense fallback={<><Header/></>}>
      <BlogClient />
    </Suspense>
  )
}
