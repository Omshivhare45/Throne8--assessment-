import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiFileText, FiBriefcase, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import { logout } from '../../services/auth.api'
import logo from '../../assets/logo.jpg'
import './AdminLayout.css'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin',          icon: FiGrid,      end: true },
  { label: 'Blogs',     to: '/admin/blogs',    icon: FiFileText },
  { label: 'Careers',   to: '/admin/careers',  icon: FiBriefcase },
  { label: 'Leads',     to: '/admin/leads',    icon: FiUsers },
  { label: 'Settings',  to: '/admin/settings', icon: FiSettings },
]

const AdminLayout = () => {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // even if the request fails, clear local state so the UI doesn't get stuck
    } finally {
      clearAuth()
      navigate('/login')
    }
  }

  return (
    <div className="admin-shell">

      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src={logo} alt="Throne8" className="admin-sidebar-logo-img" />
          <span>Throne<span className="admin-logo-accent">8</span></span>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'admin-nav-link-active' : ''}`}
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <div className="admin-user">
            <div className="admin-user-avatar">
              {(user?.name || user?.username || '?').slice(0, 1).toUpperCase()}
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">{user?.name || user?.username}</span>
              <span className="admin-user-role">{user?.role}</span>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout} aria-label="Log out">
            <FiLogOut />
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout