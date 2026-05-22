import CustomerClient from './CustomerClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Customer Benefits | Faster Deliveries & Better Service",
  description: "Discover how customers benefit from faster deliveries, real-time tracking, reliable service, and a seamless logistics experience tailored to their needs.",
  alternates: {
    canonical: `${baseUrl}/whats-in-it-for/customer`,
  },
}

export default function page() {
  return <CustomerClient />
}
