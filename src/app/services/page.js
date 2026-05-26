
import ServiceClient from './ServiceClient'
import { prisma } from '@/lib/prisma'



// ─── shared data fetcher ───────────────────────────────────────────────────

async function getService() {
  const service = await prisma.service.findMany();
  if (!service) return null
  return service
}




export default async function page() {

  const service = await getService()

  return (
    <ServiceClient allservice = {service}/>
  )
}
