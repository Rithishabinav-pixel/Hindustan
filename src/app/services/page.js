
import ServiceClient from './ServiceClient'
import { prisma } from '@/lib/prisma'



// ─── shared data fetcher ───────────────────────────────────────────────────

async function getService() {
  const service = await prisma.service.findMany();
  if (!service) return null
  return service
}


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const metadata = {
  title: "Drone Services for Surveying, Inspection & Mapping | Hindustan Drones",
  description: "Explore Hindustan Drones’ advanced UAV services including aerial inspections, drone mapping, surveying, analytics, training, and intelligent drone solutions for industries across India.",
  alternates: {
    canonical: `${baseUrl}/services`,
  },
}


export default async function page() {

  const service = await getService()

  return (
    <ServiceClient allservice = {service}/>
  )
}
