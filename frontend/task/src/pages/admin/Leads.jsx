import { useEffect, useState } from 'react'
import { FiTrash2, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi'
import api from '../../services/api'
import './Leads.css'

const STATUS_TABS = ['All', 'New', 'Read', 'Replied', 'Converted', 'Closed']
const STATUSES = ['new', 'read', 'replied', 'converted', 'closed']

const Leads = () => {
  const [leads, setLeads]     = useState([])
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [openId, setOpenId]   = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [savingNote, setSavingNote] = useState(false)

  const fetchLeads = () => {
    setLoading(true)
    api.get('/leads', { params: { limit: 100 } })
      .then(({ data }) => {
        setLeads(data.leads || [])
        setStats(data.stats || null)
      })
      .catch(() => setError('Could not load leads.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const filtered = statusFilter === 'All'
    ? leads
    : leads.filter((l) => l.status === statusFilter.toLowerCase())

  const toggleOpen = (lead) => {
    if (openId === lead._id) {
      setOpenId(null)
      return
    }
    setOpenId(lead._id)
    setNoteDraft(lead.adminNote || '')

    // Opening a "new" lead marks it read server-side (getLeadById does this) —
    // mirror that locally so the badge updates without a full refetch.
    if (lead.status === 'new') {
      api.get(`/leads/${lead._id}`).then(() => {
        setLeads((prev) => prev.map((l) => (l._id === lead._id ? { ...l, status: 'read' } : l)))
        setStats((prev) => prev && { ...prev, new: Math.max(0, prev.new - 1), read: prev.read + 1 })
      }).catch(() => {})
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/leads/${id}/status`, { status })
      setLeads((prev) => prev.map((l) => (l._id === id ? data.lead : l)))
    } catch {
      setError('Could not update status.')
    }
  }

  const saveNote = async (id) => {
    setSavingNote(true)
    try {
      const { data } = await api.patch(`/leads/${id}/status`, { adminNote: noteDraft })
      setLeads((prev) => prev.map((l) => (l._id === id ? data.lead : l)))
    } catch {
      setError('Could not save note.')
    } finally {
      setSavingNote(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead? This cannot be undone.')) return
    try {
      await api.delete(`/leads/${id}`)
      setLeads((prev) => prev.filter((l) => l._id !== id))
    } catch {
      setError('Could not delete lead.')
    }
  }

  return (
    <div className="admin-leads">

      <div className="admin-leads-head">
        <div>
          <h1>Leads</h1>
          <p>Messages submitted through the contact form.</p>
        </div>
      </div>

      {stats && (
        <div className="leads-stats-row">
          <div className="leads-stat card">
            <span className="leads-stat-value">{stats.new}</span>
            <span className="leads-stat-label">New</span>
          </div>
          <div className="leads-stat card">
            <span className="leads-stat-value">{stats.read}</span>
            <span className="leads-stat-label">Read</span>
          </div>
          <div className="leads-stat card">
            <span className="leads-stat-value">{stats.replied}</span>
            <span className="leads-stat-label">Replied</span>
          </div>
          <div className="leads-stat card">
            <span className="leads-stat-value">{stats.converted}</span>
            <span className="leads-stat-label">Converted</span>
          </div>
        </div>
      )}

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
        <div className="admin-leads-list">
          {[1, 2, 3, 4].map((n) => <div key={n} className="skeleton admin-lead-skeleton" />)}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="empty">
          <div className="empty-icon">—</div>
          <p>No leads match this filter.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="admin-leads-list">
          {filtered.map((lead) => (
            <div key={lead._id} className="admin-lead-card card">

              <div className="admin-lead-row" onClick={() => toggleOpen(lead)}>
                <div className="admin-lead-info">
                  <div className="admin-lead-row-head">
                    <span className={`badge ${lead.status === 'new' ? 'badge-blue' : ''} ${lead.status === 'converted' ? 'badge-green' : ''}`}>
                      {lead.status}
                    </span>
                    <span className="badge">{lead.source}</span>
                  </div>
                  <div className="admin-lead-name">{lead.name}</div>
                  <div className="admin-lead-meta">
                    <span><FiMail /> {lead.email}</span>
                    {lead.phone && <span><FiPhone /> {lead.phone}</span>}
                    {lead.company && <span><FiBriefcase /> {lead.company}</span>}
                  </div>
                  <p className="admin-lead-message-preview">{lead.message}</p>
                </div>
                <span className="admin-lead-date">{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>

              {openId === lead._id && (
                <div className="admin-lead-expanded">

                  <div className="admin-lead-full-message">
                    <strong>Message</strong>
                    <p>{lead.message}</p>
                    {lead.budget && <p className="admin-lead-budget">Budget: {lead.budget}</p>}
                  </div>

                  <div className="admin-lead-controls">
                    <div className="form-field">
                      <label>Status</label>
                      <select
                        className="input"
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Admin note</label>
                      <textarea
                        className="input admin-lead-note"
                        rows={3}
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Internal note, not visible to the lead..."
                      />
                    </div>

                    <div className="admin-lead-actions">
                      <button className="btn btn-outline" onClick={() => saveNote(lead._id)} disabled={savingNote}>
                        {savingNote ? 'Saving...' : 'Save note'}
                      </button>
                      <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(lead._id)} aria-label="Delete lead">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Leads