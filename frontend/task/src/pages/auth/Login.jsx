import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSun, FiMoon } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import useThemeStore from '../../store/themeStore'
import { login } from '../../services/auth.api'
import video from '../../assets/video.mp4'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const setAuth  = useAuthStore((s) => s.setAuth)
  const { theme, toggleTheme } = useThemeStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Both fields are required')
      return
    }

    setLoading(true)
    try {
      const res = await login(formData)
      setAuth(res.data.user, res.data.accessToken)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">

      <button className="auth-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
      </button>

      <div className="auth-left">

        <h1 className="auth-logo">
          Throne<span>8</span>
        </h1>

        <h2 className="hero-heading">
          Engineering
          <br />
          Tomorrow's
          <br />
          Digital Future.
        </h2>

        <p className="hero-text">
          We build enterprise software, AI solutions and scalable
          digital products for startups, businesses and governments.
        </p>

        <div className="hero-image">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
          />
        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome Back</h2>

          <p className="auth-line">
            Login to access the Admin Dashboard
          </p>

          {error && <div className="error-box">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>

          </form>

          <p className="auth-footer">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login