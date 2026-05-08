import OilAndGasClient from './OilAndGasClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Oil & Gas Drone Inspections | Hindustan Drones",
  description: "Inspect pipelines, flare stacks, tanks and refinery assets with safer, faster drone solutions for oil and gas operations.",
  alternates: {
    canonical: `${baseUrl}/industries/oil-and-gas`,
  },
}

export default function page() {
  return <OilAndGasClient />
}
