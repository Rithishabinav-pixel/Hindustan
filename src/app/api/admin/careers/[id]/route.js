import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    const career = await prisma.career.findUnique({ where: { id } })
    if (!career) return NextResponse.json({ error: 'Career not found.' }, { status: 404 })
    return NextResponse.json(career)
  } catch (error) {
    console.error('[Admin] Failed to fetch career:', error)
    return NextResponse.json({ error: 'Failed to fetch career.' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    const body = await request.json()
    const { jobTitle, location, experience, remuneration, slug, details } = body

    if (!jobTitle?.trim() || !location?.trim() || !experience?.trim() || !remuneration?.trim() || !slug?.trim()) {
      return NextResponse.json({ error: 'Job title, location, experience, remuneration, and slug are required.' }, { status: 400 })
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, '-')

    const existing = await prisma.career.findUnique({ where: { slug: cleanSlug } })
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: 'A career with this slug already exists.' }, { status: 409 })
    }

    const career = await prisma.career.update({
      where: { id },
      data: {
        jobTitle:     jobTitle.trim(),
        location:     location.trim(),
        experience:   experience.trim(),
        remuneration: remuneration.trim(),
        slug:         cleanSlug,
        details:      details || [],
      },
    })

    return NextResponse.json(career)
  } catch (error) {
    console.error('[Admin] Failed to update career:', error)
    return NextResponse.json({ error: 'Failed to update career.' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    await prisma.career.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Admin] Failed to delete career:', error)
    return NextResponse.json({ error: 'Failed to delete career.' }, { status: 500 })
  }
}
