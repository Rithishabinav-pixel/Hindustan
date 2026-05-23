import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const STATIC_ROUTES = [
  // Core pages
  { url: '/',              priority: 1.0, changeFrequency: 'weekly'  },
  { url: '/about-us',      priority: 0.8, changeFrequency: 'monthly' },
  { url: '/contact-us',    priority: 0.7, changeFrequency: 'monthly' },
  { url: '/training',      priority: 0.7, changeFrequency: 'monthly' },
  { url: '/blog',          priority: 0.8, changeFrequency: 'weekly'  },
  { url: '/case-study',   priority: 0.8, changeFrequency: 'weekly'  },
  { url: '/career',        priority: 0.7, changeFrequency: 'weekly'  },
  { url: '/privacy-policy',       priority: 0.3, changeFrequency: 'yearly'  },
  { url: '/terms-and-condition',  priority: 0.3, changeFrequency: 'yearly'  },
  // Industries
  { url: '/industries/agriculture',   priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/construction',  priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/education',     priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/engineering',   priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/oil-and-gas',   priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/public-safety', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/security',      priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/transportation',priority: 0.7, changeFrequency: 'monthly' },
  { url: '/industries/utilities',     priority: 0.7, changeFrequency: 'monthly' },
  // Technology
  { url: '/technology/ai-models-intelligent-analytics-powering-daas', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/technology/drone-manufacturing-assembly-services',          priority: 0.7, changeFrequency: 'monthly' },
  // Products
  { url: '/products/agriflow-hds-seed', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/products/agriflow-hds40',    priority: 0.6, changeFrequency: 'monthly' },
  { url: '/products/cargolift-hds20a',  priority: 0.6, changeFrequency: 'monthly' },
  { url: '/products/infrascan-m400',    priority: 0.6, changeFrequency: 'monthly' },
  { url: '/products/skywash-hds40a',    priority: 0.6, changeFrequency: 'monthly' },
  { url: '/products/solarshine-hds40b', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/products/terramap-hds4p',    priority: 0.6, changeFrequency: 'monthly' },
  { url: '/products/vigilcore-m4td',    priority: 0.6, changeFrequency: 'monthly' },
]

// sitemap
export default async function sitemap() {
  const [services, blogs, careers, caseStudies] = await Promise.all([
    (prisma.service?.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: 'asc' },
    }) ?? Promise.resolve([])).catch(() => []),

    (prisma.blogPost?.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    }) ?? Promise.resolve([])).catch(() => []),

    (prisma.career?.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    }) ?? Promise.resolve([])).catch(() => []),

    (prisma.caseStudyPost?.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    }) ?? Promise.resolve([])).catch(() => []),
  ])

  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    priority,
    changeFrequency,
  }))

  const serviceEntries = services.map(s => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: s.updatedAt ?? undefined,
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  const blogEntries = blogs.map(b => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: b.updatedAt ?? undefined,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  const careerEntries = careers.map(c => ({
    url: `${BASE_URL}/career/${c.slug}`,
    lastModified: c.updatedAt ?? undefined,
    priority: 0.5,
    changeFrequency: 'weekly',
  }))

  const caseStudyEntries = caseStudies.map(cs => ({
    url: `${BASE_URL}/case-study/${cs.slug}`,
    lastModified: cs.updatedAt ?? undefined,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  return [...staticEntries, ...serviceEntries, ...blogEntries, ...careerEntries, ...caseStudyEntries]
}
