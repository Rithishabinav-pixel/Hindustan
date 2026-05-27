import React from 'react'
import ProductClient from './ProductClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Industrial Drone Products & UAV Solutions | Hindustan Drones",
  description: "Explore advanced industrial drone products and UAV solutions by Hindustan Drones. Discover high-performance drones engineered for mapping, surveying, inspections, aerial intelligence, and enterprise operations.",
  alternates: {
    canonical: `${baseUrl}/products`,
  },
}

export default function page() {
  return (
    <ProductClient/>
  )
}
