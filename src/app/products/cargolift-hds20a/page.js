import CargoliftHds20aClient from './CargoliftHds20aClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "CargoLift HDS20A | Delivery Drone",
  description: "Heavy-payload delivery drone built for reliable aerial logistics, remote supply missions and critical transport operations.",
  alternates: {
    canonical: `${baseUrl}/products/cargolift-hds20a`,
  },
}

export default function page() {
  return <CargoliftHds20aClient />
}
