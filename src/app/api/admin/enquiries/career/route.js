import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const enquiries = await prisma.careerEnquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(enquiries)
  } catch (error) {
    console.error('[Admin] Failed to fetch career enquiries:', error)
    return NextResponse.json({ error: 'Failed to fetch career enquiries.' }, { status: 500 })
  }
}
