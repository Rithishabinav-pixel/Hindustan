import PrivacyPolicyClient from './PrivacyPolicyClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Privacy Policy | Hindustan Drones",
  description: "Read how Hindustan Drones collects, uses and protects personal information across its website, services and customer enquiries.",
  alternates: {
    canonical: `${baseUrl}/privacy-policy`,
  },
}

export default function page() {
  return <PrivacyPolicyClient />
}
