import DroneManufactureClient from './DroneManufactureClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Drone Manufacturing Services | Hindustan Drones",
  description: "Design, assemble and maintain advanced drone systems with integrated payloads, lifecycle support and reliable supply services.",
  alternates: {
    canonical: `${baseUrl}/technology/drone-manufacturing-assembly-services`,
  },
}

export default function page() {
  return <DroneManufactureClient />
}
