import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../services/api'

const INDUSTRIES = ['All', 'Healthcare', 'Education', 'FinTech', 'E-Commerce', 'Logistics', 'SaaS', 'Startup', 'Enterprise']

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('All')

  useEffect(() => {
    api.get('/projects').then(({ data }) => {
      setProjects(data.projects || [])
      setFiltered(data.projects || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setFiltered(filter === 'All' ? projects : projects.filter((p) => p.industry === filter))
  }, [filter, projects])

  return (
    <>
      <Navbar />
      <main className="page">

        <div className="page-hero">
          <div className="container">
            <span className="tag">Our Work</span>
            <h1>Projects That <span className="gradient-text">Speak for Themselves</span></h1>
            <p>Real problems. Real solutions. Real results.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="tabs">
              {INDUSTRIES.map((ind) => (
                <button key={ind} className={`tab ${filter === ind ? 'active' : ''}`} onClick={() => setFilter(ind)}>
                  {ind}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid-3">
                {[1,2,3,4,5,6].map((n) => <div key={n} className="skeleton" style={{ height: '220px' }} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">💼</div>
                <p>No projects in this category yet.</p>
              </div>
            ) : (
              <div className="grid-3">
                {filtered.map((p) => (
                  <div key={p._id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="badge">{p.industry}</span>
                      {p.featured && <span className="badge badge-blue">⭐ Featured</span>}
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>{p.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text2)', marginBottom: '0.9rem', lineHeight: 1.6 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {(p.techStack || []).slice(0, 4).map((t) => <span key={t} className="badge badge-blue">{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {p.liveurl   && <a href={p.liveurl}   target="_blank" rel="noreferrer" className="btn btn-primary"  style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}>Live Demo</a>}
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}>GitHub</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Portfolio