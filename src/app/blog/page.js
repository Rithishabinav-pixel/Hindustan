import { Suspense } from 'react'
import BlogClient from './BlogClient'
import Header from '../components/Header'

export default function BlogPage() {
  return (
    <Suspense fallback={<><Header/></>}>
      <BlogClient />
    </Suspense>
  )
}
