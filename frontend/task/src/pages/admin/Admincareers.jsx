import { useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUsers } from 'react-icons/fi'
import api from '../../services/api'
import './Admincareers.css';

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Operations']
const TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelancing']
const STATUS_TABS = ['All', 'Open', 'Paused', 'Closed']
const APP_STATUSES = ['received', 'reviewing', 'shortlisted', 'rejected', 'hired']

const EMPTY_FORM = {
  title: '',
  department: 'Engineering',
  type: 'Full-Time',
  location: 'On-site',
  description: '',
  requirements: '',
  responsibilities: '',
  skills: '',
  salaryRange: '',
  status: 'open',
  applicationDeadline: '',
}

const Careers = () => {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [saving, setSaving]       = useState(false)
  const [formError, setFormError] = useState('')

  const [appsFor, setAppsFor]   = useState(null)
  const [applications, setApplications] = useState([])
  const [appsLoading, setAppsLoading]    = useState(false)

  const fetchCareers = () => {
    setLoading(true)
    // Admin view needs every status, not just "open" — the public /careers
    // endpoint only returns open roles, so this assumes a future
    // admin-scoped endpoint (see note below the component).
    api.get('/careers')
      .then(({ data }) => setCareers(data.careers || []))
      .catch(() => setError('Could not load job postings.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCareers()
  }, [])

  const filtered = careers.filter((c) => {
    if (statusFilter === 'All') return true
    return c.status === statusFilter.toLowerCase()
  })

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormError('')
    setModalOpen(true)
  }

  const openEdit = (career) => {
    setEditingId(career._id)
    setForm({
      title: career.title || '',
      department: career.department || 'Engineering',
      type: career.type || 'Full-Time',
      location: career.location || 'On-site',
      description: career.description || '',
      requirements: (career.requirements || []).join('\n'),
      responsibilities: (career.responsibilities || []).join('\n'),
      skills: (career.skills || []).join(', '),
      salaryRange: career.salaryRange || '',
      status: career.status || 'open',
      applicationDeadline: career.applicationDeadline
        ? career.applicationDeadline.slice(0, 10)
        : '',
    })
    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!form.title.trim() || !form.description.trim()) {
      setFormError('Title and description are required.')
      return
    }

    const payload = {
      ...form,
      requirements: form.requirements.split('\n').map((s) => s.trim()).filter(Boolean),
      responsibilities: form.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
    }
    if (!payload.applicationDeadline) delete payload.applicationDeadline

    setSaving(true)
    try {
      if (editingId) {
        await api.put(`/careers/${editingId}`, payload)
      } else {
        await api.post('/careers', payload)
      }
      setModalOpen(false)
      fetchCareers()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save this posting.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this posting and all its applications? This cannot be undone.')) return
    try {
      await api.delete(`/careers/${id}`)
      setCareers((prev) => prev.filter((c) => c._id !== id))
    } catch {
      setError('Could not delete this posting.')
    }
  }

  const openApplications = (career) => {
    setAppsFor(career)
    setAppsLoading(true)
    api.get(`/careers/${career._id}/applications`)
      .then(({ data }) => setApplications(data.applications || []))
      .catch(() => setApplications([]))
      .finally(() => setAppsLoading(false))
  }

  const closeApplications = () => {
    setAppsFor(null)
    setApplications([])
  }

  const updateAppStatus = async (appId, status) => {
    try {
      await api.patch(`/careers/applications/${appId}/status`, { status })
      setApplications((prev) => prev.map((a) => (a._id === appId ? { ...a, status } : a)))
    } catch {
      // surfaced inline per-row would need its own error state; kept simple here
    }
  }

  return (
    <div className="admin-careers">

      <div className="admin-careers-head">
        <div>
          <h1>Careers</h1>
          <p>Manage open positions and review applicants.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <FiPlus /> New posting
        </button>
      </div>

      <div className="tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            className={`tab ${statusFilter === tab ? 'active' : ''}`}
            onClick={() => setStatusFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && <div className="error-box">{error}</div>}

      {loading && (
        <div className="admin-careers-list">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton admin-career-skeleton" />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="empty">
          <div className="empty-icon">—</div>
          <p>No postings match this filter.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="admin-careers-list">
          {filtered.map((career) => (
            <div key={career._id} className="admin-career-row card">

              <div className="admin-career-info">
                <div className="admin-career-row-head">
                  <span className="badge badge-blue">{career.department}</span>
                  <span className="badge">{career.type}</span>
                  <span className={`badge ${career.status === 'open' ? 'badge-green' : ''}`}>
                    {career.status}
                  </span>
                </div>
                <h3 className="admin-career-title">{career.title}</h3>
                <div className="admin-career-meta">
                  <span>{career.location}</span>
                  {career.salaryRange && <span className="dot">•</span>}
                  {career.salaryRange && <span>{career.salaryRange}</span>}
                </div>
              </div>

              <div className="admin-career-actions">
                <button className="icon-btn" onClick={() => openApplications(career)} aria-label="View applications">
                  <FiUsers />
                </button>
                <button className="icon-btn" onClick={() => openEdit(career)} aria-label="Edit posting">
                  <FiEdit2 />
                </button>
                <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(career._id)} aria-label="Delete posting">
                  <FiTrash2 />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Create / edit modal */}
      {modalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="modal-head">
              <h2>{editingId ? 'Edit posting' : 'New posting'}</h2>
              <div className="close-btn" onClick={closeModal}>
                <FiX />
              </div>
            </div>

            {formError && <div className="error-box">{formError}</div>}

            <form className="form-stack" onSubmit={handleSubmit}>

              <div className="form-field">
                <label>Job title</label>
                <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="Senior Frontend Engineer" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Department</label>
                  <select className="input" name="department" value={form.department} onChange={handleChange}>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Type</label>
                  <select className="input" name="type" value={form.type} onChange={handleChange}>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Location</label>
                  <input className="input" name="location" value={form.location} onChange={handleChange} placeholder="Remote / On-site" />
                </div>
                <div className="form-field">
                  <label>Salary range</label>
                  <input className="input" name="salaryRange" value={form.salaryRange} onChange={handleChange} placeholder="₹10L – ₹18L" />
                </div>
              </div>

              <div className="form-field">
                <label>Description</label>
                <textarea
                  className="input admin-career-textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="What's this role about..."
                  rows={4}
                />
              </div>

              <div className="form-field">
                <label>Responsibilities (one per line)</label>
                <textarea
                  className="input admin-career-textarea"
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  placeholder={"Ship features end to end\nReview pull requests"}
                  rows={3}
                />
              </div>

              <div className="form-field">
                <label>Requirements (one per line)</label>
                <textarea
                  className="input admin-career-textarea"
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder={"3+ years with React\nComfortable with REST APIs"}
                  rows={3}
                />
              </div>

              <div className="form-field">
                <label>Skills (comma separated)</label>
                <input className="input" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Status</label>
                  <select className="input" name="status" value={form.status} onChange={handleChange}>
                    <option value="open">Open</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Application deadline</label>
                  <input className="input" type="date" name="applicationDeadline" value={form.applicationDeadline} onChange={handleChange} />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Save changes' : 'Create posting'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Applications modal */}
      {appsFor && (
        <div className="overlay" onClick={closeApplications}>
          <div className="modal admin-careers-apps-modal" onClick={(e) => e.stopPropagation()}>

            <div className="modal-head">
              <h2>Applicants — {appsFor.title}</h2>
              <div className="close-btn" onClick={closeApplications}>
                <FiX />
              </div>
            </div>

            {appsLoading && <div className="skeleton admin-career-skeleton" />}

            {!appsLoading && applications.length === 0 && (
              <div className="empty">
                <div className="empty-icon">—</div>
                <p>No applications yet.</p>
              </div>
            )}

            {!appsLoading && applications.length > 0 && (
              <div className="admin-applications-list">
                {applications.map((app) => (
                  <div key={app._id} className="admin-application-row">
                    <div className="admin-application-info">
                      <div className="admin-application-name">{app.name}</div>
                      <div className="admin-application-meta">
                        <a href={`mailto:${app.email}`}>{app.email}</a>
                        {app.phone && <span className="dot">•</span>}
                        {app.phone && <span>{app.phone}</span>}
                      </div>
                      <div className="admin-application-links">
                        <a href={app.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
                        {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" rel="noreferrer">Portfolio</a>}
                        {app.linkedinUrl && <a href={app.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}
                      </div>
                    </div>
                    <select
                      className="input admin-application-status"
                      value={app.status}
                      onChange={(e) => updateAppStatus(app._id, e.target.value)}
                    >
                      {APP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

export default Careers