'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../services/services.module.css'

export default function CareerPage() {
  const router = useRouter()
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCareers = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/careers')
      const data = await res.json()
      setCareers(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCareers()
  }, [fetchCareers])

  async function handleDelete(career) {
    if (!window.confirm(`Delete "${career.jobTitle}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/careers/${career.id}`, { method: 'DELETE' })
    if (res.ok) fetchCareers()
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Career</h1>
        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push('/admin/dashboard/career/add')}
          >
            + Add Job
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.empty}>Loading…</div>
        ) : careers.length === 0 ? (
          <div className={styles.empty}>No jobs found. Add your first job listing.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Job Title</th>
                <th className={styles.th}>Location</th>
                <th className={styles.th}>Experience</th>
                <th className={styles.th}>Remuneration</th>
                <th className={styles.th}>Slug</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => (
                <tr key={career.id} className={styles.tr}>
                  <td className={styles.td}>{career.jobTitle}</td>
                  <td className={styles.td}>{career.location}</td>
                  <td className={styles.td}>{career.experience}</td>
                  <td className={styles.td}>{career.remuneration}</td>
                  <td className={styles.td}>
                    <span className={styles.slugBadge}>{career.slug}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => router.push(`/admin/dashboard/career/${career.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDelete(career)}
                      >
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
