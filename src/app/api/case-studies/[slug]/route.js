import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = await params

    const caseStudy = await prisma.caseStudyPost.findUnique({
      where: { slug },
      include: { categories: true },
    })

    if (!caseStudy) return NextResponse.json({ error: 'Case study not found.' }, { status: 404 })

    // Latest 5 case studies (excluding current)
    const latest = await prisma.caseStudyPost.findMany({
      where: { slug: { not: slug } },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, featuredImage: true, shortDescription: true },
    })

    // Previous (older)
    const prev = await prisma.caseStudyPost.findFirst({
      where: { publishedAt: { lt: caseStudy.publishedAt } },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true },
    })

    // Next (newer)
    const next = await prisma.caseStudyPost.findFirst({
      where: { publishedAt: { gt: caseStudy.publishedAt } },
      orderBy: { publishedAt: 'asc' },
      select: { slug: true, title: true },
    })

    return NextResponse.json({ caseStudy, latest, prev, next })
  } catch (err) {
    console.error('[Case Study Detail GET]', err)
    return NextResponse.json({ error: 'Failed to fetch case study.' }, { status: 500 })
  }
}
