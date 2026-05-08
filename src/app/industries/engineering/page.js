import EngineeringClient from './EngineeringClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Engineering Drone Solutions | Hindustan Drones",
  description: "Get high-accuracy drone surveying, mapping, contouring and volumetric data for faster engineering planning and execution.",
  alternates: {
   canonical: `${baseUrl}/industries/engineering`,
  },
}

export default function page() {
  return <EngineeringClient />
}
