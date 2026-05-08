import SolarshineHds40bClient from './SolarshineHds40bClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "SolarShine HDS40B | Solar Cleaning Drone",
  description: "Solar panel cleaning drone for efficient aerial maintenance, consistent cleaning and improved energy output across large plants.",
  alternates: {
    canonical: `${baseUrl}/products/solarshine-hds40b`,
  },
}

export default function page() {
  return <SolarshineHds40bClient />
}
