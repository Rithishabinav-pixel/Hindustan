import SkywashHds40aClient from './SkywashHds40aClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "SkyWash HDS40A | Hindustan Drone Services",
  description: "At HDSL, we understand that maintaining high-rise structures comes with significant access challenges, safety risks, and operational complexities. With the SkyWash HDS40A, we've designed an aerial cleaning approach tailored for vertical environments.",
  alternates: {
    canonical: `${baseUrl}/products/skywash-hds40a`,
  },
}

export default function page() {
  return <SkywashHds40aClient />
}
