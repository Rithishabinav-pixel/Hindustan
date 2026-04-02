'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from './CareerForm.module.css'
import BlogRichTextEditor from './BlogRichTextEditor'
import TagInput from './TagInput'

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function BlogForm({ blogId }) {
  const router  = useRouter()
  const isEdit  = Boolean(blogId)
  const imgRef  = useRef(null)

  // Track whether slug / canonical have been manually edited
  const slugTouchedRef      = useRef(isEdit)
  const canonicalTouchedRef = useRef(isEdit)

  const [fields, setFields] = useState({
    title:            '',
    slug:             '',
    shortDescription: '',
    author:           'Hindustan Drones',
  })
  const [seo, setSeo] = useState({
    seoMetaTitle:       '',
    seoMetaDescription: '',
    seoMetaKeywords:    '',
    seoOgTitle:         '',
    seoOgDescription:   '',
    seoOgImage:         '',
    seoCanonicalUrl:    '',
  })
  const [content,       setContent]       = useState('')
  const [tags,          setTags]          = useState([])
  const [categories,    setCategories]    = useState([])      // all available
  const [selectedCats,  setSelectedCats]  = useState([])     // selected IDs (strings)
  const [imageFile,     setImageFile]     = useState(null)
  const [imagePreview,  setImagePreview]  = useState('')
  const [keepImage,     setKeepImage]     = useState('')
  const [loading,       setLoading]       = useState(false)
  const [fetching,      setFetching]      = useState(isEdit)
  const [error,         setError]         = useState('')
  const [catRefreshing, setCatRefreshing] = useState(false)

  // Load categories — expects { success: true, data: [...] }
  const loadCategories = useCallback(async () => {
    setCatRefreshing(true)
    try {
      const r    = await fetch('/api/admin/categories')
      const data = await r.json()
      setCategories(data.success && Array.isArray(data.data) ? data.data : [])
    } catch (_) {}
    finally { setCatRefreshing(false) }
  }, [])

  useEffect(() => { loadCategories() }, [loadCategories])

  // Load blog data for edit
  useEffect(() => {
    if (!isEdit) return
    fetch(`/api/admin/blogs/${blogId}`)
      .then((r) => r.json())
      .then((data) => {
        setFields({
          title:            data.title            || '',
          slug:             data.slug             || '',
          shortDescription: data.shortDescription || '',
          author:           data.author           || 'Hindustan Drones',
        })
        setSeo({
          seoMetaTitle:       data.seoMetaTitle       || '',
          seoMetaDescription: data.seoMetaDescription || '',
          seoMetaKeywords:    data.seoMetaKeywords    || '',
          seoOgTitle:         data.seoOgTitle         || '',
          seoOgDescription:   data.seoOgDescription   || '',
          seoOgImage:         data.seoOgImage         || '',
          seoCanonicalUrl:    data.seoCanonicalUrl    || '',
        })
        setContent(data.content || '')
        setTags(Array.isArray(data.tags) ? data.tags : [])
        setSelectedCats((data.categories || []).map((c) => String(c.id)))
        setImagePreview(data.featuredImage || '')
        setKeepImage(data.featuredImage || '')
      })
      .catch(() => setError('Failed to load blog data.'))
      .finally(() => setFetching(false))
  }, [blogId, isEdit])

  function handleChange(e) {
    const { name, value } = e.target

    if (name === 'title' && !slugTouchedRef.current) {
      // Auto-generate slug and canonical from title
      const generated = toSlug(value)
      setFields((prev) => ({ ...prev, title: value, slug: generated }))
      if (!canonicalTouchedRef.current) {
        setSeo((prev) => ({ ...prev, seoCanonicalUrl: generated ? `/blog/${generated}` : '' }))
      }
      return
    }

    if (name === 'slug') {
      slugTouchedRef.current = true
      if (!canonicalTouchedRef.current) {
        setSeo((prev) => ({ ...prev, seoCanonicalUrl: value ? `/blog/${value}` : '' }))
      }
    }

    setFields((prev) => ({ ...prev, [name]: value }))
  }

  function handleSeoChange(e) {
    const { name, value } = e.target
    if (name === 'seoCanonicalUrl') canonicalTouchedRef.current = true
    setSeo((prev) => ({ ...prev, [name]: value }))
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  function toggleCategory(idStr) {
    setSelectedCats((prev) =>
      prev.includes(idStr) ? prev.filter((c) => c !== idStr) : [...prev, idStr]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('title',            fields.title.trim())
    formData.append('slug',             fields.slug.trim())
    formData.append('shortDescription', fields.shortDescription.trim())
    formData.append('author',           fields.author.trim())
    formData.append('content',          content)
    formData.append('tags',             JSON.stringify(tags))
    formData.append('categories',       JSON.stringify(selectedCats))
    if (imageFile) {
      formData.append('featuredImage', imageFile)
    } else if (isEdit) {
      formData.append('keepImage', keepImage)
    }

    // SEO fields
    Object.entries(seo).forEach(([key, val]) => {
      if (val?.trim()) formData.append(key, val.trim())
    })

    try {
      const url    = isEdit ? `/api/admin/blogs/${blogId}` : '/api/admin/blogs'
      const method = isEdit ? 'PUT' : 'POST'
      const res    = await fetch(url, { method, body: formData })
      const data   = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      router.push('/admin/dashboard/blogs')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (fetching) return <div className={styles.loading}>Loading…</div>

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{isEdit ? 'Edit Blog' : 'Add New Blog'}</h1>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Basic Info */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Blog Details</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Title *</label>
              <input className={styles.input} type="text" name="title" value={fields.title}
                onChange={handleChange} required disabled={loading} placeholder="Blog title" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Slug * (auto-generated from title)</label>
              <input className={styles.input} type="text" name="slug" value={fields.slug}
                onChange={handleChange} required disabled={loading} placeholder="e.g. drone-use-cases" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Author</label>
              <input className={styles.input} type="text" name="author" value={fields.author}
                onChange={handleChange} disabled={loading} placeholder="Author name" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Short Description</label>
            <textarea className={styles.textarea} name="shortDescription" rows={3}
              value={fields.shortDescription} onChange={handleChange} disabled={loading}
              placeholder="Brief summary shown on listing page…" />
          </div>
        </div>

        {/* Featured Image */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured Image</h2>
          {imagePreview && (
            <img src={imagePreview} alt="preview" style={{ maxHeight: 180, borderRadius: 8, marginBottom: 12, objectFit: 'cover' }} />
          )}
          <input ref={imgRef} type="file" accept="image/*" onChange={handleImageChange}
            disabled={loading} style={{ display: 'none' }} />
          <button type="button" className={styles.btnAdd}
            onClick={() => imgRef.current?.click()} disabled={loading}>
            {imagePreview ? 'Change Image' : 'Upload Image'}
          </button>
        </div>

        {/* Categories */}
        <div className={styles.section}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Categories</h2>
            <button
              type="button"
              onClick={loadCategories}
              disabled={catRefreshing || loading}
              style={{ fontSize: 12, padding: '3px 10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, color: '#9ca3af', cursor: 'pointer' }}
            >
              {catRefreshing ? 'Refreshing…' : '↻ Refresh'}
            </button>
          </div>
          {categories.length === 0 ? (
            <p style={{ fontSize: 13, color: '#9ca3af' }}>No categories yet. Add one from the Categories page, then click Refresh.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-montserrat)', color: '#111827' }}
                >
                  <input
                    type="checkbox"
                    value={String(cat.id)}
                    checked={selectedCats.includes(String(cat.id))}
                    onChange={() => toggleCategory(String(cat.id))}
                    disabled={loading}
                    style={{ accentColor: '#148f3f', width: 15, height: 15, flexShrink: 0 }}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Tags</h2>
          <div className={styles.field}>
            <label className={styles.label}>Add Tags (press Enter after each)</label>
            <TagInput value={tags} onChange={setTags} disabled={loading} />
          </div>
        </div>

        {/* Content */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Content</h2>
          <div className={styles.field}>
            <label className={styles.label}>Blog Content</label>
            <BlogRichTextEditor value={content} onChange={setContent} disabled={loading} />
          </div>
        </div>

        {/* SEO */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>SEO Meta Tags</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Meta Title</label>
              <input className={styles.input} type="text" name="seoMetaTitle"
                value={seo.seoMetaTitle} onChange={handleSeoChange} disabled={loading}
                placeholder="Page title for search engines (50–60 chars)" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Canonical URL (auto-generated from slug)</label>
              <input className={styles.input} type="text" name="seoCanonicalUrl"
                value={seo.seoCanonicalUrl} onChange={handleSeoChange} disabled={loading}
                placeholder="/blog/your-slug" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Meta Description</label>
            <textarea className={styles.textarea} name="seoMetaDescription" rows={2}
              value={seo.seoMetaDescription} onChange={handleSeoChange} disabled={loading}
              placeholder="Short description for search results (150–160 chars)" />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Meta Keywords</label>
            <input className={styles.input} type="text" name="seoMetaKeywords"
              value={seo.seoMetaKeywords} onChange={handleSeoChange} disabled={loading}
              placeholder="comma, separated, keywords" />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>OG Title</label>
              <input className={styles.input} type="text" name="seoOgTitle"
                value={seo.seoOgTitle} onChange={handleSeoChange} disabled={loading}
                placeholder="Open Graph title (social share)" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>OG Image URL</label>
              <input className={styles.input} type="text" name="seoOgImage"
                value={seo.seoOgImage} onChange={handleSeoChange} disabled={loading}
                placeholder="https://… or /uploads/…" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>OG Description</label>
            <textarea className={styles.textarea} name="seoOgDescription" rows={2}
              value={seo.seoOgDescription} onChange={handleSeoChange} disabled={loading}
              placeholder="Description shown when shared on social media" />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.btnCancel}
            onClick={() => router.push('/admin/dashboard/blogs')} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className={styles.btnSave} disabled={loading}>
            {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}
