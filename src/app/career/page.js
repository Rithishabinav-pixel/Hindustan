import CareerClient from './CareerClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Careers at Hindustan Drones",
  description: "Explore career opportunities at Hindustan Drones in UAV operations, engineering, analytics and emerging aerial technologies.",
  alternates: {
    canonical: `${baseUrl}/career`,
  },
}

export default function page() {
  return <CareerClient />
}
