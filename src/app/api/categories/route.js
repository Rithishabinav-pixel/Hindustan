import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(categories)
  } catch (err) {
    console.error('[Categories GET]', err)
    return NextResponse.json({ error: 'Failed to fetch categories.' }, { status: 500 })
  }
}
