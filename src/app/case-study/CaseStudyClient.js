"use client"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import style from './caseStudy.module.css'
import Link from 'next/link'
import ButtonFan from '../components/UI/ButtonFan'
import Image from 'next/image'
import LinkArrow from '../components/UI/LinkArrow'
import Header from '../components/Header'
import { useSearchParams } from 'next/navigation'

const PAGE_SIZE = 9

export default function CaseStudyClient() {
  const searchParams    = useSearchParams()
  const initialTag      = searchParams.get('tag')      || ''
  const initialCategory = searchParams.get('category') || ''

  const [caseStudies,  setCaseStudies]  = useState([])
  const [search,       setSearch]       = useState('')
  const [page,         setPage]         = useState(1)
  const [hasMore,      setHasMore]      = useState(false)
  const [loading,      setLoading]      = useState(true)
  const [loadingMore,  setLoadingMore]  = useState(false)

  const tagFilter      = initialTag
  const categoryFilter = initialCategory

  const debounceRef = useRef(null)

  const fetchCaseStudies = useCallback(async (nextPage, currentSearch, append = false) => {
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
      const res  = await fetch(`/api/case-studies?${params}`)
      const data = await res.json()
      const incoming = Array.isArray(data.caseStudies) ? data.caseStudies : []
      setCaseStudies((prev) => append ? [...prev, ...incoming] : incoming)
      setHasMore(data.hasMore ?? false)
      setPage(nextPage)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [tagFilter, categoryFilter])

  useEffect(() => {
    fetchCaseStudies(1, '')
  }, [fetchCaseStudies])

  useEffect(() => {
    if (caseStudies.length === 0) return
    const t = setTimeout(() => {
      window.dispatchEvent(new Event('aos:refresh'))
    }, 50)
    return () => clearTimeout(t)
  }, [caseStudies])

  function handleSearchChange(e) {
    const val = e.target.value
    setSearch(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchCaseStudies(1, val)
    }, 350)
  }

  function handleLoadMore() {
    fetchCaseStudies(page + 1, search, true)
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

            <div className={style.searchBar}>
              <input
                type="text"
                placeholder="Search case studies"
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
          ) : caseStudies.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%', padding: '40px 0', color: 'rgba(255,255,255,0.5)' }}>No case studies found.</p>
          ) : (
            caseStudies.map((item, index) => (
              <article className={style.blog_card} key={item.id} data-animate="fade-up" data-animate-delay={String((index % PAGE_SIZE) * 100)}>

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
            ))
          )}

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
