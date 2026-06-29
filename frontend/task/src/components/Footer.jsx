import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">XYZ<span /></div>
          <p>Building digital products that scale. Web, Mobile, AI and Cloud.</p>
          <div className="footer-socials">
            <a href="https://github.com/Omshivhare45"   target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/omshivhare45" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://twitter.com"  target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>Company</h4>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/careers">Careers</NavLink>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Admin Login</NavLink>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:hello@xyzcompany.com">hello@xyzcompany.com</a>
          <span>Bhopal, Madhya Pradesh, India</span>
        </div>

      </div>

     
    </footer>
  )
}

export default Footer