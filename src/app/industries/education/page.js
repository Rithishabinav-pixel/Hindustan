import EducationClient from './EducationClient'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Drone Education Solutions | Hindustan Drones",
  description: "Build drone education programs with training, labs, certification pathways and research support for institutions and students.",
  alternates: {
    canonical: `${baseUrl}/industries/education`,
  },
}

export default function page() {
  return <EducationClient />
}
