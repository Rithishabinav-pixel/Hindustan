import TrainingClient from './TrainingClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Drone Training in India | Hindustan Drones",
  description: "Join professional drone training programs for mapping, inspections, aerial filming and operations. Build practical UAV skills with experts.",
  alternates: {
    canonical: `${baseUrl}/training`,
  },
}

export default function page() {
  return <TrainingClient />
}
