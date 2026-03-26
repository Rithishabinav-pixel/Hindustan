import './admin-global.css'
import AdminBodyClass from './AdminBodyClass'

export const metadata = {
  title: 'Admin — Hindustan Drones',
}

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminBodyClass />
      {children}
    </>
  )
}
