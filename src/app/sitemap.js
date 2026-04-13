import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hindustandrones.io'

const STATIC_ROUTES = [
  { url: '/',                                                        priority: 1.0,  changeFrequency: 'weekly'  },
  { url: '/about-us',                                                priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/contact-us',                                              priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/training',                                                priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/blog',                                                    priority: 0.8,  changeFrequency: 'weekly'  },
  { url: '/career',                                                  priority: 0.7,  changeFrequency: 'weekly'  },
  { url: '/career/drone-engineers',                                  priority: 0.6,  changeFrequency: 'monthly' },
  { url: '/industries/agriculture',                                  priority: 0.6,  changeFrequency: 'monthly' },
  { url: '/technology/ai-models-intelligent-analytics-powering-daas', priority: 0.6, changeFrequency: 'monthly' },
]

export default async function sitemap() {
  const [services, blogs, careers] = await Promise.all([
    prisma.service.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: 'asc' },
    }).catch(() => []),

    prisma.blogPost.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    }).catch(() => []),

    prisma.career.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    }).catch(() => []),
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

  return [...staticEntries, ...serviceEntries, ...blogEntries, ...careerEntries]
}
