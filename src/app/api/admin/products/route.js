import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const name = formData.get('name')?.toString()
    const link = formData.get('link')?.toString()
    const imageFile = formData.get('image')

    if (!name || !link || !imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { error: 'Name, link, and image are required' },
        { status: 400 }
      )
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    fs.mkdirSync(uploadDir, { recursive: true })

    const ext = imageFile.name.split('.').pop().toLowerCase()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    fs.writeFileSync(path.join(uploadDir, filename), buffer)

    const slug = formData.get('slug')?.toString().trim() || toSlug(name.trim())

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug,
        image: `/uploads/products/${filename}`,
        link: link.trim(),
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
