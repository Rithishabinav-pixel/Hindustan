import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs'

// ─── helpers ────────────────────────────────────────────────────────────────

function uploadDir(slug) {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'services', slug)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

async function saveFileAsync(file, dir) {
  const ext = file.name.split('.').pop().toLowerCase()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(path.join(dir, filename), buffer)
  return filename
}

// ─── GET — list all services ─────────────────────────────────────────────────

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, slug: true, createdAt: true },
    })
    return NextResponse.json(services)
  } catch (err) {
    console.error('[Services GET]', err)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

// ─── POST — create service ───────────────────────────────────────────────────

export async function POST(request) {
  try {
    const formData = await request.formData()

    const name = formData.get('name')?.toString().trim()
    const slug = formData.get('slug')?.toString().trim()

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    // Check slug uniqueness
    const existing = await prisma.service.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const dir = uploadDir(slug)

    // ── hero ──
    const heroTitle       = formData.get('heroTitle')?.toString() ?? ''
    const heroDescription = formData.get('heroDescription')?.toString() ?? ''
    const heroButtonName  = formData.get('heroButtonName')?.toString() ?? ''
    const heroButtonLink  = formData.get('heroButtonLink')?.toString() ?? ''
    let heroImage = ''
    const heroImageFile = formData.get('heroImage')
    if (heroImageFile && heroImageFile.size > 0) {
      const fn = await saveFileAsync(heroImageFile, dir)
      heroImage = `/uploads/services/${slug}/${fn}`
    }

    // ── sub-services ──
    const subServicesTitle = formData.get('subServicesTitle')?.toString() ?? ''
    const rawSubItems = formData.get('subServicesItemsData')
    let subServicesItems = rawSubItems ? JSON.parse(rawSubItems) : []
    for (let i = 0; i < subServicesItems.length; i++) {
      const imgFile = formData.get(`subServicesItem_${i}_image`)
      if (imgFile && imgFile.size > 0) {
        const fn = await saveFileAsync(imgFile, dir)
        subServicesItems[i].image = `/uploads/services/${slug}/${fn}`
      } else {
        subServicesItems[i].image = subServicesItems[i].image ?? ''
      }
    }

    // ── benefits ──
    const benefitsTitle       = formData.get('benefitsTitle')?.toString() ?? ''
    const benefitsDescription = formData.get('benefitsDescription')?.toString() ?? ''
    let benefitsBgDesktop = ''
    let benefitsBgMobile  = ''
    const bgDesktopFile = formData.get('benefitsBgDesktop')
    const bgMobileFile  = formData.get('benefitsBgMobile')
    if (bgDesktopFile && bgDesktopFile.size > 0) {
      const fn = await saveFileAsync(bgDesktopFile, dir)
      benefitsBgDesktop = `/uploads/services/${slug}/${fn}`
    }
    if (bgMobileFile && bgMobileFile.size > 0) {
      const fn = await saveFileAsync(bgMobileFile, dir)
      benefitsBgMobile = `/uploads/services/${slug}/${fn}`
    }
    const rawBenefitItems = formData.get('benefitsItemsData')
    let benefitsItems = rawBenefitItems ? JSON.parse(rawBenefitItems) : []
    for (let i = 0; i < benefitsItems.length; i++) {
      const iconFile = formData.get(`benefitsItem_${i}_icon`)
      if (iconFile && iconFile.size > 0) {
        const fn = await saveFileAsync(iconFile, dir)
        benefitsItems[i].icon = `/uploads/services/${slug}/${fn}`
      } else {
        benefitsItems[i].icon = benefitsItems[i].icon ?? ''
      }
    }

    // ── products ──
    const productsTitle       = formData.get('productsTitle')?.toString() ?? ''
    const productsDescription = formData.get('productsDescription')?.toString() ?? ''
    const rawProductIds = formData.get('selectedProductIds')
    const selectedProductIds = rawProductIds ? JSON.parse(rawProductIds) : []

    // ── faq ──
    const faqTitle = formData.get('faqTitle')?.toString() ?? ''
    const rawFaqItems = formData.get('faqItemsData')
    const faqItems = rawFaqItems ? JSON.parse(rawFaqItems) : []

    // ── seo ──
    const seoMetaTitle       = formData.get('seoMetaTitle')?.toString() ?? ''
    const seoMetaDescription = formData.get('seoMetaDescription')?.toString() ?? ''
    const seoMetaKeywords    = formData.get('seoMetaKeywords')?.toString() ?? ''
    const seoOgTitle         = formData.get('seoOgTitle')?.toString() ?? ''
    const seoOgDescription   = formData.get('seoOgDescription')?.toString() ?? ''
    const seoCanonicalUrl    = formData.get('seoCanonicalUrl')?.toString() ?? ''
    let seoOgImage = ''
    const seoOgImageFile = formData.get('seoOgImage')
    if (seoOgImageFile && seoOgImageFile.size > 0) {
      const fn = await saveFileAsync(seoOgImageFile, dir)
      seoOgImage = `/uploads/services/${slug}/${fn}`
    }

    const service = await prisma.service.create({
      data: {
        name, slug,
        heroTitle, heroDescription, heroButtonName, heroButtonLink, heroImage,
        subServicesTitle, subServicesItems,
        benefitsTitle, benefitsDescription, benefitsBgDesktop, benefitsBgMobile, benefitsItems,
        productsTitle, productsDescription, selectedProductIds,
        faqTitle, faqItems,
        seoMetaTitle, seoMetaDescription, seoMetaKeywords,
        seoOgTitle, seoOgDescription, seoOgImage, seoCanonicalUrl,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (err) {
    console.error('[Services POST]', err)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
