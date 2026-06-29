import { Link, useNavigate } from "react-router-dom";
import { register } from '../../services/auth.api';
import { useState } from "react";
import { FiSun, FiMoon } from 'react-icons/fi';
import useThemeStore from '../../store/themeStore';
import video from '../../assets/video.mp4';
import "./Login.css";

const Register = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

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
          Join Our
          <br />
          Admin
          <br />
          Portal.
        </h2>

        <p className="hero-text">
          Create an administrator account to manage blogs,
          projects, careers, leads, testimonials and more.
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

          <h2>Create Account</h2>

          <p className="auth-line">
            Register to access the Admin Dashboard
          </p>

          {error && <div className="error-box">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

          </form>

          <p className="auth-footer">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;