'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import s from './ServiceForm.module.css'

// ─── helpers ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function emptySubItem()     { return { title: '', description: '', image: null, existingImage: '' } }
function emptyBenefitItem() { return { icon: null, existingIcon: '', title: '', description: '' } }
function emptyFaqItem()     { return { title: '', content: '' } }

// ─── reusable image upload field ──────────────────────────────────────────────

function ImageField({ label, sizeNote, existingUrl, file, onFile }) {
  const preview = file ? URL.createObjectURL(file) : null
  return (
    <div className={s.field}>
      <label className={s.label}>{label}</label>
      {existingUrl && !file && (
        <div className={s.currentImageWrap}>
          <img src={existingUrl} alt="current" className={s.currentThumb} />
          <span className={s.currentLabel}>Current image</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className={s.fileInput}
        onChange={(e) => onFile(e.target.files[0] ?? null)}
      />
      {sizeNote && <span className={s.sizeNote}>Required: {sizeNote}</span>}
      {preview && <img src={preview} alt="preview" className={s.preview} />}
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function ServiceForm({ serviceId }) {
  const router  = useRouter()
  const isEdit  = Boolean(serviceId)
  const backUrl = '/admin/dashboard/services'

  // ── basic ──
  const [name, setName]               = useState('')
  const [slug, setSlug]               = useState('')
  const [slugManual, setSlugManual]   = useState(false)

  // ── hero ──
  const [heroTitle, setHeroTitle]                     = useState('')
  const [heroDescription, setHeroDescription]         = useState('')
  const [heroButtonName, setHeroButtonName]           = useState('')
  const [heroButtonLink, setHeroButtonLink]           = useState('')
  const [heroImageFile, setHeroImageFile]             = useState(null)
  const [heroImageExisting, setHeroImageExisting]     = useState('')

  // ── sub-services ──
  const [subServicesTitle, setSubServicesTitle] = useState('')
  const [subItems, setSubItems]                 = useState([emptySubItem()])

  // ── benefits ──
  const [benefitsTitle, setBenefitsTitle]               = useState('')
  const [benefitsDescription, setBenefitsDescription]   = useState('')
  const [bgDesktopFile, setBgDesktopFile]               = useState(null)
  const [bgDesktopExisting, setBgDesktopExisting]       = useState('')
  const [bgMobileFile, setBgMobileFile]                 = useState(null)
  const [bgMobileExisting, setBgMobileExisting]         = useState('')
  const [benefitItems, setBenefitItems]                 = useState([emptyBenefitItem()])

  // ── products ──
  const [productsTitle, setProductsTitle]               = useState('')
  const [productsDescription, setProductsDescription]   = useState('')
  const [allProducts, setAllProducts]                   = useState([])
  const [selectedProductIds, setSelectedProductIds]     = useState([])

  // ── faq ──
  const [faqTitle, setFaqTitle] = useState('')
  const [faqItems, setFaqItems] = useState([emptyFaqItem()])

  // ── seo ──
  const [seoMetaTitle, setSeoMetaTitle]             = useState('')
  const [seoMetaDescription, setSeoMetaDescription] = useState('')
  const [seoMetaKeywords, setSeoMetaKeywords]       = useState('')
  const [seoOgTitle, setSeoOgTitle]                 = useState('')
  const [seoOgDescription, setSeoOgDescription]     = useState('')
  const [seoOgImageFile, setSeoOgImageFile]         = useState(null)
  const [seoOgImageExisting, setSeoOgImageExisting] = useState('')
  const [seoCanonicalUrl, setSeoCanonicalUrl]       = useState('')

  // ── ui ──
  const [loading, setLoading]   = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError]       = useState('')

  // ── fetch products ──
  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  // ── load service data for edit ──
  useEffect(() => {
    if (!isEdit) return
    setFetching(true)
    fetch(`/api/admin/services/${serviceId}`)
      .then((r) => r.json())
      .then((d) => {
        setName(d.name ?? '')
        setSlug(d.slug ?? '')
        setSlugManual(true)

        setHeroTitle(d.heroTitle ?? '')
        setHeroDescription(d.heroDescription ?? '')
        setHeroButtonName(d.heroButtonName ?? '')
        setHeroButtonLink(d.heroButtonLink ?? '')
        setHeroImageExisting(d.heroImage ?? '')

        setSubServicesTitle(d.subServicesTitle ?? '')
        const si = Array.isArray(d.subServicesItems) && d.subServicesItems.length > 0
          ? d.subServicesItems.map((i) => ({ ...emptySubItem(), ...i, existingImage: i.image ?? '', image: null }))
          : [emptySubItem()]
        setSubItems(si)

        setBenefitsTitle(d.benefitsTitle ?? '')
        setBenefitsDescription(d.benefitsDescription ?? '')
        setBgDesktopExisting(d.benefitsBgDesktop ?? '')
        setBgMobileExisting(d.benefitsBgMobile ?? '')
        const bi = Array.isArray(d.benefitsItems) && d.benefitsItems.length > 0
          ? d.benefitsItems.map((i) => ({ ...emptyBenefitItem(), ...i, existingIcon: i.icon ?? '', icon: null }))
          : [emptyBenefitItem()]
        setBenefitItems(bi)

        setProductsTitle(d.productsTitle ?? '')
        setProductsDescription(d.productsDescription ?? '')
        setSelectedProductIds(Array.isArray(d.selectedProductIds) ? d.selectedProductIds.map(Number) : [])

        setFaqTitle(d.faqTitle ?? '')
        const fi = Array.isArray(d.faqItems) && d.faqItems.length > 0 ? d.faqItems : [emptyFaqItem()]
        setFaqItems(fi)

        setSeoMetaTitle(d.seoMetaTitle ?? '')
        setSeoMetaDescription(d.seoMetaDescription ?? '')
        setSeoMetaKeywords(d.seoMetaKeywords ?? '')
        setSeoOgTitle(d.seoOgTitle ?? '')
        setSeoOgDescription(d.seoOgDescription ?? '')
        setSeoOgImageExisting(d.seoOgImage ?? '')
        setSeoCanonicalUrl(d.seoCanonicalUrl ?? '')
      })
      .catch(() => setError('Failed to load service data.'))
      .finally(() => setFetching(false))
  }, [isEdit, serviceId])

  // ── name → slug ──
  function handleNameChange(val) {
    setName(val)
    if (!slugManual) setSlug(slugify(val))
  }

  // ── sub-service helpers ──
  function updateSubItem(i, field, value) {
    setSubItems((p) => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }
  function addSubItem()          { setSubItems((p) => [...p, emptySubItem()]) }
  function removeSubItem(i)      { setSubItems((p) => p.filter((_, idx) => idx !== i)) }

  // ── benefit helpers ──
  function updateBenefitItem(i, field, value) {
    setBenefitItems((p) => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }
  function addBenefitItem()      { setBenefitItems((p) => [...p, emptyBenefitItem()]) }
  function removeBenefitItem(i)  { setBenefitItems((p) => p.filter((_, idx) => idx !== i)) }

  // ── faq helpers ──
  function updateFaqItem(i, field, value) {
    setFaqItems((p) => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }
  function addFaqItem()          { setFaqItems((p) => [...p, emptyFaqItem()]) }
  function removeFaqItem(i)      { setFaqItems((p) => p.filter((_, idx) => idx !== i)) }

  // ── product toggle ──
  function toggleProduct(id) {
    setSelectedProductIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id])
  }

  // ── submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !slug.trim()) {
      setError('Service name and slug are required.')
      return
    }

    setLoading(true)

    try {
      const fd = new FormData()

      fd.append('name', name.trim())
      fd.append('slug', slug.trim())

      fd.append('heroTitle', heroTitle)
      fd.append('heroDescription', heroDescription)
      fd.append('heroButtonName', heroButtonName)
      fd.append('heroButtonLink', heroButtonLink)
      if (heroImageFile) fd.append('heroImage', heroImageFile)
      if (isEdit) fd.append('heroImageExisting', heroImageExisting)

      fd.append('subServicesTitle', subServicesTitle)
      fd.append('subServicesItemsData', JSON.stringify(
        subItems.map((item) => ({ title: item.title, description: item.description, existingImage: item.existingImage ?? '' }))
      ))
      subItems.forEach((item, i) => {
        if (item.image instanceof File) fd.append(`subServicesItem_${i}_image`, item.image)
      })

      fd.append('benefitsTitle', benefitsTitle)
      fd.append('benefitsDescription', benefitsDescription)
      if (bgDesktopFile) fd.append('benefitsBgDesktop', bgDesktopFile)
      if (bgMobileFile)  fd.append('benefitsBgMobile', bgMobileFile)
      if (isEdit) {
        fd.append('benefitsBgDesktopExisting', bgDesktopExisting)
        fd.append('benefitsBgMobileExisting', bgMobileExisting)
      }
      fd.append('benefitsItemsData', JSON.stringify(
        benefitItems.map((item) => ({ title: item.title, description: item.description, existingIcon: item.existingIcon ?? '' }))
      ))
      benefitItems.forEach((item, i) => {
        if (item.icon instanceof File) fd.append(`benefitsItem_${i}_icon`, item.icon)
      })

      fd.append('productsTitle', productsTitle)
      fd.append('productsDescription', productsDescription)
      fd.append('selectedProductIds', JSON.stringify(selectedProductIds))

      fd.append('faqTitle', faqTitle)
      fd.append('faqItemsData', JSON.stringify(faqItems))

      fd.append('seoMetaTitle', seoMetaTitle)
      fd.append('seoMetaDescription', seoMetaDescription)
      fd.append('seoMetaKeywords', seoMetaKeywords)
      fd.append('seoOgTitle', seoOgTitle)
      fd.append('seoOgDescription', seoOgDescription)
      fd.append('seoCanonicalUrl', seoCanonicalUrl)
      if (seoOgImageFile) fd.append('seoOgImage', seoOgImageFile)
      if (isEdit) fd.append('seoOgImageExisting', seoOgImageExisting)

      const url    = isEdit ? `/api/admin/services/${serviceId}` : '/api/admin/services'
      const method = isEdit ? 'PUT' : 'POST'
      const res    = await fetch(url, { method, body: fd })
      const data   = await res.json()

      if (res.ok) {
        router.push(backUrl)
      } else {
        setError(data.error || 'Failed to save service.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className={s.page}>

      {/* ── sticky page header ── */}
      <div className={s.pageHeader}>
        <button
          type="button"
          className={s.backBtn}
          onClick={() => router.push(backUrl)}
          aria-label="Back to services"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className={s.pageTitle}>{isEdit ? 'Edit Service' : 'Add Service'}</h1>
        <div className={s.headerActions}>
          <button type="button" className={s.cancelBtn} onClick={() => router.push(backUrl)}>
            Cancel
          </button>
          <button
            type="submit"
            form="serviceForm"
            className={s.saveBtn}
            disabled={loading || fetching}
          >
            {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Service'}
          </button>
        </div>
      </div>

      {/* ── form body ── */}
      {fetching ? (
        <div className={s.loadingState}>Loading service data…</div>
      ) : (
        <form id="serviceForm" onSubmit={handleSubmit}>
          <div className={s.formBody}>

            {/* ══════════════ BASIC INFO ══════════════ */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Basic Info</h3>
              <div className={s.grid2}>
                <div className={s.field}>
                  <label className={s.label}>Service Name *</label>
                  <input
                    type="text"
                    className={s.input}
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Agriculture"
                    required
                  />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Slug *</label>
                  <input
                    type="text"
                    className={s.input}
                    value={slug}
                    onChange={(e) => { setSlug(e.target.value); setSlugManual(true) }}
                    placeholder="e.g. agriculture"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ══════════════ HERO ══════════════ */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Hero Section</h3>

              <div className={s.field}>
                <label className={s.label}>Hero Title</label>
                <input type="text" className={s.input} value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)} placeholder="Main headline" />
              </div>

              <div className={s.field}>
                <label className={s.label}>Hero Description</label>
                <textarea className={s.textarea} value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)} placeholder="Short intro text" />
              </div>

              <div className={s.grid2}>
                <div className={s.field}>
                  <label className={s.label}>Button Name</label>
                  <input type="text" className={s.input} value={heroButtonName}
                    onChange={(e) => setHeroButtonName(e.target.value)} placeholder="e.g. Enquire Now" />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Button Link</label>
                  <input type="text" className={s.input} value={heroButtonLink}
                    onChange={(e) => setHeroButtonLink(e.target.value)} placeholder="/contact or https://…" />
                </div>
              </div>

              <ImageField label="Hero Image" sizeNote="1290 × 700"
                existingUrl={heroImageExisting} file={heroImageFile} onFile={setHeroImageFile} />
            </div>

            {/* ══════════════ SUB-SERVICES ══════════════ */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Sub Services Section</h3>

              <div className={s.field}>
                <label className={s.label}>Section Title</label>
                <input type="text" className={s.input} value={subServicesTitle}
                  onChange={(e) => setSubServicesTitle(e.target.value)} placeholder="e.g. Advanced UAV Services…" />
              </div>

              {subItems.map((item, i) => (
                <div key={i} className={s.repeaterItem}>
                  <div className={s.repeaterHeader}>
                    <span className={s.repeaterLabel}>Card {i + 1}</span>
                    {subItems.length > 1 && (
                      <button type="button" className={s.removeBtn} onClick={() => removeSubItem(i)}>Remove</button>
                    )}
                  </div>

                  <div className={s.field}>
                    <label className={s.label}>Title</label>
                    <input type="text" className={s.input} value={item.title}
                      onChange={(e) => updateSubItem(i, 'title', e.target.value)} placeholder="Card title" />
                  </div>

                  <div className={s.field}>
                    <label className={s.label}>Description</label>
                    <textarea className={s.textarea} value={item.description}
                      onChange={(e) => updateSubItem(i, 'description', e.target.value)} placeholder="Card description" />
                  </div>

                  <div className={s.field}>
                    <label className={s.label}>Card Image</label>
                    {item.existingImage && !item.image && (
                      <div className={s.currentImageWrap}>
                        <img src={item.existingImage} alt="current" className={s.currentThumb} />
                        <span className={s.currentLabel}>Current image</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" className={s.fileInput}
                      onChange={(e) => updateSubItem(i, 'image', e.target.files[0] ?? null)} />
                    <span className={s.sizeNote}>Required: 630 × 441</span>
                    {item.image instanceof File && (
                      <img src={URL.createObjectURL(item.image)} alt="preview" className={s.preview} />
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className={s.addBtn} onClick={addSubItem}>+ Add Card</button>
            </div>

            {/* ══════════════ BENEFITS ══════════════ */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Benefits Section</h3>

              <div className={s.grid2}>
                <div className={s.field}>
                  <label className={s.label}>Section Title</label>
                  <input type="text" className={s.input} value={benefitsTitle}
                    onChange={(e) => setBenefitsTitle(e.target.value)} placeholder="Benefits heading" />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Section Description</label>
                  <input type="text" className={s.input} value={benefitsDescription}
                    onChange={(e) => setBenefitsDescription(e.target.value)} placeholder="Short description" />
                </div>
              </div>

              <div className={s.grid2}>
                <ImageField label="Desktop Background" sizeNote="1920 × 1029"
                  existingUrl={bgDesktopExisting} file={bgDesktopFile} onFile={setBgDesktopFile} />
                <ImageField label="Mobile Background" sizeNote="800 × 1005"
                  existingUrl={bgMobileExisting} file={bgMobileFile} onFile={setBgMobileFile} />
              </div>

              {benefitItems.map((item, i) => (
                <div key={i} className={s.repeaterItem}>
                  <div className={s.repeaterHeader}>
                    <span className={s.repeaterLabel}>Benefit Card {i + 1}</span>
                    {benefitItems.length > 1 && (
                      <button type="button" className={s.removeBtn} onClick={() => removeBenefitItem(i)}>Remove</button>
                    )}
                  </div>

                  <div className={s.grid2}>
                    <div className={s.field}>
                      <label className={s.label}>Title</label>
                      <input type="text" className={s.input} value={item.title}
                        onChange={(e) => updateBenefitItem(i, 'title', e.target.value)} placeholder="Benefit title" />
                    </div>
                    <div className={s.field}>
                      <label className={s.label}>Description</label>
                      <input type="text" className={s.input} value={item.description}
                        onChange={(e) => updateBenefitItem(i, 'description', e.target.value)} placeholder="Short description" />
                    </div>
                  </div>

                  <div className={s.field}>
                    <label className={s.label}>Icon</label>
                    {item.existingIcon && !item.icon && (
                      <div className={s.currentImageWrap}>
                        <img src={item.existingIcon} alt="current" className={s.currentThumb} />
                        <span className={s.currentLabel}>Current icon</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" className={s.fileInput}
                      onChange={(e) => updateBenefitItem(i, 'icon', e.target.files[0] ?? null)} />
                    <span className={s.sizeNote}>Required: 80 × 80</span>
                    {item.icon instanceof File && (
                      <img src={URL.createObjectURL(item.icon)} alt="preview" className={s.iconPreview} />
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className={s.addBtn} onClick={addBenefitItem}>+ Add Benefit Card</button>
            </div>

            {/* ══════════════ PRODUCTS ══════════════ */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>Products Section</h3>

              <div className={s.grid2}>
                <div className={s.field}>
                  <label className={s.label}>Section Title</label>
                  <input type="text" className={s.input} value={productsTitle}
                    onChange={(e) => setProductsTitle(e.target.value)} placeholder="e.g. Explore Our Drone Models" />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Section Description</label>
                  <input type="text" className={s.input} value={productsDescription}
                    onChange={(e) => setProductsDescription(e.target.value)} placeholder="Short description" />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label}>Select Products</label>
                <div className={s.productList}>
                  {allProducts.length === 0 ? (
                    <span style={{ fontSize: 13, color: '#9ca3af', fontFamily: 'var(--font-montserrat)' }}>
                      No products found. Add products first.
                    </span>
                  ) : (
                    allProducts.map((product) => (
                      <label key={product.id} className={s.productItem}>
                        <input
                          type="checkbox"
                          checked={selectedProductIds.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                        />
                        <img src={product.image} alt={product.name} className={s.productThumb} />
                        <span>{product.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* ══════════════ FAQ ══════════════ */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>FAQ Section</h3>

              <div className={s.field}>
                <label className={s.label}>Section Title</label>
                <input type="text" className={s.input} value={faqTitle}
                  onChange={(e) => setFaqTitle(e.target.value)} placeholder="e.g. Frequently Asked Questions" />
              </div>

              {faqItems.map((item, i) => (
                <div key={i} className={s.repeaterItem}>
                  <div className={s.repeaterHeader}>
                    <span className={s.repeaterLabel}>FAQ {i + 1}</span>
                    {faqItems.length > 1 && (
                      <button type="button" className={s.removeBtn} onClick={() => removeFaqItem(i)}>Remove</button>
                    )}
                  </div>

                  <div className={s.field}>
                    <label className={s.label}>Question</label>
                    <input type="text" className={s.input} value={item.title}
                      onChange={(e) => updateFaqItem(i, 'title', e.target.value)} placeholder="Question text" />
                  </div>

                  <div className={s.field}>
                    <label className={s.label}>Answer</label>
                    <textarea className={s.textarea} value={item.content}
                      onChange={(e) => updateFaqItem(i, 'content', e.target.value)} placeholder="Answer text" />
                  </div>
                </div>
              ))}

              <button type="button" className={s.addBtn} onClick={addFaqItem}>+ Add FAQ</button>
            </div>

            {/* ══════════════ SEO ══════════════ */}
            <div className={s.section}>
              <h3 className={s.sectionTitle}>SEO</h3>

              <div className={s.grid2}>
                <div className={s.field}>
                  <label className={s.label}>Meta Title</label>
                  <input type="text" className={s.input} value={seoMetaTitle}
                    onChange={(e) => setSeoMetaTitle(e.target.value)} placeholder="Page title for search engines" />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Meta Keywords</label>
                  <input type="text" className={s.input} value={seoMetaKeywords}
                    onChange={(e) => setSeoMetaKeywords(e.target.value)} placeholder="keyword1, keyword2, …" />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label}>Meta Description</label>
                <textarea className={s.textarea} value={seoMetaDescription}
                  onChange={(e) => setSeoMetaDescription(e.target.value)} placeholder="Short description for search results (150–160 chars)" />
              </div>

              <div className={s.grid2}>
                <div className={s.field}>
                  <label className={s.label}>OG Title</label>
                  <input type="text" className={s.input} value={seoOgTitle}
                    onChange={(e) => setSeoOgTitle(e.target.value)} placeholder="Title for social sharing" />
                </div>
                <div className={s.field}>
                  <label className={s.label}>Canonical URL <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optional)</span></label>
                  <input type="text" className={s.input} value={seoCanonicalUrl}
                    onChange={(e) => setSeoCanonicalUrl(e.target.value)} placeholder="https://example.com/services/…" />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label}>OG Description</label>
                <textarea className={s.textarea} value={seoOgDescription}
                  onChange={(e) => setSeoOgDescription(e.target.value)} placeholder="Description for social sharing" />
              </div>

              <ImageField label="OG Image" sizeNote="1200 × 630"
                existingUrl={seoOgImageExisting} file={seoOgImageFile} onFile={setSeoOgImageFile} />
            </div>

            {error && <p className={s.error}>{error}</p>}
          </div>
        </form>
      )}
    </div>
  )
}
