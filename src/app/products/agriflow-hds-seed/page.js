import AgriflowHdsSeedClient from './AgriflowHdsSeedClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "AgriFlow HDS Seed | Seeding Drone",
  description: "High-efficiency seeding drone for uniform seed and granular distribution across modern farms with faster coverage and less manual work.",
  alternates: {
    canonical: `${baseUrl}/products/agriflow-hds-seed`,
  }
};

export default function page() {
  return <AgriflowHdsSeedClient />
}
