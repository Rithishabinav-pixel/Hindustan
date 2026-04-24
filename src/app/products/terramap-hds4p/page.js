import TerramapHds4pClient from './TerramapHds4pClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "TerraMap HDS4P | Hindustan Drone Services",
  description: "At HDSL, we leverage the TerraMap HDS4P for high-accuracy aerial mapping and geospatial data capture. Integrated with a professional imaging system and advanced flight performance, our drones enable smooth data acquisition for 3D digital twins, terrain models, and volumetric analysis.",
  alternates: {
    canonical: `${baseUrl}/products/terramap-hds4p`,
  },
}

export default function page() {
  return <TerramapHds4pClient />
}
