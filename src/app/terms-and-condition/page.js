import TermsConditionClient from './TermsConditionClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Terms & Conditions | Hindustan Drones",
  description: "Review the terms and conditions governing the use of Hindustan Drones website, services, products and communications.",
  alternates: {
    canonical: `${baseUrl}/terms-and-condition`,
  },
}

export default function page() {
  return <TermsConditionClient />
}
