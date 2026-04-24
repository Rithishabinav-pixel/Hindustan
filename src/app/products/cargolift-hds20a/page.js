import CargoliftHds20aClient from './CargoliftHds20aClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "CargoLift HDS20A | Hindustan Drone Services",
  description: "We've engineered the CargoLift HDS20A to handle demanding transport missions with high payload capacity and precision control. Equipped with advanced RTK positioning, obstacle avoidance, and a robust folding design, our drone ensures efficient deliveries, even across complex terrains.",
  alternates: {
    canonical: `${baseUrl}/products/cargolift-hds20a`,
  },
}

export default function page() {
  return <CargoliftHds20aClient />
}
