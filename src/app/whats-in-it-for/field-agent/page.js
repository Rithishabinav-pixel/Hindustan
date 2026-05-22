import FieldAgentClient from './FieldAgentClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Field Agent Benefits | Smart & Efficient Delivery Operations",
  description: "See how field agents can simplify delivery operations with smart tools, optimized routes, real-time updates, and improved productivity.",
  alternates: {
    canonical: `${baseUrl}/whats-in-it-for/field-agent`,
  },
}

export default function page() {
  return <FieldAgentClient />
}
