'use client'
import { useState, useEffect } from 'react'
import styles from './modals.module.css'
import productStyles from './AddProductModal.module.css'

export default function AddProductModal({ product, onClose, onSuccess }) {
  const isEdit = Boolean(product)
  const [name, setName] = useState(product?.name ?? '')
  const [link, setLink] = useState(product?.link ?? '')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!isEdit && !imageFile) {
      setError('Please select an image')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('link', link)
      if (imageFile) formData.append('image', imageFile)

      const url = isEdit
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products'

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        onSuccess()
        onClose()
      } else {
        setError(data.error || 'Failed to save product')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.field}>
              <label htmlFor="productName" className={styles.label}>Product Name</label>
              <input
                id="productName"
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="productImage" className={styles.label}>
                Product Image
                {isEdit && (
                  <span className={productStyles.optionalNote}> (leave empty to keep current)</span>
                )}
              </label>
              {isEdit && product.image && (
                <div className={productStyles.currentImage}>
                  <img src={product.image} alt="Current" className={productStyles.thumb} />
                  <span className={productStyles.currentLabel}>Current image</span>
                </div>
              )}
              <input
                id="productImage"
                type="file"
                accept="image/*"
                className={productStyles.fileInput}
                onChange={(e) => {
                  const file = e.target.files[0] ?? null
                  setImageFile(file)
                  setPreviewUrl(file ? URL.createObjectURL(file) : null)
                }}
                required={!isEdit}
              />
              <span className={productStyles.sizeNote}>Image size should be 520 × 320</span>
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className={productStyles.preview} />
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="productLink" className={styles.label}>Product Link</label>
              <input
                id="productLink"
                type="text"
                className={styles.input}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com/product"
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
