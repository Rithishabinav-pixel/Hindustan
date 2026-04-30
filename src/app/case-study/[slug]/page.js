import React from 'react'
import style from './caseStudyDetail.module.css'
import Header from '@/app/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import LinkArrow from '@/app/components/UI/LinkArrow'
import { prisma } from '@/lib/prisma'

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const caseStudy = await prisma.caseStudyPost.findUnique({
    where: { slug },
    select: {
      title: true, shortDescription: true, featuredImage: true,
      seoMetaTitle: true, seoMetaDescription: true, seoMetaKeywords: true,
      seoOgTitle: true, seoOgDescription: true, seoOgImage: true, seoCanonicalUrl: true,
    },
  })

  if (!caseStudy) return { title: 'Case Study Not Found' }

  const title       = caseStudy.seoMetaTitle       || caseStudy.title
  const description = caseStudy.seoMetaDescription || caseStudy.shortDescription || ''
  const ogTitle     = caseStudy.seoOgTitle         || title
  const ogDesc      = caseStudy.seoOgDescription   || description
  const ogImage     = caseStudy.seoOgImage         || caseStudy.featuredImage || ''
  const canonical   = caseStudy.seoCanonicalUrl    || `/case-study/${slug}`

  return {
    title,
    description,
    keywords: caseStudy.seoMetaKeywords || undefined,
    alternates: { canonical },
    openGraph: {
      title:       ogTitle,
      description: ogDesc,
      url:         canonical,
      images:      ogImage ? [{ url: ogImage }] : [],
      type:        'article',
    },
    twitter: {
      card:        'summary_large_image',
      title:       ogTitle,
      description: ogDesc,
      images:      ogImage ? [ogImage] : [],
    },
  }
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params

  const caseStudy = await prisma.caseStudyPost.findUnique({
    where: { slug },
    include: { categories: true },
  })

  if (!caseStudy) {
    return (
      <>
        <Header />
        <section style={{ padding: '190px 20px 80px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Case Study Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>This case study is no longer available.</p>
        </section>
      </>
    )
  }

  const latestCaseStudies = await prisma.caseStudyPost.findMany({
    where:   { slug: { not: slug } },
    orderBy: { publishedAt: 'desc' },
    take:    5,
    select:  { id: true, title: true, slug: true, featuredImage: true, shortDescription: true },
  })

  const prevCaseStudy = await prisma.caseStudyPost.findFirst({
    where:   { publishedAt: { lt: caseStudy.publishedAt } },
    orderBy: { publishedAt: 'desc' },
    select:  { slug: true, title: true },
  })

  const nextCaseStudy = await prisma.caseStudyPost.findFirst({
    where:   { publishedAt: { gt: caseStudy.publishedAt } },
    orderBy: { publishedAt: 'asc' },
    select:  { slug: true, title: true },
  })

  const tags       = Array.isArray(caseStudy.tags) ? caseStudy.tags : []
  const categories = caseStudy.categories || []
  const pageUrl    = `/case-study/${slug}`

  return (
    <>
      <Header />

      <section className={style.blogDetail_Section}>
        <div className={`container ${style.herosection_Container}`}>

          <main id={style.main}>

            <div className={style.blogTopContent}>
              <div className={style.metaData}>
                <p className={style.date}>{formatDate(caseStudy.publishedAt)}</p>
                <div className={style.author}>
                  <Image src="/images/author_icon.svg" width={24} height={24} alt="" />
                  <p>{caseStudy.author || 'Hindustan Drones'}</p>
                </div>
              </div>
              <h1 className="common_heading">{caseStudy.title}</h1>
              <p>{caseStudy.shortDescription}</p>
            </div>

            {caseStudy.featuredImage && (
              <div className={style.featureImage}>
                <Image src={caseStudy.featuredImage} width={850} height={632} alt={caseStudy.title} />
              </div>
            )}

            <div
              className={style.blogContent_detail}
              dangerouslySetInnerHTML={{ __html: caseStudy.content }}
            />

            {categories.length > 0 && (
              <div className={style.blogCategory}>
                <p>Categories : </p>
                <div>
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/case-study?category=${cat.slug}`}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div className={style.tags}>
                <p>Tags</p>
                {tags.map((tag) => (
                  <Link key={tag} href={`/case-study?tag=${encodeURIComponent(tag)}`}>
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <div className={style.share}>
              <p>Share this post</p>
              <ul>
                <li><a href={`https://wa.me/?text=${encodeURIComponent(caseStudy.title + ' ' + pageUrl)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/whatsapp.svg" width={24} height={24} alt="WhatsApp" /></a></li>
                <li><a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer"><Image src="/images/instagram.svg" width={24} height={24} alt="Instagram" /></a></li>
                <li><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(caseStudy.title)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/twitter.svg" width={24} height={24} alt="Twitter" /></a></li>
                <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/facebook.svg" width={24} height={24} alt="Facebook" /></a></li>
                <li><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(caseStudy.title)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/linkedin.svg" width={24} height={24} alt="LinkedIn" /></a></li>
              </ul>
            </div>

            <div className={style.navigation}>
              {prevCaseStudy ? (
                <Link href={`/case-study/${prevCaseStudy.slug}`} className={`common_btn link_btn ${style.blog_prev_btn}`}>
                  <LinkArrow />
                  <span>{prevCaseStudy.title}</span>
                </Link>
              ) : null}

              {nextCaseStudy ? (
                <Link href={`/case-study/${nextCaseStudy.slug}`} className={`common_btn link_btn ${style.blog_next_btn}`}>
                  <span>{nextCaseStudy.title}</span>
                  <LinkArrow/>
                </Link>
              ) : null}
            </div>

          </main>

          {latestCaseStudies.length > 0 && (
            <aside id={style.sidebar}>
              <h3 className={style.latestBlog_text}>Latest Case Studies</h3>
              {latestCaseStudies.map((item) => (
                <article className={style.blog_card} key={item.id}>
                  <div className={style.blogImage}>
                    <Image
                      src={item.featuredImage || '/images/blog-image.webp'}
                      width={410}
                      height={305}
                      alt={item.title}
                    />
                  </div>
                  <div className={style.blogContent}>
                    <h3>{item.title}</h3>
                    <p>{item.shortDescription}</p>
                    <Link href={`/case-study/${item.slug}`} className={`common_btn link_btn ${style.insight_btn}`}>
                      <span>Explore More</span>
                      <LinkArrow/>
                    </Link>
                  </div>
                </article>
              ))}
            </aside>
          )}

        </div>
      </section>
    </>
  )
}
