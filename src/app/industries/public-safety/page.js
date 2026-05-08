import PublicSafetyClient from './PublicSafetyClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Public Safety Drone Solutions | Hindustan Drones",
  description: "Support law enforcement and emergency teams with drone surveillance, rapid assessment and better situational awareness.",
  alternates: {
    canonical: `${baseUrl}/industries/public-safety`,
  },
}

export default function page() {
  return <PublicSafetyClient />
}
