import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Returns all unique tags across all blog posts
export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      select: { tags: true },
    })
    const tagSet = new Set()
    for (const blog of blogs) {
      if (Array.isArray(blog.tags)) {
        blog.tags.forEach((t) => { if (t) tagSet.add(t) })
      }
    }
    return NextResponse.json([...tagSet].sort())
  } catch (err) {
    console.error('[Admin Tags GET]', err)
    return NextResponse.json({ error: 'Failed to fetch tags.' }, { status: 500 })
  }
}
