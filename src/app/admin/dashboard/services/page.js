'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from './services.module.css'

export default function ServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchServices = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/services')
      const data = await res.json()
      setServices(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  async function handleDelete(service) {
    if (!window.confirm(`Delete service "${service.name}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/services/${service.id}`, { method: 'DELETE' })
    if (res.ok) fetchServices()
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Services</h1>
        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push('/admin/dashboard/services/add')}
          >
            + Add Service
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.empty}>Loading…</div>
        ) : services.length === 0 ? (
          <div className={styles.empty}>No services found. Add your first service.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Service Name</th>
                <th className={styles.th}>Slug</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className={styles.tr}>
                  <td className={styles.td}>{service.name}</td>
                  <td className={styles.td}>
                    <span className={styles.slugBadge}>{service.slug}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => router.push(`/admin/dashboard/services/${service.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDelete(service)}
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
