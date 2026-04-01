import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import fs from 'fs'

// ─── GET — single service (for edit form) ─────────────────────────────────────

export async function GET(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(service)
  } catch (err) {
    console.error('[Services GET single]', err)
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function uploadDir(slug) {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'services', slug)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

async function saveFileAsync(file, dir, slug) {
  const ext = file.name.split('.').pop().toLowerCase()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(path.join(dir, filename), buffer)
  return `/uploads/services/${slug}/${filename}`
}

function deleteFile(publicPath) {
  if (!publicPath) return
  const abs = path.join(process.cwd(), 'public', publicPath)
  if (fs.existsSync(abs)) fs.unlinkSync(abs)
}

// ─── PUT — update service ─────────────────────────────────────────────────────

export async function PUT(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)

    const existing = await prisma.service.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const name = formData.get('name')?.toString().trim()
    const slug = formData.get('slug')?.toString().trim()

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    // Check slug uniqueness (allow same slug for same record)
    if (slug !== existing.slug) {
      const conflict = await prisma.service.findUnique({ where: { slug } })
      if (conflict) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
      }
    }

    // If slug changed, rename upload directory
    let dir
    if (slug !== existing.slug) {
      const oldDir = path.join(process.cwd(), 'public', 'uploads', 'services', existing.slug)
      const newDir = path.join(process.cwd(), 'public', 'uploads', 'services', slug)
      if (fs.existsSync(oldDir)) {
        fs.renameSync(oldDir, newDir)
        // Update all existing image paths to use new slug
        const updatePath = (p) => p ? p.replace(`/uploads/services/${existing.slug}/`, `/uploads/services/${slug}/`) : p
        existing.heroImage = updatePath(existing.heroImage)
        existing.benefitsBgDesktop = updatePath(existing.benefitsBgDesktop)
        existing.benefitsBgMobile = updatePath(existing.benefitsBgMobile)
        if (Array.isArray(existing.subServicesItems)) {
          existing.subServicesItems = existing.subServicesItems.map(i => ({ ...i, image: updatePath(i.image) }))
        }
        if (Array.isArray(existing.benefitsItems)) {
          existing.benefitsItems = existing.benefitsItems.map(i => ({ ...i, icon: updatePath(i.icon) }))
        }
      }
      dir = newDir
    }
    dir = uploadDir(slug)

    // ── hero ──
    const heroTitle       = formData.get('heroTitle')?.toString() ?? ''
    const heroDescription = formData.get('heroDescription')?.toString() ?? ''
    const heroButtonName  = formData.get('heroButtonName')?.toString() ?? ''
    const heroButtonLink  = formData.get('heroButtonLink')?.toString() ?? ''
    let heroImage = formData.get('heroImageExisting')?.toString() ?? existing.heroImage ?? ''
    const heroImageFile = formData.get('heroImage')
    if (heroImageFile && heroImageFile.size > 0) {
      deleteFile(existing.heroImage)
      heroImage = await saveFileAsync(heroImageFile, dir, slug)
    }

    // ── sub-services ──
    const subServicesTitle = formData.get('subServicesTitle')?.toString() ?? ''
    const rawSubItems = formData.get('subServicesItemsData')
    let subServicesItems = rawSubItems ? JSON.parse(rawSubItems) : []
    for (let i = 0; i < subServicesItems.length; i++) {
      const imgFile = formData.get(`subServicesItem_${i}_image`)
      if (imgFile && imgFile.size > 0) {
        // Delete old image for this item if it was from existing
        if (subServicesItems[i].existingImage) deleteFile(subServicesItems[i].existingImage)
        subServicesItems[i].image = await saveFileAsync(imgFile, dir, slug)
      } else {
        subServicesItems[i].image = subServicesItems[i].existingImage ?? subServicesItems[i].image ?? ''
      }
      delete subServicesItems[i].existingImage
    }

    // ── benefits ──
    const benefitsTitle       = formData.get('benefitsTitle')?.toString() ?? ''
    const benefitsDescription = formData.get('benefitsDescription')?.toString() ?? ''
    let benefitsBgDesktop = formData.get('benefitsBgDesktopExisting')?.toString() ?? existing.benefitsBgDesktop ?? ''
    let benefitsBgMobile  = formData.get('benefitsBgMobileExisting')?.toString() ?? existing.benefitsBgMobile ?? ''
    const bgDesktopFile = formData.get('benefitsBgDesktop')
    const bgMobileFile  = formData.get('benefitsBgMobile')
    if (bgDesktopFile && bgDesktopFile.size > 0) {
      deleteFile(existing.benefitsBgDesktop)
      benefitsBgDesktop = await saveFileAsync(bgDesktopFile, dir, slug)
    }
    if (bgMobileFile && bgMobileFile.size > 0) {
      deleteFile(existing.benefitsBgMobile)
      benefitsBgMobile = await saveFileAsync(bgMobileFile, dir, slug)
    }
    const rawBenefitItems = formData.get('benefitsItemsData')
    let benefitsItems = rawBenefitItems ? JSON.parse(rawBenefitItems) : []
    for (let i = 0; i < benefitsItems.length; i++) {
      const iconFile = formData.get(`benefitsItem_${i}_icon`)
      if (iconFile && iconFile.size > 0) {
        if (benefitsItems[i].existingIcon) deleteFile(benefitsItems[i].existingIcon)
        benefitsItems[i].icon = await saveFileAsync(iconFile, dir, slug)
      } else {
        benefitsItems[i].icon = benefitsItems[i].existingIcon ?? benefitsItems[i].icon ?? ''
      }
      delete benefitsItems[i].existingIcon
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
    let seoOgImage = formData.get('seoOgImageExisting')?.toString() ?? existing.seoOgImage ?? ''
    const seoOgImageFile = formData.get('seoOgImage')
    if (seoOgImageFile && seoOgImageFile.size > 0) {
      deleteFile(existing.seoOgImage)
      seoOgImage = await saveFileAsync(seoOgImageFile, dir, slug)
    }

    const service = await prisma.service.update({
      where: { id },
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

    return NextResponse.json(service)
  } catch (err) {
    console.error('[Services PUT]', err)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

// ─── DELETE — remove service ──────────────────────────────────────────────────

export async function DELETE(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)

    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Remove entire upload directory for this service
    const dir = path.join(process.cwd(), 'public', 'uploads', 'services', service.slug)
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true })

    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Services DELETE]', err)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
