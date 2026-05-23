import TerramapHds4pClient from './TerramapHds4pClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "TerraMap HDS4P | Surveying & Mapping Drone",
  description: "Professional mapping drone for surveys, 3D models, topography, volumetrics and infrastructure intelligence.",
  alternates: {
    canonical: `${baseUrl}/products/terramap-hds4p`,
  },
}

export default function page() {
  return <TerramapHds4pClient />
}
