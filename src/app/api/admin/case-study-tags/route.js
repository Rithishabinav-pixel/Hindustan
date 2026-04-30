import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Returns all unique tags across all case study posts
export async function GET() {
  try {
    const caseStudies = await prisma.caseStudyPost.findMany({
      select: { tags: true },
    })
    const tagSet = new Set()
    for (const cs of caseStudies) {
      if (Array.isArray(cs.tags)) {
        cs.tags.forEach((t) => { if (t) tagSet.add(t) })
      }
    }
    return NextResponse.json([...tagSet].sort())
  } catch (err) {
    console.error('[Admin Case Study Tags GET]', err)
    return NextResponse.json({ error: 'Failed to fetch tags.' }, { status: 500 })
  }
}
