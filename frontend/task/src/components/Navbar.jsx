import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import useThemeStore from '../store/themeStore'  // fixed: was Themestore
import './Navbar.css'

const navLinks = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Services',   to: '/services' },
  { label: 'Portfolio',  to: '/portfolio' },
  { label: 'Blog',       to: '/blog' },
  { label: 'Careers',    to: '/careers' },
  { label: 'Contact',    to: '/contact' },
]

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  
  useEffect(() => setMenuOpen(false), [location])


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner container">

        
        <NavLink to="/" className="navbar-logo">
          XYZ<span className="navbar-dot" />
        </NavLink>

        
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        
        <div className="navbar-actions">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <NavLink to="/contact" className="btn btn-primary consult-btn">
            Book Consultation
          </NavLink>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

    
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Book Consultation
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar