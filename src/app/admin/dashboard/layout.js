import Sidebar from '../components/Sidebar'
import styles from './dashboard.module.css'

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  )
}
