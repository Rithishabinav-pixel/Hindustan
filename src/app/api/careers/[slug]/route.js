import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const career = await prisma.career.findUnique({
      where: { slug },
    })
    if (!career) return NextResponse.json({ error: 'Career not found.' }, { status: 404 })
    return NextResponse.json(career)
  } catch (error) {
    console.error('[Careers] Failed to fetch career:', error)
    return NextResponse.json({ error: 'Failed to fetch career.' }, { status: 500 })
  }
}
