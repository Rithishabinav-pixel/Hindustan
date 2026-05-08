import TransportationClient from './TransportationClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Transportation Drone Solutions | Hindustan Drones",
  description: "Inspect roads, bridges, rail and transport infrastructure faster with drone data that improves visibility, safety and maintenance planning.",
  alternates: {
    canonical: `${baseUrl}/industries/transportation`,
  },
}

export default function page() {
  return <TransportationClient />
}
