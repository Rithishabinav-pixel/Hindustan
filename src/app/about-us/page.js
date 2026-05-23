import AboutClient from './AboutClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "About Hindustan Drones | UAV Solutions Company",
  description: "Learn about Hindustan Drones, our mission, leadership, certifications and advanced UAV solutions for industries across India.",
  alternates: {
    canonical: `${baseUrl}/about-us`,
  },
}

export default function page() {
  return <AboutClient />
}
