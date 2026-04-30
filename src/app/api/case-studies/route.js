import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page     = Math.max(1, parseInt(searchParams.get('page')  || '1'))
    const limit    = Math.max(1, parseInt(searchParams.get('limit') || '9'))
    const search   = searchParams.get('search')?.trim()   || ''
    const tag      = searchParams.get('tag')?.trim()      || ''
    const category = searchParams.get('category')?.trim() || ''

    const where = {}

    if (search) {
      where.OR = [
        { title:            { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (tag) {
      where.tags = { array_contains: [tag] }
    }

    if (category) {
      where.categories = { some: { slug: category } }
    }

    const [caseStudies, total] = await Promise.all([
      prisma.caseStudyPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip:  (page - 1) * limit,
        take:  limit,
        select: {
          id:               true,
          title:            true,
          slug:             true,
          shortDescription: true,
          featuredImage:    true,
          author:           true,
          publishedAt:      true,
          tags:             true,
          categories: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.caseStudyPost.count({ where }),
    ])

    return NextResponse.json({ caseStudies, total, page, limit, hasMore: page * limit < total })
  } catch (err) {
    console.error('[Case Studies GET]', err)
    return NextResponse.json({ error: 'Failed to fetch case studies.' }, { status: 500 })
  }
}
