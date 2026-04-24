import DroneManufactureClient from './DroneManufactureClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "VigilCore M4TD | Hindustan Drone Services",
  description: "VigilCore M4TD is engineered as a rugged enterprise drone platform combining high-resolution visual and thermal imaging with intelligent navigation systems. Built for demanding inspection, safety, and emergency missions, it provides clear thermal data, precision measurement, and extended operational reach.",
  alternates: {
    canonical: `${baseUrl}/products/vigilcore-m4td`,
  },
}

export default function page() {
  return <DroneManufactureClient />
}
