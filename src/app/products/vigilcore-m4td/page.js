import VigilcoreM4tdClient from './VigilcoreM4tdClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "VigilCore M4TD | Thermal Inspection Drone",
  description: "Thermal inspection drone for high-risk missions, industrial safety, emergency response and detailed visual intelligence.",
  alternates: {
    canonical: `${baseUrl}/products/vigilcore-m4td`,
  },
}

export default function page() {
  return <VigilcoreM4tdClient />
}
