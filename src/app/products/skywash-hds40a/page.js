import SkywashHds40aClient from './SkywashHds40aClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "SkyWash HDS40A | High-Rise Cleaning Drone",
  description: "High-rise cleaning drone designed for safe, consistent facade and exterior maintenance across tall buildings and structures.",
  alternates: {
    canonical: `${baseUrl}/products/skywash-hds40a`,
  },
}

export default function page() {
  return <SkywashHds40aClient />
}
