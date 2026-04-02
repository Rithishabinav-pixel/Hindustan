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

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id:          true,
        title:       true,
        slug:        true,
        publishedAt: true,
        categories:  { select: { id: true, name: true } },
      },
    })
    return NextResponse.json(blogs)
  } catch (err) {
    console.error('[Admin Blogs GET]', err)
    return NextResponse.json({ error: 'Failed to fetch blogs.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()

    const title            = formData.get('title')?.toString().trim()
    const slug             = formData.get('slug')?.toString().trim()
    const shortDescription = formData.get('shortDescription')?.toString().trim() || ''
    const content          = formData.get('content')?.toString() || ''
    const author           = formData.get('author')?.toString().trim() || 'Hindustan Drones'
    const rawTags          = formData.get('tags')?.toString() || '[]'
    const rawCategories    = formData.get('categories')?.toString() || '[]'

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
    if (existing) {
      return NextResponse.json({ error: 'A blog with this slug already exists.' }, { status: 409 })
    }

    const tags        = JSON.parse(rawTags)
    const categoryIds = JSON.parse(rawCategories).map((id) => parseInt(id))

    const dir = blogUploadDir(slug)
    let featuredImage = ''
    const imgFile = formData.get('featuredImage')
    if (imgFile && imgFile.size > 0) {
      const fn = await saveFile(imgFile, dir)
      featuredImage = `/uploads/blogs/${slug}/${fn}`
    }

    const blog = await prisma.blogPost.create({
      data: {
        title, slug, shortDescription, content, author,
        featuredImage,
        tags,
        publishedAt: new Date(),
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        seoMetaTitle, seoMetaDescription, seoMetaKeywords,
        seoOgTitle, seoOgDescription, seoOgImage, seoCanonicalUrl,
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (err) {
    console.error('[Admin Blogs POST]', err)
    return NextResponse.json({ error: 'Failed to create blog.' }, { status: 500 })
  }
}
