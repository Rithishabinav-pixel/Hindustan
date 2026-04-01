import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ServicePageContent from './ServicePageContent'

// ─── shared data fetcher ───────────────────────────────────────────────────

async function getService(slug) {
  const service = await prisma.service.findUnique({ where: { slug } })
  if (!service) return null

  const selectedIds = Array.isArray(service.selectedProductIds)
    ? service.selectedProductIds.map(Number).filter(Boolean)
    : []

  const products = selectedIds.length > 0
    ? await prisma.product.findMany({ where: { id: { in: selectedIds } } })
    : []

  // Strip non-serialisable Date fields before passing to the client component
  const { createdAt, updatedAt, ...rest } = service
  return { ...rest, products }
}

// ─── generateMetadata ─────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}

  const title       = service.seoMetaTitle       || service.heroTitle       || service.name
  const description = service.seoMetaDescription || service.heroDescription || undefined
  const ogTitle     = service.seoOgTitle         || title
  const ogDesc      = service.seoOgDescription   || description

  return {
    title,
    ...(description && { description }),
    ...(service.seoMetaKeywords && { keywords: service.seoMetaKeywords }),
    openGraph: {
      title: ogTitle,
      ...(ogDesc      && { description: ogDesc }),
      ...(service.seoOgImage && { images: [{ url: service.seoOgImage }] }),
      type: 'website',
    },
    ...(service.seoCanonicalUrl && {
      alternates: { canonical: service.seoCanonicalUrl },
    }),
  }
}

// ─── page ─────────────────────────────────────────────────────────────────

export default async function ServicePage({ params }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  return <ServicePageContent service={service} />
}
