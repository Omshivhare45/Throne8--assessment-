import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../services/api'
import './Home.css'

const SERVICES = [
  { icon: '⚙️', title: 'Custom Software', desc: 'Enterprise apps, SaaS platforms, CRM & ERP built to scale.' },
  { icon: '🌐', title: 'Web Development', desc: 'Full-stack MERN apps, e-commerce, dashboards & PWAs.' },
  { icon: '📱', title: 'Mobile Apps',     desc: 'Android, iOS and cross-platform React Native apps.' },
  { icon: '🤖', title: 'AI Solutions',    desc: 'Chatbots, recommendation systems & generative AI.' },
  { icon: '☁️', title: 'Cloud & DevOps',  desc: 'AWS, Docker, Kubernetes & automated CI/CD pipelines.' },
  { icon: '🔒', title: 'Cyber Security',  desc: 'Security audits, pen testing & 24/7 monitoring.' },
]

const STATS = [
  { value: '50+',  label: 'Projects Delivered' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '3x',   label: 'Avg Performance Gain' },
  { value: '24/7', label: 'Support Coverage' },
]

const TECH = ['React.js','Node.js','MongoDB','AWS','Docker','Kubernetes','TypeScript','Redis','Kafka','Next.js']

const PROCESS = [
  { n: '01', title: 'Requirement Gathering', desc: 'Deep-dive sessions to understand your goals and constraints.' },
  { n: '02', title: 'Research & Planning',   desc: 'Architecture design, tech selection and risk mapping.' },
  { n: '03', title: 'UI/UX Design',          desc: 'Wireframes and prototypes approved before any code is written.' },
  { n: '04', title: 'Development',           desc: 'Agile sprints with weekly demos and clean code.' },
  { n: '05', title: 'QA Testing',            desc: 'Automated tests, manual QA and performance profiling.' },
  { n: '06', title: 'Deployment',            desc: 'Zero-downtime releases via CI/CD pipelines on AWS.' },
  { n: '07', title: 'Monitoring',            desc: 'Uptime monitoring, bug fixes and iterative improvements.' },
]

