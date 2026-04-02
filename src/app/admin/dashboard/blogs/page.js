'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../services/services.module.css'
import modal from './blogs.module.css'


export default function BlogsPage() {
  const router = useRouter()
  const [blogs,   setBlogs]   = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/blogs')
      const data = await res.json()
      setBlogs(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  async function handleDelete(blog) {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/blogs/${blog.id}`, { method: 'DELETE' })
    if (res.ok) fetchBlogs()
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blogs</h1>
        <div className={styles.actions}>
          <Link href="/admin/dashboard/blogs/categories" className={`${styles.btnPrimary} ${modal.btnOutline}`}>
            Manage Categories
          </Link>
          <button className={styles.btnPrimary} onClick={() => router.push('/admin/dashboard/blogs/add')}>
            + Add New Blog
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.empty}>Loading…</div>
        ) : blogs.length === 0 ? (
          <div className={styles.empty}>No blogs found. Add your first blog.</div>
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
              {blogs.map((blog) => (
                <tr key={blog.id} className={styles.tr}>
                  <td className={styles.td}>{blog.title}</td>
                  <td className={styles.td}>
                    {blog.categories?.length > 0
                      ? blog.categories.map((c) => c.name).join(', ')
                      : '—'}
                  </td>
                  <td className={styles.td}>
                    <span className={styles.slugBadge}>{blog.slug}</span>
                  </td>
                  <td className={styles.td}>{formatDate(blog.publishedAt || blog.createdAt)}</td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => router.push(`/admin/dashboard/blogs/${blog.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button className={styles.btnDelete} onClick={() => handleDelete(blog)}>
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
