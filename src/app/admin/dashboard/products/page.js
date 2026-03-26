'use client'
import { useState, useEffect, useCallback } from 'react'
import AddProductModal from '../../components/AddProductModal'
import styles from './products.module.css'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true)
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data)
    } finally {
      setLoadingProducts(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  async function handleDeleteProduct(product) {
    if (!window.confirm(`Delete product "${product.name}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' })
    if (res.ok) fetchProducts()
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Products</h1>
        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => setShowAddProduct(true)}
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loadingProducts ? (
          <div className={styles.empty}>Loading…</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>No products found. Add your first product.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Product Name</th>
                <th className={styles.th}>Product Image</th>
                <th className={styles.th}>Product Link</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={styles.tr}>
                  <td className={styles.td}>{product.name}</td>
                  <td className={styles.td}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.thumbnail}
                    />
                  </td>
                  <td className={styles.td}>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {product.link}
                    </a>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDeleteProduct(product)}
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

      {showAddProduct && (
        <AddProductModal
          onClose={() => setShowAddProduct(false)}
          onSuccess={fetchProducts}
        />
      )}

      {editingProduct && (
        <AddProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  )
}
