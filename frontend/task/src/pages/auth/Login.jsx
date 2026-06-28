import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiSun, FiMoon } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import useThemeStore from '../../store/themeStore'
import api from '../../services/api'
import './Login.css'

const Login = () => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const setAuth   = useAuthStore((s) => s.setAuth)
  const { theme, toggleTheme } = useThemeStore()
  const navigate  = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Both fields are required')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setAuth(data.user, data.accessToken)
      navigate('/admin')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">

      <button className="login-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
      </button>

      <div className="login-card">
        <NavLink to="/" className="login-logo">XYZ<span /></NavLink>
        <h1>Admin Login</h1>
        <p className="login-sub">Sign in to manage your website</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email" type="email" className="input"
              placeholder="admin@xyzcompany.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password" type="password" className="input"
              placeholder="Your password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <NavLink to="/" className="login-back">← Back to website</NavLink>
      </div>
    </div>
  )
}

export default Login