import { useState } from 'react'
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../services/api'
import './Contact.css'

const BUDGETS = ['Not sure yet', 'Under $5k', '$5k – $15k', '$15k – $50k', '$50k+']

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  budget: '',
  message: '',
}

const Contact = () => {
  const [form, setForm]       = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email, and message are required.')
      return
    }

    setSubmitting(true)
    try {
      await api.post('/leads/contact', form)
      setSubmitted(true)
      setForm(EMPTY_FORM)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="page">

        <div className="page-hero">
          <div className="container">
            <span className="tag">Get in touch</span>
            <h1>Let's build<br />something together</h1>
            <p>Tell us about your project and we'll get back to you within a day.</p>
          </div>
        </div>

        <section className="section">
          <div className="container contact-grid">

            {/* Form */}
            <div className="contact-form-col">
              {submitted ? (
                <div className="success-box">
                  Thanks — your message has been sent. We'll be in touch soon.
                </div>
              ) : (
                <form className="form-stack" onSubmit={handleSubmit}>

                  {error && <div className="error-box">{error}</div>}

                  <div className="form-row">
                    <div className="form-field">
                      <label>Name</label>
                      <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
                    </div>
                    <div className="form-field">
                      <label>Email</label>
                      <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Phone (optional)</label>
                      <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                    </div>
                    <div className="form-field">
                      <label>Company (optional)</label>
                      <input className="input" name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Budget</label>
                    <select className="input" name="budget" value={form.budget} onChange={handleChange}>
                      <option value="">Select a range</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Message</label>
                    <textarea
                      className="input contact-textarea"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={6}
                    />
                  </div>

                  <div className="form-actions contact-form-actions">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send message'}
                    </button>
                  </div>

                </form>
              )}
            </div>

            {/* Info panel */}
            <div className="contact-info-col">
              <div className="contact-info-card card">
                <h3>Contact details</h3>

                <a href="mailto:hello@xyzcompany.com" className="contact-info-row">
                  <FiMail /> omshivhare666@gmail.com
                </a>

                <div className="contact-info-row">
                  <FiMapPin /> Bhopal, Madhya Pradesh, India
                </div>

                <div className="contact-info-divider" />

                <h4>Follow us</h4>
                <div className="contact-socials">
                  <a href="https://github.com/Omshivhare45" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <FiGithub />
                  </a>
                  <a href="https://linkedin.com/omshivhare45" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <FiLinkedin />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                    <FiTwitter />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Contact