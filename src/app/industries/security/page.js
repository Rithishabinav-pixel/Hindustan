import SecurityClient from './SecurityClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Security Drone Solutions | Hindustan Drones",
  description: "Strengthen perimeter security with AI-powered drone patrols, threat detection, thermal imaging and real-time alerts.",
  alternates: {
    canonical: `${baseUrl}/industries/security`,
  },
}

export default function page() {
  return <SecurityClient />
}
