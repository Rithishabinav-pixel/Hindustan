import InfrascanM400Client from './InfrascanM400Client'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "InfraScan M400 | Hindustan Drone Services",
  description: "At HDSL, we provide the InfraScan M400, a rugged enterprise drone platform engineered for high-demand industrial missions. Designed for extended flight endurance and heavy-lift capabilities, it supports multiple sensor and payload configurations, making it ideal for inspections, mapping, public safety, and infrastructure monitoring.",
  alternates: {
    canonical: `${baseUrl}/products/infrascan-m400`,
  },
}

export default function page() {
  return <InfrascanM400Client />
}
