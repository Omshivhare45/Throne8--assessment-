import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../services/api'
import './Portfolio.css'

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
            <span className="tag">Our work</span>
            <h1>Projects that speak<br />for themselves</h1>
            <p>Real problems. Real solutions. Real results.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">

            {/* Filter tabs */}
            <div className="tabs">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  className={`tab ${filter === ind ? 'active' : ''}`}
                  onClick={() => setFilter(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>

            {/* Loading skeletons */}
            {loading && (
              <div className="portfolio-grid">
                {[1,2,3,4,5,6].map((n) => (
                  <div key={n} className="skeleton portfolio-skeleton" />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div className="empty">
                <div className="empty-icon">—</div>
                <p>No projects in this category yet.</p>
              </div>
            )}

            {/* Project cards */}
            {!loading && filtered.length > 0 && (
              <div className="portfolio-grid">
                {filtered.map((p) => (
                  <div key={p._id} className="portfolio-card">

                    <div className="portfolio-card-head">
                      <span className="portfolio-industry">{p.industry}</span>
                      {p.featured && <span className="portfolio-featured">Featured</span>}
                    </div>

                    <h3 className="portfolio-name">{p.name}</h3>
                    <p className="portfolio-desc">{p.description}</p>

                    <div className="portfolio-stack">
                      {(p.techStack || []).slice(0, 4).map((t) => (
                        <span key={t} className="portfolio-tech">{t}</span>
                      ))}
                    </div>

                    <div className="portfolio-links">
                      {p.liveurl   && <a href={p.liveurl}   target="_blank" rel="noreferrer" className="portfolio-link-btn portfolio-link-primary">Live demo</a>}
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="portfolio-link-btn portfolio-link-outline">GitHub</a>}
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