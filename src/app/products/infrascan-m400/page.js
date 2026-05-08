import InfrascanM400Client from './InfrascanM400Client'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "InfraScan M400 | Industrial Inspection Drone",
  description: "Industrial drone platform for inspections, mapping, public safety and infrastructure monitoring with long endurance and payload support.",
  alternates: {
    canonical: `${baseUrl}/products/infrascan-m400`,
  },
}

export default function page() {
  return <InfrascanM400Client />
}
