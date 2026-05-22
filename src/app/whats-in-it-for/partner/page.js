import PartnerClient from './PartnerClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Partner With Us | Grow Your Logistics Business",
  description: "Learn how our partnership program helps businesses expand operations, increase revenue, access new opportunities, and streamline logistics management.",
  alternates: {
    canonical: `${baseUrl}/whats-in-it-for/partner`,
  },
}

export default function page() {
  return <PartnerClient />
}
