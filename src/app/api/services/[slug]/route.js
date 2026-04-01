import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = await params

    const service = await prisma.service.findUnique({ where: { slug } })
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Fetch products that are selected for this service
    const selectedIds = Array.isArray(service.selectedProductIds)
      ? service.selectedProductIds.map(Number).filter(Boolean)
      : []

    let products = []
    if (selectedIds.length > 0) {
      products = await prisma.product.findMany({
        where: { id: { in: selectedIds } },
      })
    }

    return NextResponse.json({ ...service, products })
  } catch (err) {
    console.error('[Public Services GET]', err)
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}
