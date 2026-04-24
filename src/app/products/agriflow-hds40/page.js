import AgriflowHds40Client from './AgriflowHds40Client'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "AgriFlow HDS40 | Hindustan Drone Services",
  description: "Our AgriFlow HDS40 is designed to simplify and scale modern farming operations with precision and consistency. Built for demanding field conditions, we ensure efficient coverage, reduced manual effort, and reliable performance across large agricultural landscapes.",
  alternates: {
    canonical: `${baseUrl}/products/agriflow-hds40`,
  },
}

export default function page() {
  return <AgriflowHds40Client />
}
