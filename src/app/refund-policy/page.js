import PrivacyPolicyClient from './RefundPolicyClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Refund Policy | Hindustan Drones",
  description: "Read how Hindustan Drones collects, uses and protects personal information across its website, services and customer enquiries.",
  alternates: {
    canonical: `${baseUrl}/refund-policy`,
  },
}

export default function page() {
  return <PrivacyPolicyClient />
}
