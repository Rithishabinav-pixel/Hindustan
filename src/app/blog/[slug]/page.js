import React from 'react'
import style from './blogDetail.module.css'
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
  const blog = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true, shortDescription: true, featuredImage: true,
      seoMetaTitle: true, seoMetaDescription: true, seoMetaKeywords: true,
      seoOgTitle: true, seoOgDescription: true, seoOgImage: true, seoCanonicalUrl: true,
    },
  })

  if (!blog) return { title: 'Blog Not Found' }

  const title       = blog.seoMetaTitle       || blog.title
  const description = blog.seoMetaDescription || blog.shortDescription || ''
  const ogTitle     = blog.seoOgTitle         || title
  const ogDesc      = blog.seoOgDescription   || description
  const ogImage     = blog.seoOgImage         || blog.featuredImage || ''
  const canonical   = blog.seoCanonicalUrl    || `/blog/${slug}`

  return {
    title,
    description,
    keywords: blog.seoMetaKeywords || undefined,
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

export default async function BlogDetailPage({ params }) {
  const { slug } = await params

  const blog = await prisma.blogPost.findUnique({
    where: { slug },
    include: { categories: true },
  })

  if (!blog) {
    return (
      <>
        <Header />
        <section style={{ padding: '190px 20px 80px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Blog Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>This article is no longer available.</p>
        </section>
      </>
    )
  }

  // Latest 5 blogs (excluding current)
  const latestBlogs = await prisma.blogPost.findMany({
    where:   { slug: { not: slug } },
    orderBy: { publishedAt: 'desc' },
    take:    5,
    select:  { id: true, title: true, slug: true, featuredImage: true, shortDescription: true },
  })

  // Previous (older)
  const prevBlog = await prisma.blogPost.findFirst({
    where:   { publishedAt: { lt: blog.publishedAt } },
    orderBy: { publishedAt: 'desc' },
    select:  { slug: true, title: true },
  })

  // Next (newer)
  const nextBlog = await prisma.blogPost.findFirst({
    where:   { publishedAt: { gt: blog.publishedAt } },
    orderBy: { publishedAt: 'asc' },
    select:  { slug: true, title: true },
  })

  const tags       = Array.isArray(blog.tags) ? blog.tags : []
  const categories = blog.categories || []
  const pageUrl    = `/blog/${slug}`

  return (
    <>
      <Header />

      <section className={style.blogDetail_Section}>
        <div className={`container ${style.herosection_Container}`}>

          <main id={style.main}>

            <div className={style.blogTopContent}>
              <div className={style.metaData}>
                {/* blog date */}
                <p className={style.date}>{formatDate(blog.publishedAt)}</p>
                <div className={style.author}>
                  <Image src="/images/author_icon.svg" width={24} height={24} alt="" />
                  {/* author name */}
                  <p>{blog.author || 'Hindustan Drones'}</p>
                </div>
              </div>
              {/* blog title */}
              <h1 className="common_heading">{blog.title}</h1>
              {/* blog short content */}
              <p>{blog.shortDescription}</p>
            </div>

            {/* feature image */}
            {blog.featuredImage && (
              <div className={style.featureImage}>
                <Image src={blog.featuredImage} width={850} height={632} alt={blog.title} />
              </div>
            )}

            {/* blog contents — rendered as HTML */}
            <div
              className={style.blogContent_detail}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* blog category */}
            {categories.length > 0 && (
              <div className={style.blogCategory}>
                <p>Categories : </p>
                <div>
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/blog?category=${cat.slug}`}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* blog tags */}
            {tags.length > 0 && (
              <div className={style.tags}>
                <p>Tags</p>
                {tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* blogs share */}
            <div className={style.share}>
              <p>Share this post</p>
              <ul>
                <li><a href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + pageUrl)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/whatsapp.svg" width={24} height={24} alt="WhatsApp" /></a></li>
                <li><a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer"><Image src="/images/instagram.svg" width={24} height={24} alt="Instagram" /></a></li>
                <li><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/twitter.svg" width={24} height={24} alt="Twitter" /></a></li>
                <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/facebook.svg" width={24} height={24} alt="Facebook" /></a></li>
                <li><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer"><Image src="/images/linkedin.svg" width={24} height={24} alt="LinkedIn" /></a></li>
              </ul>
            </div>

            {/* blog navigation */}
            <div className={style.navigation}>
              {/* prev btn */}
              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`} className={`common_btn link_btn ${style.blog_prev_btn}`}>
                  <LinkArrow />
                  <span>{prevBlog.title}</span>
                </Link>
              ) : null}

              {/* next btn */}
              {nextBlog ? (
                <Link href={`/blog/${nextBlog.slug}`} className={`common_btn link_btn ${style.blog_next_btn}`}>
                  <span>{nextBlog.title}</span>
                  <LinkArrow/>
                </Link>
              ) : null}
            </div>

          </main>

          {latestBlogs.length > 0 && (
            <aside id={style.sidebar}>
              <h3 className={style.latestBlog_text}>Latest Blogs</h3>
              {latestBlogs.map((item) => (
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
                    <Link href={`/blog/${item.slug}`} className={`common_btn link_btn ${style.insight_btn}`}>
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
