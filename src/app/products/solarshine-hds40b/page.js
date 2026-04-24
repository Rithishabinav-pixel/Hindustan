import SolarshineHds40bClient from './SolarshineHds40bClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "SolarShine HDS40B | Hindustan Drone Services",
  description: "HDSL's SolarShine HDS40B is designed to simplify large-scale solar panel maintenance through efficient aerial cleaning and inspection. Our drone systems ensure consistent performance, enabling uniform cleaning across extensive installations while reducing manual effort and downtime.",
  alternates: {
    canonical: `${baseUrl}/products/solarshine-hds40b`,
  },
}

export default function page() {
  return <SolarshineHds40bClient />
}
