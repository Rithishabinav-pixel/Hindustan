import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 })

    const { name } = await request.json()
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Category name is required.' }, { status: 400 })
    }

    const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const existing = await prisma.blogCategory.findUnique({ where: { slug } })
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: 'A category with this name already exists.' }, { status: 409 })
    }

    const category = await prisma.blogCategory.update({
      where: { id },
      data:  { name: name.trim(), slug },
    })
    return NextResponse.json({ success: true, data: category })
  } catch (err) {
    console.error('[Admin Category PUT]', err)
    return NextResponse.json({ error: 'Failed to update category.' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 })

    await prisma.blogCategory.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Admin Category DELETE]', err)
    return NextResponse.json({ error: 'Failed to delete category.' }, { status: 500 })
  }
}
