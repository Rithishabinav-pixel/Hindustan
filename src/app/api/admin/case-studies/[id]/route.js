import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs'

function uploadDir(slug) {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'case-studies', slug)
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
    const caseStudy = await prisma.caseStudyPost.findUnique({
      where: { id },
      include: { categories: true },
    })
    if (!caseStudy) return NextResponse.json({ error: 'Case study not found.' }, { status: 404 })
    return NextResponse.json(caseStudy)
  } catch (err) {
    console.error('[Admin Case Study GET]', err)
    return NextResponse.json({ error: 'Failed to fetch case study.' }, { status: 500 })
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

    const existing = await prisma.caseStudyPost.findUnique({ where: { slug } })
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: 'A case study with this slug already exists.' }, { status: 409 })
    }

    const tags        = JSON.parse(rawTags)
    const categoryIds = JSON.parse(rawCategories).map((i) => parseInt(i))

    const current = await prisma.caseStudyPost.findUnique({ where: { id } })

    const dir = uploadDir(slug)
    let featuredImage = keepImage || current?.featuredImage || ''
    const imgFile = formData.get('featuredImage')
    if (imgFile && imgFile.size > 0) {
      const fn = await saveFile(imgFile, dir)
      featuredImage = `/uploads/case-studies/${slug}/${fn}`
    }

    const caseStudy = await prisma.caseStudyPost.update({
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

    return NextResponse.json(caseStudy)
  } catch (err) {
    console.error('[Admin Case Study PUT]', err)
    return NextResponse.json({ error: 'Failed to update case study.' }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id: rawId } = await params
    const id = parseInt(rawId)
    await prisma.caseStudyPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Admin Case Study DELETE]', err)
    return NextResponse.json({ error: 'Failed to delete case study.' }, { status: 500 })
  }
}
