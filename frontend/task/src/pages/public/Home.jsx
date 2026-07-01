import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../services/api'
import './Home.css'
import Hero from '../../components/home/Hero';

const SERVICES = [
  { icon: '⚙️', title: 'Custom Software', desc: 'Enterprise apps, SaaS platforms, CRM & ERP built to scale.' },
  { icon: '🌐', title: 'Web Development', desc: 'Full-stack MERN apps, e-commerce and dashboards.' },
  { icon: '📱', title: 'Mobile Apps',     desc: 'Android, iOS and React Native cross-platform apps.' },
  { icon: '🤖', title: 'AI Solutions',    desc: 'Chatbots, recommendation engines and generative AI.' },
  { icon: '☁️', title: 'Cloud & DevOps',  desc: 'AWS, Docker, Kubernetes and CI/CD pipelines.' },
  { icon: '🔒', title: 'Cyber Security',  desc: 'Security audits, pen testing and 24/7 monitoring.' },
]

const TECH = ['React.js', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'Redis', 'Kafka', 'Next.js']

const PROCESS = [
  { n: '01', title: 'Requirement Gathering', desc: 'We understand your business goals before writing any code.' },
  { n: '02', title: 'Design & Planning',     desc: 'Architecture, wireframes and tech stack confirmed with you.' },
  { n: '03', title: 'Development',           desc: 'Agile sprints with weekly demos and clean documented code.' },
  { n: '04', title: 'Testing & QA',          desc: 'Automated tests, manual QA and performance checks.' },
  { n: '05', title: 'Deployment',            desc: 'Zero-downtime release via CI/CD on AWS.' },
  { n: '06', title: 'Support',               desc: 'Monitoring, bug fixes and improvements after launch.' },
]

const Home = () => {
  const [projects, setProjects]         = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]     = useState(false)
  const [err, setErr]       = useState('')

  useEffect(() => {
    api.get('/projects?featured=true').then(({ data }) => setProjects(data.projects?.slice(0, 3) || [])).catch(() => {})
    api.get('/testimonials?featured=true').then(({ data }) => setTestimonials(data.testimonials?.slice(0, 3) || [])).catch(() => {})
  }, [])

  const sendMsg = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return setErr('All fields are required')
    setSending(true)
    try {
      await api.post('/leads/contact', { ...form, source: 'contact' })
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setErr('Failed to send. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Navbar />
      <Hero />
      <main>

    
        {projects.length > 0 && (
          <section className="section section-alt" id="portfolio">
            <div className="container">
              <div className="section-center">
                <span className="hero-tag">Our Work</span>
                <h2 className="section-title"><span className="gradient-text">Featured Projects</span></h2>
              </div>
              <div className="grid-3">
                {projects.map((p) => (
                  <div key={p._id} className="card">
                    <span className="badge">{p.industry}</span>
                    <h3 style={{ margin: '0.75rem 0 0.4rem', fontSize: '1rem', fontWeight: 700 }}>{p.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text2)', marginBottom: '0.75rem', lineHeight: 1.6 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {(p.techStack || []).slice(0, 3).map((t) => <span key={t} className="badge badge-blue">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <NavLink to="/portfolio" className="btn btn-outline">View All Projects</NavLink>
              </div>
            </div>
          </section>
        )}

      
        <section className="section" id="technologies">
          <div className="container">
            <div className="section-center">
              <span className="hero-tag">Our Stack</span>
              <h2 className="section-title">Technologies We <span className="gradient-text">Master</span></h2>
            </div>
            <div className="tech-strip">
              {TECH.map((t) => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </section>

    
        <section className="section section-alt" id="process">
          <div className="container">
            <div className="section-center">
              <span className="hero-tag">How We Work</span>
              <h2 className="section-title">Process Built for <span className="gradient-text">Zero Surprises</span></h2>
            </div>
            <div className="process-list">
              {PROCESS.map((step) => (
                <div key={step.n} className="process-item">
                  <div className="process-num">{step.n}</div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>{step.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text2)' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

  
        {testimonials.length > 0 && (
          <section className="section" id="testimonials">
            <div className="container">
              <div className="section-center">
                <span className="hero-tag">Client Stories</span>
                <h2 className="section-title">What Clients <span className="gradient-text">Say</span></h2>
              </div>
              <div className="grid-3">
                {testimonials.map((t) => (
                  <div key={t._id} className="card">
                    <div style={{ marginBottom: '0.5rem' }}>{'⭐'.repeat(t.rating)}</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text2)', fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.65 }}>"{t.review}"</p>
                    <strong style={{ fontSize: '0.85rem' }}>{t.clientName}</strong>
                    {t.company && <span style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>, {t.company}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        
        <section className="section section-alt" id="contact">
          <div className="container">
            <div className="contact-wrap">
              <div>
                <span className="hero-tag">Get In Touch</span>
                <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Let's Build Something <span className="gradient-text">Great</span></h2>
                <p className="section-sub" style={{ marginTop: '0.5rem' }}>Fill the form and we'll reply within 24 hours.</p>
                <div className="contact-info">
                  <p>✉️ <a href="mailto:omshivhare666@gmail.com" style={{ color: 'var(--primary)' }}>omshivhare666@gmail.com</a></p>
                  <p>📍 Bhopal, Madhya Pradesh, India</p>
                </div>
              </div>

              {sent ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                  <h3>Message Received!</h3>
                  <p style={{ color: 'var(--text2)', margin: '0.5rem 0 1.5rem' }}>We'll get back to you within 24 hours.</p>
                  <button className="btn btn-outline" onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <form className="card form-stack" onSubmit={sendMsg}>
                  {err && <div className="error-box">{err}</div>}
                  <div className="form-field">
                    <label>Name *</label>
                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
                  </div>
                  <div className="form-field">
                    <label>Message *</label>
                    <textarea className="input" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Home