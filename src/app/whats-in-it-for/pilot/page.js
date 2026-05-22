import PilotClient from './PilotClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Pilot Opportunities | Earn More With Flexible Deliveries",
  description: "Explore flexible earning opportunities for pilots with efficient delivery assignments, reliable payouts, and technology-driven logistics support.",
  alternates: {
    canonical: `${baseUrl}/whats-in-it-for/pilot`,
  },
}

export default function page() {
  return <PilotClient />
}
