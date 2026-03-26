import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs'

export async function PUT(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    const formData = await request.formData()
    const name = formData.get('name')?.toString()
    const link = formData.get('link')?.toString()
    const imageFile = formData.get('image')

    if (!name || !link) {
      return NextResponse.json(
        { error: 'Name and link are required' },
        { status: 400 }
      )
    }

    const updateData = { name: name.trim(), link: link.trim() }

    if (imageFile && imageFile.size > 0) {
      // Delete old image
      const existing = await prisma.product.findUnique({ where: { id } })
      if (existing?.image) {
        const oldPath = path.join(process.cwd(), 'public', existing.image)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
      fs.mkdirSync(uploadDir, { recursive: true })

      const ext = imageFile.name.split('.').pop().toLowerCase()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      fs.writeFileSync(path.join(uploadDir, filename), buffer)

      updateData.image = `/uploads/products/${filename}`
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)

    const product = await prisma.product.findUnique({ where: { id } })
    if (product?.image) {
      const imagePath = path.join(process.cwd(), 'public', product.image)
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
    }

    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
