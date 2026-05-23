import AgriflowHds40Client from './AgriflowHds40Client'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "AgriFlow HDS40 | Agriculture Spraying Drone",
  description: "40L agriculture drone for precision spraying, spreading and crop operations with smart flight control and reliable field performance.",
  alternates: {
    canonical: `${baseUrl}/products/agriflow-hds40`,
  },
}

export default function page() {
  return <AgriflowHds40Client />
}
