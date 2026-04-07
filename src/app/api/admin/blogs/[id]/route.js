import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs'

function blogUploadDir(slug) {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'blogs', slug)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

async function saveFile(file, dir) {
  const ext      = file.name.split('.').pop().toLowerCase()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer   = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(path.join(dir, filename), buffer)
  return filename
}

export async function GET(_request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    const blog = await prisma.blogPost.findUnique({
      where: { id },
      include: { categories: true },
    })
    if (!blog) return NextResponse.json({ error: 'Blog not found.' }, { status: 404 })
    return NextResponse.json(blog)
  } catch (err) {
    console.error('[Admin Blog GET]', err)
    return NextResponse.json({ error: 'Failed to fetch blog.' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)

    const formData = await request.formData()

    const title            = formData.get('title')?.toString().trim()
    const slug             = formData.get('slug')?.toString().trim()
    const shortDescription = formData.get('shortDescription')?.toString().trim() || ''
    const content          = formData.get('content')?.toString() || ''
    const author           = formData.get('author')?.toString().trim() || 'Hindustan Drones'
    const rawTags          = formData.get('tags')?.toString() || '[]'
    const rawCategories    = formData.get('categories')?.toString() || '[]'
    const keepImage        = formData.get('keepImage')?.toString()

    const seoMetaTitle       = formData.get('seoMetaTitle')?.toString().trim()       || null
    const seoMetaDescription = formData.get('seoMetaDescription')?.toString().trim() || null
    const seoMetaKeywords    = formData.get('seoMetaKeywords')?.toString().trim()    || null
    const seoOgTitle         = formData.get('seoOgTitle')?.toString().trim()         || null
    const seoOgDescription   = formData.get('seoOgDescription')?.toString().trim()   || null
    const seoOgImage         = formData.get('seoOgImage')?.toString().trim()         || null
    const seoCanonicalUrl    = formData.get('seoCanonicalUrl')?.toString().trim()    || null

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 })
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: 'A blog with this slug already exists.' }, { status: 409 })
    }

    const tags        = JSON.parse(rawTags)
    const categoryIds = JSON.parse(rawCategories).map((i) => parseInt(i))

    const current = await prisma.blogPost.findUnique({ where: { id } })

    const dir = blogUploadDir(slug)
    let featuredImage = keepImage || current?.featuredImage || ''
    const imgFile = formData.get('featuredImage')
    if (imgFile && imgFile.size > 0) {
      const fn = await saveFile(imgFile, dir)
      featuredImage = `/uploads/blogs/${slug}/${fn}`
    }

    const blog = await prisma.blogPost.update({
      where: { id },
      data: {
        title, slug, shortDescription, content, author,
        featuredImage,
        tags,
        categories: {
          set:     [],
          connect: categoryIds.map((cid) => ({ id: cid })),
        },
        seoMetaTitle, seoMetaDescription, seoMetaKeywords,
        seoOgTitle, seoOgDescription, seoOgImage, seoCanonicalUrl,
      },
    })

    return NextResponse.json(blog)
  } catch (err) {
    console.error('[Admin Blog PUT]', err)
    return NextResponse.json({ error: 'Failed to update blog.' }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    await prisma.blogPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Admin Blog DELETE]', err)
    return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 })
  }
}
