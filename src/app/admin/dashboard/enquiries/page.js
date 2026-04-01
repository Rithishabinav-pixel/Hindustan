'use client'
import { useState, useEffect, useCallback } from 'react'
import styles from './enquiries.module.css'

const TABS = ['Contact', 'Career']

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function EnquiriesPage() {
  const [activeTab, setActiveTab] = useState('Contact')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading]     = useState(false)

  const fetchEnquiries = useCallback(async (tab) => {
    setLoading(true)
    try {
      const endpoint = tab === 'Career'
        ? '/api/admin/enquiries/career'
        : '/api/admin/enquiries/contact'
      const res  = await fetch(endpoint)
      const data = await res.json()
      setEnquiries(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEnquiries(activeTab)
  }, [activeTab, fetchEnquiries])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Enquiries</h1>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Contact Tab ── */}
      {activeTab === 'Contact' && (
        <div className={styles.tableWrap}>
          {loading ? (
            <div className={styles.empty}>Loading…</div>
          ) : enquiries.length === 0 ? (
            <div className={styles.empty}>No contact enquiries yet.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>#</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Phone</th>
                  <th className={styles.th}>Subject</th>
                  <th className={styles.th}>Message</th>
                  <th className={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((row, i) => (
                  <tr key={row.id} className={styles.tr}>
                    <td className={styles.td}>{i + 1}</td>
                    <td className={styles.td}>{row.name}</td>
                    <td className={styles.td}>{row.email}</td>
                    <td className={styles.td}>{row.phone || '—'}</td>
                    <td className={styles.td}>{row.subject || '—'}</td>
                    <td className={`${styles.td} ${styles.messageCell}`}>{row.message}</td>
                    <td className={styles.td}>
                      <span className={styles.dateBadge}>{formatDate(row.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── Career Tab ── */}
      {activeTab === 'Career' && (
        <div className={styles.tableWrap}>
          {loading ? (
            <div className={styles.empty}>Loading…</div>
          ) : enquiries.length === 0 ? (
            <div className={styles.empty}>No career applications yet.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>#</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Phone</th>
                  <th className={styles.th}>Applied Job</th>
                  <th className={styles.th}>Resume</th>
                  <th className={styles.th}>Message</th>
                  <th className={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((row, i) => (
                  <tr key={row.id} className={styles.tr}>
                    <td className={styles.td}>{i + 1}</td>
                    <td className={styles.td}>{row.name}</td>
                    <td className={styles.td}>{row.email}</td>
                    <td className={styles.td}>{row.phone || '—'}</td>
                    <td className={styles.td}>{row.jobTitle}</td>
                    <td className={styles.td}>
                      {row.resumePath ? (
                        <a
                          href={row.resumePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.resumeLink}
                        >
                          Download
                        </a>
                      ) : '—'}
                    </td>
                    <td className={`${styles.td} ${styles.messageCell}`}>{row.message || '—'}</td>
                    <td className={styles.td}>
                      <span className={styles.dateBadge}>{formatDate(row.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
