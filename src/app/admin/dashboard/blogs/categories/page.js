'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../services/services.module.css'
import modal from '../blogs.module.css'

export default function CategoriesPage() {
  const router = useRouter()

  const [categories, setCategories]   = useState([])
  const [loading,    setLoading]      = useState(true)

  // Add modal
  const [showAdd,    setShowAdd]      = useState(false)
  const [addName,    setAddName]      = useState('')
  const [addLoading, setAddLoading]   = useState(false)
  const [addError,   setAddError]     = useState('')

  // Edit modal
  const [editCat,    setEditCat]      = useState(null)   // { id, name, slug }
  const [editName,   setEditName]     = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [editError,   setEditError]   = useState('')

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/categories')
      const data = await res.json()
      setCategories(data.success && Array.isArray(data.data) ? data.data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCategories() }, [fetchCategories])

  async function handleAdd(e) {
    e.preventDefault()
    if (!addName.trim()) return
    setAddLoading(true)
    setAddError('')
    try {
      const res  = await fetch('/api/admin/categories', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: addName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create category.')
      setAddName('')
      setShowAdd(false)
      fetchCategories()
    } catch (err) {
      setAddError(err.message)
    } finally {
      setAddLoading(false)
    }
  }

  function openEdit(cat) {
    setEditCat(cat)
    setEditName(cat.name)
    setEditError('')
  }

  async function handleEdit(e) {
    e.preventDefault()
    if (!editName.trim()) return
    setEditLoading(true)
    setEditError('')
    try {
      const res  = await fetch(`/api/admin/categories/${editCat.id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: editName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update category.')
      setEditCat(null)
      fetchCategories()
    } catch (err) {
      setEditError(err.message)
    } finally {
      setEditLoading(false)
    }
  }

  async function handleDelete(cat) {
    if (!window.confirm(`Delete category "${cat.name}"? This will remove it from all blogs.`)) return
    const res = await fetch(`/api/admin/categories/${cat.id}`, { method: 'DELETE' })
    if (res.ok) fetchCategories()
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blog Categories</h1>
        <div className={styles.actions}>
          <button className={`${styles.btnPrimary} ${modal.btnOutline}`} onClick={() => router.push('/admin/dashboard/blogs')}>
            ← Back to Blogs
          </button>
          <button className={styles.btnPrimary} onClick={() => { setAddName(''); setAddError(''); setShowAdd(true) }}>
            + Add Category
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.empty}>Loading…</div>
        ) : categories.length === 0 ? (
          <div className={styles.empty}>No categories found. Add your first category.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Slug</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className={styles.tr}>
                  <td className={styles.td}>{cat.name}</td>
                  <td className={styles.td}>
                    <span className={styles.slugBadge}>{cat.slug}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button className={styles.btnEdit} onClick={() => openEdit(cat)}>Edit</button>
                      <button className={styles.btnDelete} onClick={() => handleDelete(cat)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Category Modal */}
      {showAdd && (
        <div className={modal.overlay} onClick={() => setShowAdd(false)}>
          <div className={modal.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={modal.modalHeader}>
              <h2 className={modal.modalTitle}>Add Category</h2>
              <button className={modal.closeBtn} onClick={() => setShowAdd(false)}>×</button>
            </div>
            <form onSubmit={handleAdd}>
              {addError && <div className={modal.errorBanner}>{addError}</div>}
              <div className={modal.field}>
                <label className={modal.label}>Category Name *</label>
                <input
                  className={modal.input}
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="e.g. Agriculture"
                  required
                  disabled={addLoading}
                  autoFocus
                />
              </div>
              <div className={modal.modalActions}>
                <button type="button" className={modal.btnCancel} onClick={() => setShowAdd(false)} disabled={addLoading}>Cancel</button>
                <button type="submit" className={modal.btnSave} disabled={addLoading}>
                  {addLoading ? 'Adding…' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editCat && (
        <div className={modal.overlay} onClick={() => setEditCat(null)}>
          <div className={modal.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={modal.modalHeader}>
              <h2 className={modal.modalTitle}>Edit Category</h2>
              <button className={modal.closeBtn} onClick={() => setEditCat(null)}>×</button>
            </div>
            <form onSubmit={handleEdit}>
              {editError && <div className={modal.errorBanner}>{editError}</div>}
              <div className={modal.field}>
                <label className={modal.label}>Category Name *</label>
                <input
                  className={modal.input}
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Agriculture"
                  required
                  disabled={editLoading}
                  autoFocus
                />
              </div>
              <div className={modal.modalActions}>
                <button type="button" className={modal.btnCancel} onClick={() => setEditCat(null)} disabled={editLoading}>Cancel</button>
                <button type="submit" className={modal.btnSave} disabled={editLoading}>
                  {editLoading ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
