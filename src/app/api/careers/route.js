import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id:           true,
        jobTitle:     true,
        location:     true,
        experience:   true,
        remuneration: true,
        slug:         true,
      },
    })
    return NextResponse.json(careers)
  } catch (error) {
    console.error('[Careers] Failed to fetch careers:', error)
    return NextResponse.json({ error: 'Failed to fetch careers.' }, { status: 500 })
  }
}
