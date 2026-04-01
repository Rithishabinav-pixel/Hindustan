'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './CareerForm.module.css'
import RichTextEditor from './RichTextEditor'

const emptyDetail = () => ({ title: '', content: '' })

export default function CareerForm({ careerId }) {
  const router  = useRouter()
  const isEdit  = Boolean(careerId)

  const [fields, setFields] = useState({
    jobTitle:     '',
    location:     '',
    experience:   '',
    remuneration: '',
    slug:         '',
  })
  const [details,  setDetails]  = useState([emptyDetail()])
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error,    setError]    = useState('')

  useEffect(() => {
    if (!isEdit) return
    fetch(`/api/admin/careers/${careerId}`)
      .then((r) => r.json())
      .then((data) => {
        setFields({
          jobTitle:     data.jobTitle     || '',
          location:     data.location     || '',
          experience:   data.experience   || '',
          remuneration: data.remuneration || '',
          slug:         data.slug         || '',
        })
        // Normalise legacy list-type sections into HTML for the editor
        const loaded = Array.isArray(data.details) && data.details.length > 0
          ? data.details.map((d) => {
              let content = d.content || ''
              if (d.type === 'list' && Array.isArray(d.items) && d.items.length > 0) {
                content = `<ul>${d.items.map((i) => `<li>${i}</li>`).join('')}</ul>`
              }
              return { title: d.title || '', content }
            })
          : [emptyDetail()]
        setDetails(loaded)
      })
      .catch(() => setError('Failed to load career data.'))
      .finally(() => setFetching(false))
  }, [careerId, isEdit])

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  function handleDetailField(index, field, value) {
    setDetails((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  function addDetail() {
    setDetails((prev) => [...prev, emptyDetail()])
  }

  function removeDetail(index) {
    setDetails((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)

    const payload = {
      ...fields,
      details: details.filter((d) => d.title.trim() || d.content.trim()),
    }

    try {
      const url    = isEdit ? `/api/admin/careers/${careerId}` : '/api/admin/careers'
      const method = isEdit ? 'PUT' : 'POST'
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      router.push('/admin/dashboard/career')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (fetching) return <div className={styles.loading}>Loading…</div>

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{isEdit ? 'Edit Job' : 'Add Job'}</h1>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Job Details</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Job Title *</label>
              <input
                className={styles.input}
                type="text"
                name="jobTitle"
                value={fields.jobTitle}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g. Drone Engineers"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Slug *</label>
              <input
                className={styles.input}
                type="text"
                name="slug"
                value={fields.slug}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g. drone-engineers"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Location *</label>
              <input
                className={styles.input}
                type="text"
                name="location"
                value={fields.location}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g. Chennai"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Experience *</label>
              <input
                className={styles.input}
                type="text"
                name="experience"
                value={fields.experience}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g. 2-4 Years"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Remuneration *</label>
              <input
                className={styles.input}
                type="text"
                name="remuneration"
                value={fields.remuneration}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g. 20-24 LPA"
              />
            </div>
          </div>
        </div>

        {/* Job Details Repeater */}
        <div className={styles.section}>
          <div className={styles.repeaterHeader}>
            <h2 className={styles.sectionTitle}>Job Details Sections</h2>
            <button type="button" className={styles.btnAdd} onClick={addDetail} disabled={loading}>
              + Add Section
            </button>
          </div>

          {details.map((detail, index) => (
            <div key={index} className={styles.repeaterItem}>
              <div className={styles.repeaterTop}>
                <span className={styles.repeaterLabel}>Section {index + 1}</span>
                {details.length > 1 && (
                  <button
                    type="button"
                    className={styles.btnRemove}
                    onClick={() => removeDetail(index)}
                    disabled={loading}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Title</label>
                <input
                  className={styles.input}
                  type="text"
                  value={detail.title}
                  onChange={(e) => handleDetailField(index, 'title', e.target.value)}
                  disabled={loading}
                  placeholder="e.g. About the Role"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Content</label>
                <RichTextEditor
                  value={detail.content}
                  onChange={(html) => handleDetailField(index, 'content', html)}
                  disabled={loading}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={() => router.push('/admin/dashboard/career')}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className={styles.btnSave} disabled={loading}>
            {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  )
}
