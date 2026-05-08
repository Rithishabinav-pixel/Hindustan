import HomeClient from './HomeClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Drone Services in India | Hindustan Drones",
  description: "Explore drone services, products, training, inspections, mapping, agriculture, security and AI analytics solutions across India.",
  alternates: {
    canonical: `${baseUrl}`,
  },
}

export default function page() {
  return <HomeClient />
}
