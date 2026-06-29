import { useEffect, useState } from 'react'
import { FiX, FiMapPin, FiClock } from 'react-icons/fi'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../services/api'
import './Career.css'

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Operations']

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  resumeUrl: '',
  portfolioUrl: '',
  linkedinUrl: '',
  coverLetter: '',
}

const Careers = () => {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [department, setDepartment] = useState('All')

  const [applyFor, setApplyFor] = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError]   = useState('')
  const [submitted, setSubmitted]   = useState(false)

  useEffect(() => {
    api.get('/careers')
      .then(({ data }) => setCareers(data.careers || []))
      .catch(() => setError('Could not load open positions.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = department === 'All'
    ? careers
    : careers.filter((c) => c.department === department)

  const openApply = (career) => {
    setApplyFor(career)
    setForm(EMPTY_FORM)
    setFormError('')
    setSubmitted(false)
  }

  const closeApply = () => setApplyFor(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!form.name.trim() || !form.email.trim()) {
      setFormError('Name and email are required.')
      return
    }
    if (!form.resumeUrl.trim()) {
      setFormError('A resume link is required.')
      return
    }

    setSubmitting(true)
    try {
      await api.post(`/careers/${applyFor._id}/apply`, form)
      setSubmitted(true)
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not submit your application.')
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
            <span className="tag">Join us</span>
            <h1>Build the future<br />with us</h1>
            <p>We're always looking for people who care about doing great work.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">

            <div className="tabs">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d}
                  className={`tab ${department === d ? 'active' : ''}`}
                  onClick={() => setDepartment(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            {error && <div className="error-box">{error}</div>}

            {loading && (
              <div className="careers-list">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="skeleton careers-skeleton" />
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="empty">
                <div className="empty-icon">—</div>
                <p>No open positions in this department right now.</p>
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div className="careers-list">
                {filtered.map((career) => (
                  <div key={career._id} className="career-card card">

                    <div className="career-card-main">
                      <div className="career-card-head">
                        <span className="badge badge-blue">{career.department}</span>
                        <span className="badge">{career.type}</span>
                      </div>

                      <h3 className="career-title">{career.title}</h3>

                      <div className="career-meta">
                        <span><FiMapPin /> {career.location}</span>
                        {career.salaryRange && <span className="dot">•</span>}
                        {career.salaryRange && <span>{career.salaryRange}</span>}
                      </div>

                      <p className="career-desc">{career.description}</p>

                      {career.skills?.length > 0 && (
                        <div className="career-skills">
                          {career.skills.slice(0, 6).map((s) => (
                            <span key={s} className="career-skill">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="career-card-action">
                      <button className="btn btn-primary" onClick={() => openApply(career)}>
                        Apply now
                      </button>
                      {career.applicationDeadline && (
                        <span className="career-deadline">
                          <FiClock /> Apply by {new Date(career.applicationDeadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />

      {applyFor && (
        <div className="overlay" onClick={closeApply}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="modal-head">
              <h2>Apply — {applyFor.title}</h2>
              <div className="close-btn" onClick={closeApply}>
                <FiX />
              </div>
            </div>

            {submitted ? (
              <div className="success-box">
                Application submitted! We'll be in touch if it's a match.
              </div>
            ) : (
              <form className="form-stack" onSubmit={handleSubmit}>

                {formError && <div className="error-box">{formError}</div>}

                <div className="form-row">
                  <div className="form-field">
                    <label>Full name</label>
                    <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" />
                  </div>
                </div>

                <div className="form-field">
                  <label>Phone</label>
                  <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>

                <div className="form-field">
                  <label>Resume link</label>
                  <input className="input" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="https://drive.google.com/..." />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Portfolio (optional)</label>
                    <input className="input" name="portfolioUrl" value={form.portfolioUrl} onChange={handleChange} placeholder="https://..." />
                  </div>
                  <div className="form-field">
                    <label>LinkedIn (optional)</label>
                    <input className="input" name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>

                <div className="form-field">
                  <label>Cover letter (optional)</label>
                  <textarea
                    className="input career-textarea"
                    name="coverLetter"
                    value={form.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you're a good fit..."
                    rows={5}
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={closeApply}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit application'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </>
  )
}

export default Careers