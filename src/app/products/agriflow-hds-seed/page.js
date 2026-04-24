import AgriflowHdsSeedClient from './AgriflowHdsSeedClient'

export const metadata = {
  title: "AgriFlow HDS Seed | Hindustan Drone Services",
  description: "Advanced drone-based seed spreading system designed for precision agriculture, high-efficiency field coverage, and optimized farming operations.",
  alternates: {
    canonical: "/products/agriflow-hds-seed"
  }
};

export default function page() {
  return <AgriflowHdsSeedClient />
}
