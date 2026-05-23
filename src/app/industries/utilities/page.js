import UtilitiesClient from './UtilitiesClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Utilities Drone Solutions | Hindustan Drones",
  description: "Monitor solar, wind, power and grid assets with drone inspections that improve reliability, safety and maintenance planning.",
  alternates: {
   canonical: `${baseUrl}/industries/transportation`,
  },
}

export default function page() {
  return <UtilitiesClient />
}
