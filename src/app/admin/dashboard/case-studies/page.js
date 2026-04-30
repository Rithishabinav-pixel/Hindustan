'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../services/services.module.css'
import modal from './caseStudies.module.css'


export default function CaseStudiesPage() {
  const router = useRouter()
  const [caseStudies, setCaseStudies] = useState([])
  const [loading,     setLoading]     = useState(true)

  const fetchCaseStudies = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/case-studies')
      const data = await res.json()
      setCaseStudies(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCaseStudies() }, [fetchCaseStudies])

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/case-studies/${item.id}`, { method: 'DELETE' })
    if (res.ok) fetchCaseStudies()
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Case Studies</h1>
        <div className={styles.actions}>
          <Link href="/admin/dashboard/case-studies/categories" className={`${styles.btnPrimary} ${modal.btnOutline}`}>
            Manage Categories
          </Link>
          <button className={styles.btnPrimary} onClick={() => router.push('/admin/dashboard/case-studies/add')}>
            + Add New Case Study
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.empty}>Loading…</div>
        ) : caseStudies.length === 0 ? (
          <div className={styles.empty}>No case studies found. Add your first case study.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Title</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Slug</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map((item) => (
                <tr key={item.id} className={styles.tr}>
                  <td className={styles.td}>{item.title}</td>
                  <td className={styles.td}>
                    {item.categories?.length > 0
                      ? item.categories.map((c) => c.name).join(', ')
                      : '—'}
                  </td>
                  <td className={styles.td}>
                    <span className={styles.slugBadge}>{item.slug}</span>
                  </td>
                  <td className={styles.td}>{formatDate(item.publishedAt || item.createdAt)}</td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => router.push(`/admin/dashboard/case-studies/${item.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button className={styles.btnDelete} onClick={() => handleDelete(item)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}
