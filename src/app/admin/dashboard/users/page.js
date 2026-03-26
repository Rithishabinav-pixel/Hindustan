'use client'
import { useState, useEffect, useCallback } from 'react'
import CreateRoleModal from '../../components/CreateRoleModal'
import AddUserModal from '../../components/AddUserModal'
import EditUserModal from '../../components/EditUserModal'
import styles from './users.module.css'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [showCreateRole, setShowCreateRole] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data)
    } finally {
      setLoadingUsers(false)
    }
  }, [])

  const fetchRoles = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/roles')
      const data = await res.json()
      setRoles(data)
    } catch {
      // non-blocking — users table still loads independently
    }
  }, [])

  async function handleDeleteUser(user) {
    if (!window.confirm(`Delete user "${user.username}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    if (res.ok) fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [fetchUsers, fetchRoles])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
        <div className={styles.actions}>
          <button
            className={styles.btnSecondary}
            onClick={() => setShowCreateRole(true)}
          >
            Create Role
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => setShowAddUser(true)}
          >
            + Add User
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {loadingUsers ? (
          <div className={styles.empty}>Loading…</div>
        ) : users.length === 0 ? (
          <div className={styles.empty}>No users found. Add your first user.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Username</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Role</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td}>{user.username}</td>
                  <td className={styles.td}>{user.name}</td>
                  <td className={styles.td}>
                    <span className={styles.roleBadge}>
                      {user.role?.name ?? '—'}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => setEditingUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDeleteUser(user)}
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

      {showCreateRole && (
        <CreateRoleModal
          onClose={() => setShowCreateRole(false)}
          onSuccess={fetchRoles}
        />
      )}

      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onSuccess={fetchUsers}
          roles={roles}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          roles={roles}
          onClose={() => setEditingUser(null)}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  )
}
