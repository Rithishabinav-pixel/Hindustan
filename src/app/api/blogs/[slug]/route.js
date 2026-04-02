import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = await params

    const blog = await prisma.blogPost.findUnique({
      where: { slug },
      include: { categories: true },
    })

    if (!blog) return NextResponse.json({ error: 'Blog not found.' }, { status: 404 })

    // Latest 5 blogs (excluding current)
    const latest = await prisma.blogPost.findMany({
      where: { slug: { not: slug } },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, featuredImage: true, shortDescription: true },
    })

    // Previous blog (older)
    const prev = await prisma.blogPost.findFirst({
      where: { publishedAt: { lt: blog.publishedAt } },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true },
    })

    // Next blog (newer)
    const next = await prisma.blogPost.findFirst({
      where: { publishedAt: { gt: blog.publishedAt } },
      orderBy: { publishedAt: 'asc' },
      select: { slug: true, title: true },
    })

    return NextResponse.json({ blog, latest, prev, next })
  } catch (err) {
    console.error('[Blog Detail GET]', err)
    return NextResponse.json({ error: 'Failed to fetch blog.' }, { status: 500 })
  }
}
