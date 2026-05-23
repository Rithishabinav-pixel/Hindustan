import ConstructionClient from './ConstructionClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Construction Drone Solutions | Hindustan Drones",
  description: "Track progress, improve site visibility and create 3D maps with drone solutions for construction monitoring, safety and reporting.",
  alternates: {
    canonical: `${baseUrl}/industries/construction`,
  },
}

export default function page() {
  return <ConstructionClient />
}
