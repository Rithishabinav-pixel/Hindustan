'use client'
import { useState, useEffect, useCallback } from 'react'
import s from './ServiceFormModal.module.css'

// ─── tiny helpers ─────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function emptySubItem() {
  return { title: '', description: '', image: null, existingImage: '', previewUrl: '' }
}
function emptyBenefitItem() {
  return { icon: null, existingIcon: '', previewUrl: '', title: '', description: '' }
}
function emptyFaqItem() {
  return { title: '', content: '' }
}

// ─── image field (single file) ────────────────────────────────────────────────

function ImageField({ label, fieldName, sizeNote, existingUrl, file, onFile }) {
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

export default function ServiceFormModal({ serviceId, onClose, onSuccess }) {
  const isEdit = Boolean(serviceId)

  // ── basic ──
  const [name, setName]   = useState('')
  const [slug, setSlug]   = useState('')
  const [slugManual, setSlugManual] = useState(false)

  // ── hero ──
  const [heroTitle, setHeroTitle]             = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  const [heroButtonName, setHeroButtonName]   = useState('')
  const [heroButtonLink, setHeroButtonLink]   = useState('')
  const [heroImageFile, setHeroImageFile]     = useState(null)
  const [heroImageExisting, setHeroImageExisting] = useState('')

  // ── sub-services ──
  const [subServicesTitle, setSubServicesTitle] = useState('')
  const [subItems, setSubItems] = useState([emptySubItem()])

  // ── benefits ──
  const [benefitsTitle, setBenefitsTitle]             = useState('')
  const [benefitsDescription, setBenefitsDescription] = useState('')
  const [bgDesktopFile, setBgDesktopFile] = useState(null)
  const [bgDesktopExisting, setBgDesktopExisting] = useState('')
  const [bgMobileFile, setBgMobileFile]   = useState(null)
  const [bgMobileExisting, setBgMobileExisting] = useState('')
  const [benefitItems, setBenefitItems]   = useState([emptyBenefitItem()])

  // ── products ──
  const [productsTitle, setProductsTitle]             = useState('')
  const [productsDescription, setProductsDescription] = useState('')
  const [allProducts, setAllProducts]                 = useState([])
  const [selectedProductIds, setSelectedProductIds]   = useState([])

  // ── faq ──
  const [faqTitle, setFaqTitle] = useState('')
  const [faqItems, setFaqItems] = useState([emptyFaqItem()])

  // ── ui state ──
  const [loading, setLoading]   = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError]       = useState('')

  // ── fetch products for checkbox list ──
  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  // ── load existing service data for edit ──
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
        const fi = Array.isArray(d.faqItems) && d.faqItems.length > 0
          ? d.faqItems
          : [emptyFaqItem()]
        setFaqItems(fi)
      })
      .catch(() => setError('Failed to load service data.'))
      .finally(() => setFetching(false))
  }, [isEdit, serviceId])

  // ── name → slug auto-generate ──
  function handleNameChange(val) {
    setName(val)
    if (!slugManual) setSlug(slugify(val))
  }

  // ── sub-services helpers ──
  function updateSubItem(index, field, value) {
    setSubItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }
  function addSubItem() { setSubItems((p) => [...p, emptySubItem()]) }
  function removeSubItem(index) { setSubItems((p) => p.filter((_, i) => i !== index)) }

  // ── benefit items helpers ──
  function updateBenefitItem(index, field, value) {
    setBenefitItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }
  function addBenefitItem() { setBenefitItems((p) => [...p, emptyBenefitItem()]) }
  function removeBenefitItem(index) { setBenefitItems((p) => p.filter((_, i) => i !== index)) }

  // ── faq helpers ──
  function updateFaqItem(index, field, value) {
    setFaqItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }
  function addFaqItem() { setFaqItems((p) => [...p, emptyFaqItem()]) }
  function removeFaqItem(index) { setFaqItems((p) => p.filter((_, i) => i !== index)) }

  // ── product toggle ──
  function toggleProduct(id) {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
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

      // basic
      fd.append('name', name.trim())
      fd.append('slug', slug.trim())

      // hero
      fd.append('heroTitle', heroTitle)
      fd.append('heroDescription', heroDescription)
      fd.append('heroButtonName', heroButtonName)
      fd.append('heroButtonLink', heroButtonLink)
      if (heroImageFile) fd.append('heroImage', heroImageFile)
      if (isEdit) fd.append('heroImageExisting', heroImageExisting)

      // sub-services
      fd.append('subServicesTitle', subServicesTitle)
      const subItemsData = subItems.map((item) => ({
        title: item.title,
        description: item.description,
        existingImage: item.existingImage ?? '',
      }))
      fd.append('subServicesItemsData', JSON.stringify(subItemsData))
      subItems.forEach((item, i) => {
        if (item.image instanceof File) fd.append(`subServicesItem_${i}_image`, item.image)
      })

      // benefits
      fd.append('benefitsTitle', benefitsTitle)
      fd.append('benefitsDescription', benefitsDescription)
      if (bgDesktopFile) fd.append('benefitsBgDesktop', bgDesktopFile)
      if (bgMobileFile)  fd.append('benefitsBgMobile', bgMobileFile)
      if (isEdit) {
        fd.append('benefitsBgDesktopExisting', bgDesktopExisting)
        fd.append('benefitsBgMobileExisting', bgMobileExisting)
      }
      const benefitItemsData = benefitItems.map((item) => ({
        title: item.title,
        description: item.description,
        existingIcon: item.existingIcon ?? '',
      }))
      fd.append('benefitsItemsData', JSON.stringify(benefitItemsData))
      benefitItems.forEach((item, i) => {
        if (item.icon instanceof File) fd.append(`benefitsItem_${i}_icon`, item.icon)
      })

      // products
      fd.append('productsTitle', productsTitle)
      fd.append('productsDescription', productsDescription)
      fd.append('selectedProductIds', JSON.stringify(selectedProductIds))

      // faq
      fd.append('faqTitle', faqTitle)
      fd.append('faqItemsData', JSON.stringify(faqItems))

      const url    = isEdit ? `/api/admin/services/${serviceId}` : '/api/admin/services'
      const method = isEdit ? 'PUT' : 'POST'

      const res  = await fetch(url, { method, body: fd })
      const data = await res.json()

      if (res.ok) {
        onSuccess()
        onClose()
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

  if (fetching) {
    return (
      <div className={s.overlay} onClick={onClose}>
        <div className={s.modal} onClick={(e) => e.stopPropagation()}>
          <div className={s.modalHeader}>
            <h2 className={s.modalTitle}>Loading…</h2>
            <button className={s.closeBtn} onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>

        {/* ── header ── */}
        <div className={s.modalHeader}>
          <h2 className={s.modalTitle}>{isEdit ? 'Edit Service' : 'Add Service'}</h2>
          <button className={s.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={s.modalBody}>

            {/* ═══════════════════════ BASIC INFO ════════════════════════ */}
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

            {/* ════════════════════════ HERO ══════════════════════════════ */}
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

              <ImageField
                label="Hero Image"
                sizeNote="1290 × 700"
                existingUrl={heroImageExisting}
                file={heroImageFile}
                onFile={setHeroImageFile}
              />
            </div>

            {/* ═══════════════════════ SUB-SERVICES ═══════════════════════ */}
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
                      <button type="button" className={s.removeBtn} onClick={() => removeSubItem(i)}>
                        Remove
                      </button>
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
                      onChange={(e) => {
                        const file = e.target.files[0] ?? null
                        updateSubItem(i, 'image', file)
                      }} />
                    <span className={s.sizeNote}>Required: 630 × 441</span>
                    {item.image instanceof File && (
                      <img src={URL.createObjectURL(item.image)} alt="preview" className={s.preview} />
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className={s.addBtn} onClick={addSubItem}>
                + Add Card
              </button>
            </div>

            {/* ════════════════════════ BENEFITS ══════════════════════════ */}
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
                <ImageField
                  label="Desktop Background Image"
                  sizeNote="1920 × 1029"
                  existingUrl={bgDesktopExisting}
                  file={bgDesktopFile}
                  onFile={setBgDesktopFile}
                />
                <ImageField
                  label="Mobile Background Image"
                  sizeNote="800 × 1005"
                  existingUrl={bgMobileExisting}
                  file={bgMobileFile}
                  onFile={setBgMobileFile}
                />
              </div>

              {benefitItems.map((item, i) => (
                <div key={i} className={s.repeaterItem}>
                  <div className={s.repeaterHeader}>
                    <span className={s.repeaterLabel}>Benefit Card {i + 1}</span>
                    {benefitItems.length > 1 && (
                      <button type="button" className={s.removeBtn} onClick={() => removeBenefitItem(i)}>
                        Remove
                      </button>
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
                      onChange={(e) => {
                        const file = e.target.files[0] ?? null
                        updateBenefitItem(i, 'icon', file)
                      }} />
                    <span className={s.sizeNote}>Required: 80 × 80</span>
                    {item.icon instanceof File && (
                      <img src={URL.createObjectURL(item.icon)} alt="preview" className={s.preview} />
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className={s.addBtn} onClick={addBenefitItem}>
                + Add Benefit Card
              </button>
            </div>

            {/* ════════════════════════ PRODUCTS ══════════════════════════ */}
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

            {/* ════════════════════════ FAQ ════════════════════════════════ */}
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
                      <button type="button" className={s.removeBtn} onClick={() => removeFaqItem(i)}>
                        Remove
                      </button>
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

              <button type="button" className={s.addBtn} onClick={addFaqItem}>
                + Add FAQ
              </button>
            </div>

            {error && <p className={s.error}>{error}</p>}
          </div>

          {/* ── footer ── */}
          <div className={s.modalFooter}>
            <button type="button" className={s.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={s.submitBtn} disabled={loading}>
              {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
