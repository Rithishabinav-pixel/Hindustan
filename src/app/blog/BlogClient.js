"use client"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import style from './blog.module.css'
import Link from 'next/link'
import ButtonFan from '../components/UI/ButtonFan'
import Image from 'next/image'
import LinkArrow from '../components/UI/LinkArrow'
import Header from '../components/Header'
import { useSearchParams } from 'next/navigation'

const PAGE_SIZE = 9

export default function BlogClient() {
  const searchParams    = useSearchParams()
  const initialTag      = searchParams.get('tag')      || ''
  const initialCategory = searchParams.get('category') || ''

  const [blogs,    setBlogs]    = useState([])
  const [search,   setSearch]   = useState('')
  const [page,     setPage]     = useState(1)
  const [hasMore,  setHasMore]  = useState(false)
  const [loading,  setLoading]  = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  // Active filter from URL (tag / category)
  const tagFilter      = initialTag
  const categoryFilter = initialCategory

  const debounceRef = useRef(null)

  const fetchBlogs = useCallback(async (nextPage, currentSearch, append = false) => {
    if (append) setLoadingMore(true)
    else        setLoading(true)

    try {
      const params = new URLSearchParams({
        page:  String(nextPage),
        limit: String(PAGE_SIZE),
        ...(currentSearch && { search: currentSearch }),
        ...(tagFilter      && { tag: tagFilter }),
        ...(categoryFilter && { category: categoryFilter }),
      })
      const res  = await fetch(`/api/blogs?${params}`)
      const data = await res.json()
      const incoming = Array.isArray(data.blogs) ? data.blogs : []
      setBlogs((prev) => append ? [...prev, ...incoming] : incoming)
      setHasMore(data.hasMore ?? false)

      setPage(nextPage)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [tagFilter, categoryFilter])

  // Initial load
  useEffect(() => {
    fetchBlogs(1, '')
  }, [fetchBlogs])

  // Re-run the custom AOS observer after blogs render into the DOM.
  // AOSProvider only fires on pathname change (before cards exist), so we
  // must signal a refresh every time the blogs list changes.
  useEffect(() => {
    if (blogs.length === 0) return
    // Small timeout lets React commit the new DOM nodes before the observer queries them.
    const t = setTimeout(() => {
      window.dispatchEvent(new Event('aos:refresh'))
    }, 50)
    return () => clearTimeout(t)
  }, [blogs])

  // Debounced search
  function handleSearchChange(e) {
    const val = e.target.value
    setSearch(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchBlogs(1, val)
    }, 350)
  }

  function handleLoadMore() {
    fetchBlogs(page + 1, search, true)
  }

  return (
    <>
      <Header/>

      <section className={style.hero_section}>
        <div className={`container ${style.herosection_Container}`}>
          <div className={style.herosection_Container_content}>
            <div className={`topContent topContent_left ${style.topContent}`}>
              <h1 className="common_heading">Case Studies That Demonstrate Real Impact</h1>
              <p>See how our drones solve real industry challenges.</p>
            </div>

            {/* blog listing search bar */}
            <div className={style.searchBar}>
              <input
                type="text"
                placeholder="Search blogs"
                value={search}
                onChange={handleSearchChange}
              />
              <button type="button">
                <Image src="/images/search.svg" width={32} height={32} alt="" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={`common_section ${style.blogcards_section}`}>
        <div className={`container ${style.blogcards_Container}`}>
          {loading ? (
            <p style={{ textAlign: 'center', width: '100%', padding: '40px 0', color: 'rgba(255,255,255,0.5)' }}>Loading…</p>
          ) : blogs.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%', padding: '40px 0', color: 'rgba(255,255,255,0.5)' }}>No blogs found.</p>
          ) : (
            blogs.map((item, index) => (
              // blog listing cards
              <article className={style.blog_card} key={item.id} data-animate="fade-up" data-animate-delay={String((index % PAGE_SIZE) * 100)}>

                {/* feature image */}
                <div className={style.blogImage}>
                  <Image
                    src={item.featuredImage || '/images/blog-image.webp'}
                    width={410}
                    height={305}
                    alt={item.title}
                  />
                </div>

                <div className={style.blogContent}>
                  {/* title */}
                  <h3>{item.title}</h3>
                  {/* short content */}
                  <p>{item.shortDescription}</p>
                  <Link href={`/blog/${item.slug}`} className={`common_btn link_btn ${style.insight_btn}`}>
                    <span>Explore More</span>
                    <LinkArrow/>
                  </Link>
                </div>

              </article>
            ))
          )}

          {/* load more button */}
          {hasMore && (
            <button
              data-animate="fade-up"
              data-animate-delay="150"
              className={`common_btn ${style.loadMoreBtn}`}
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              <ButtonFan/>
              <span>{loadingMore ? 'Loading…' : 'LOAD MORE'}</span>
            </button>
          )}
        </div>
      </section>
    </>
  )
}
