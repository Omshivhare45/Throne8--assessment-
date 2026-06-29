import { useEffect, useState } from 'react'
import { FiFileText, FiBriefcase, FiFolder, FiInbox } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './Dashboard.css'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  const [leadStats, setLeadStats] = useState(null)
  const [recentLeads, setRecentLeads] = useState([])
  const [blogCount, setBlogCount]       = useState(null)
  const [careerCount, setCareerCount]   = useState(null)
  const [projectCount, setProjectCount] = useState(null)

  useEffect(() => {
    Promise.allSettled([
      api.get('/leads', { params: { limit: 5 } }),
      api.get('/blogs', { params: { limit: 1 } }),
      api.get('/careers'),
      api.get('/projects'),
    ]).then(([leadsRes, blogsRes, careersRes, projectsRes]) => {

      if (leadsRes.status === 'fulfilled') {
        setLeadStats(leadsRes.value.data.stats || null)
        setRecentLeads(leadsRes.value.data.leads || [])
      } else {
        setError('Some dashboard data failed to load.')
      }

      if (blogsRes.status === 'fulfilled') {
        setBlogCount(blogsRes.value.data.pagination?.total ?? null)
      }
      if (careersRes.status === 'fulfilled') {
        setCareerCount((careersRes.value.data.careers || []).length)
      }
      if (projectsRes.status === 'fulfilled') {
        setProjectCount((projectsRes.value.data.projects || []).length)
      }

      setLoading(false)
    })
  }, [])

  const newLeads = leadStats?.new ?? 0

  return (
    <div className="admin-dashboard">

      <div className="admin-dashboard-head">
        <h1>Dashboard</h1>
        <p>An overview of what's happening across the site.</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      {loading ? (
        <div className="dashboard-stats-grid">
          {[1, 2, 3, 4].map((n) => <div key={n} className="skeleton dashboard-stat-skeleton" />)}
        </div>
      ) : (
        <div className="dashboard-stats-grid">

          <Link to="/admin/leads" className="dashboard-stat-card card">
            <div className="dashboard-stat-icon dashboard-stat-icon-blue"><FiInbox /></div>
            <div>
              <span className="dashboard-stat-value">{newLeads}</span>
              <span className="dashboard-stat-label">New leads</span>
            </div>
          </Link>

          <Link to="/admin/blogs" className="dashboard-stat-card card">
            <div className="dashboard-stat-icon dashboard-stat-icon-green"><FiFileText /></div>
            <div>
              <span className="dashboard-stat-value">{blogCount ?? '—'}</span>
              <span className="dashboard-stat-label">Published posts</span>
            </div>
          </Link>

          <Link to="/admin/careers" className="dashboard-stat-card card">
            <div className="dashboard-stat-icon dashboard-stat-icon-accent"><FiBriefcase /></div>
            <div>
              <span className="dashboard-stat-value">{careerCount ?? '—'}</span>
              <span className="dashboard-stat-label">Open positions</span>
            </div>
          </Link>

          <div className="dashboard-stat-card card">
            <div className="dashboard-stat-icon"><FiFolder /></div>
            <div>
              <span className="dashboard-stat-value">{projectCount ?? '—'}</span>
              <span className="dashboard-stat-label">Published projects</span>
            </div>
          </div>

        </div>
      )}

      <div className="dashboard-grid">

        {/* Lead funnel */}
        <div className="card dashboard-panel">
          <h3>Lead funnel</h3>
          {leadStats ? (
            <div className="dashboard-funnel">
              <div className="dashboard-funnel-row">
                <span className="badge badge-blue">New</span>
                <span>{leadStats.new}</span>
              </div>
              <div className="dashboard-funnel-row">
                <span className="badge">Read</span>
                <span>{leadStats.read}</span>
              </div>
              <div className="dashboard-funnel-row">
                <span className="badge badge-accent">Replied</span>
                <span>{leadStats.replied}</span>
              </div>
              <div className="dashboard-funnel-row">
                <span className="badge badge-green">Converted</span>
                <span>{leadStats.converted}</span>
              </div>
            </div>
          ) : (
            <p className="dashboard-empty-text">Lead data isn't available right now.</p>
          )}
        </div>

        {/* Recent leads */}
        <div className="card dashboard-panel">
          <h3>Recent leads</h3>
          {recentLeads.length === 0 ? (
            <p className="dashboard-empty-text">No leads yet.</p>
          ) : (
            <div className="dashboard-recent-list">
              {recentLeads.map((lead) => (
                <div key={lead._id} className="dashboard-recent-row">
                  <div className="dashboard-recent-info">
                    <span className="dashboard-recent-name">{lead.name}</span>
                    <span className="dashboard-recent-email">{lead.email}</span>
                  </div>
                  <span className={`badge ${lead.status === 'new' ? 'badge-blue' : ''}`}>{lead.status}</span>
                </div>
              ))}
            </div>
          )}
          <Link to="/admin/leads" className="dashboard-panel-link">View all leads →</Link>
        </div>

      </div>

    </div>
  )
}

export default Dashboard