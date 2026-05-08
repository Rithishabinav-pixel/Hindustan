import AgricultureClient from './AgricultureClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Agriculture Drone Solutions | Hindustan Drones",
  description: "Precision drone solutions for crop monitoring, spraying, field mapping and smarter farm operations with better efficiency and visibility.",
  alternates: {
    canonical: `${baseUrl}/industries/agriculture`,
  },
}

export default function page() {
  return <AgricultureClient />
}