export default function Home() {
  const [projects, setProjects]       = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [contact, setContact]         = useState({ name:'', email:'', message:'' })
  const [sending, setSending]         = useState(false)
  const [sent, setSent]               = useState(false)

  useEffect(() => {
    api.get('/projects?featured=true').then(({ data }) => setProjects(data.projects?.slice(0,3) || [])).catch(() => {})
    api.get('/testimonials?featured=true').then(({ data }) => setTestimonials(data.testimonials?.slice(0,3) || [])).catch(() => {})
  }, [])

  const sendContact = async (e) => {
    e.preventDefault()
    if (!contact.name || !contact.email || !contact.message) return
    setSending(true)
    try {
      await api.post('/leads/contact', { ...contact, source: 'contact' })
      setSent(true)
      setContact({ name:'', email:'', message:'' })
    } 
    finally { setSending(false) }
  }

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="container">
            <div className="hero__content">
              <span className="section-tag">🚀 Premium Software Development</span>
              <h1 className="hero__title">
                We Build Digital Products<br />
                <span className="gradient-text">That Scale</span>
              </h1>
              <p className="hero__sub">
                From AI-powered apps to enterprise cloud infrastructure —
                end-to-end software for startups, SMEs and enterprises.
              </p>
              <div className="hero__actions">
                <Link to="/contact" className="btn btn-primary">Book Free Consultation</Link>
                <Link to="/portfolio" className="btn btn-outline">View Our Work</Link>
              </div>
            </div>

            {/* Terminal widget */}
            <div className="hero__terminal">
              <div className="terminal">
                <div className="terminal__bar">
                  <span className="t-dot t-red"  />
                  <span className="t-dot t-yellow"/>
                  <span className="t-dot t-green" />
                  <span className="terminal__title">xyz — terminal</span>
                </div>
                <div className="terminal__body">
                  <p><span className="t-prompt">$</span> npm create xyz-app</p>
                  <p className="t-success">✔ Project initialised</p>
                  <p><span className="t-prompt">$</span> docker compose up</p>
                  <p className="t-success">✔ Services running :3000</p>
                  <p><span className="t-prompt">$</span> kubectl apply -f deploy.yml</p>
                  <p className="t-success">✔ Live on AWS ECS</p>
                  <p><span className="t-prompt">$</span> <span className="t-cursor" /></p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="hero__stats">
            <div className="container">
              <div className="stats-row">
                {STATS.map((s) => (
                  <div key={s.label} className="stat">
                    <span className="stat__value gradient-text">{s.value}</span>
                    <span className="stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">What We Build</span>
              <h2 className="section-title">End-to-End <span className="gradient-text">Engineering Services</span></h2>
              <p className="section-sub">We cover the full stack — from first wireframe to production deployment.</p>
            </div>
            <div className="services-grid">
              {SERVICES.map((s) => (
                <div key={s.title} className="service-card card">
                  <div className="service-card__icon">{s.icon}</div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Projects ── */}
        {projects.length > 0 && (
          <section className="section section--alt" id="portfolio">
            <div className="container">
              <div className="section-header">
                <span className="section-tag">Our Work</span>
                <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
              </div>
              <div className="projects-grid">
                {projects.map((p) => (
                  <div key={p._id} className="project-card card">
                    <div className="project-card__industry"><span className="badge">{p.industry}</span></div>
                    <h3 className="project-card__title">{p.name}</h3>
                    <p className="project-card__desc">{p.description}</p>
                    <div className="project-card__stack">
                      {(p.techStack || []).slice(0,4).map((t) => (
                        <span key={t} className="badge badge-primary">{t}</span>
                      ))}
                    </div>
                    {p.liveurl && <a href={p.liveurl} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ marginTop: '0.75rem', padding: '0.4rem 0' }}>View Live →</a>}
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/portfolio" className="btn btn-outline">View All Projects</Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Technologies ── */}
        <section className="section" id="technologies">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Stack</span>
              <h2 className="section-title">Technologies We <span className="gradient-text">Master</span></h2>
            </div>
            <div className="tech-strip">
              {TECH.map((t) => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section section--alt" id="process">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">How We Work</span>
              <h2 className="section-title">A Process Built for <span className="gradient-text">Zero Surprises</span></h2>
            </div>
            <div className="process-list">
              {PROCESS.map((step) => (
                <div key={step.n} className="process-item">
                  <div className="process-item__num">{step.n}</div>
                  <div className="process-item__body">
                    <h3 className="process-item__title">{step.title}</h3>
                    <p className="process-item__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        {testimonials.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header">
                <span className="section-tag">Client Stories</span>
                <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
              </div>
              <div className="testimonials-grid">
                {testimonials.map((t) => (
                  <div key={t._id} className="testimonial-card card">
                    <div className="testimonial-card__stars">{'⭐'.repeat(t.rating)}</div>
                    <p className="testimonial-card__review">"{t.review}"</p>
                    <div className="testimonial-card__author">
                      <strong>{t.clientName}</strong>
                      {t.clientRole && <span> · {t.clientRole}</span>}
                      {t.company    && <span>, {t.company}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Contact ── */}
        <section className="section section--alt" id="contact">
          <div className="container">
            <div className="contact-wrap">
              <div className="contact-info">
                <span className="section-tag">Get In Touch</span>
                <h2 className="section-title">Let's Build Something <span className="gradient-text">Remarkable</span></h2>
                <p className="section-sub">Tell us about your project. We reply within 24 hours.</p>
                <div className="contact-details">
                  <div className="contact-detail"><span>✉️</span><a href="mailto:hello@xyzcompany.com">hello@xyzcompany.com</a></div>
                  <div className="contact-detail"><span>📞</span><a href="tel:+919876543210">+91 98765 43210</a></div>
                  <div className="contact-detail"><span>📍</span><span>Bhopal, Madhya Pradesh, India</span></div>
                </div>
              </div>

              <div className="contact-form-wrap">
                {sent ? (
                  <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Message Received!</h3>
                    <p style={{ color: 'var(--text2)' }}>We'll get back to you within 24 hours.</p>
                    <button className="btn btn-outline" style={{ marginTop: '1.5rem' }} onClick={() => setSent(false)}>Send Another</button>
                  </div>
                ) : (
                  <form className="card contact-form" onSubmit={sendContact}>
                    <div className="form-group"><label htmlFor="c-name">Name *</label><input id="c-name" className="input" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Your name" /></div>
                    <div className="form-group"><label htmlFor="c-email">Email *</label><input id="c-email" className="input" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="you@company.com" /></div>
                    <div className="form-group"><label htmlFor="c-msg">Message *</label><textarea id="c-msg" className="input" rows={5} value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} placeholder="Tell us about your project..." style={{ resize: 'vertical' }} /></div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}