import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ success: true, data: categories })
  } catch (err) {
    console.error('[Admin Categories GET]', err)
    return NextResponse.json({ success: false, error: 'Failed to fetch categories.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json()
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Category name is required.' }, { status: 400 })
    }
    const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const existing = await prisma.blogCategory.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Category already exists.' }, { status: 409 })
    }
    const category = await prisma.blogCategory.create({
      data: { name: name.trim(), slug },
    })
    return NextResponse.json(category, { status: 201 })
  } catch (err) {
    console.error('[Admin Categories POST]', err)
    return NextResponse.json({ error: 'Failed to create category.' }, { status: 500 })
  }
}
