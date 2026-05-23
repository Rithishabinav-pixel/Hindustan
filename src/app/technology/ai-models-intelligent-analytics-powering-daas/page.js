import AIModelsTechClient from "./AIModelsTechClient";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "AI Analytics for DaaS | Hindustan Drones",
  description: "Turn aerial imagery, thermal data and LiDAR into actionable insights with AI models built for analytics, detection and digital twins.",
  alternates: {
    canonical: `${baseUrl}/technology/ai-models-intelligent-analytics-powering-daas`,
  },
}

export default function page() {
  return <AIModelsTechClient />
}
