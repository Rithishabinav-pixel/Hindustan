import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(careers)
  } catch (error) {
    console.error('[Admin] Failed to fetch careers:', error)
    return NextResponse.json({ error: 'Failed to fetch careers.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { jobTitle, location, experience, remuneration, slug, details } = body

    if (!jobTitle?.trim() || !location?.trim() || !experience?.trim() || !remuneration?.trim() || !slug?.trim()) {
      return NextResponse.json({ error: 'Job title, location, experience, remuneration, and slug are required.' }, { status: 400 })
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, '-')

    const existing = await prisma.career.findUnique({ where: { slug: cleanSlug } })
    if (existing) {
      return NextResponse.json({ error: 'A career with this slug already exists.' }, { status: 409 })
    }

    const career = await prisma.career.create({
      data: {
        jobTitle:     jobTitle.trim(),
        location:     location.trim(),
        experience:   experience.trim(),
        remuneration: remuneration.trim(),
        slug:         cleanSlug,
        details:      details || [],
      },
    })

    return NextResponse.json(career, { status: 201 })
  } catch (error) {
    console.error('[Admin] Failed to create career:', error)
    return NextResponse.json({ error: 'Failed to create career.' }, { status: 500 })
  }
}
