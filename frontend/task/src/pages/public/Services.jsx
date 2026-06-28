import { NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const SERVICES = [
  { icon: '⚙️', title: 'Custom Software Development', items: ['Enterprise Applications', 'SaaS Platforms', 'CRM & ERP Solutions', 'Business Automation'] },
  { icon: '🌐', title: 'Web Development',              items: ['MERN Stack Apps', 'E-Commerce Platforms', 'Admin Dashboards', 'Progressive Web Apps'] },
  { icon: '📱', title: 'Mobile App Development',       items: ['Android Apps', 'iOS Apps', 'React Native', 'Cross-Platform'] },
  { icon: '🤖', title: 'AI Solutions',                 items: ['AI Chatbots', 'Resume Analyzer', 'Recommendation Systems', 'Generative AI'] },
  { icon: '☁️', title: 'Cloud & DevOps',               items: ['AWS Deployment', 'Docker', 'Kubernetes', 'CI/CD Pipelines'] },
  { icon: '🔒', title: 'Cyber Security',               items: ['Security Audits', 'Penetration Testing', 'API Security', 'Security Monitoring'] },
  { icon: '🛠️', title: 'Maintenance & Support',        items: ['App Monitoring', 'Performance Tuning', 'Bug Fixing', '24/7 Support'] },
]

const Services = () => {
  return (
    <>
      <Navbar />
      <main className="page">

        <div className="page-hero">
          <div className="container">
            <span className="tag">What We Do</span>
            <h1>Full-Stack <span className="gradient-text">Engineering Services</span></h1>
            <p>From first wireframe to production deployment — we handle everything.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SERVICES.map((s) => (
                <div key={s.title} className="card service-row">
                  <div className="service-left">
                    <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{s.title}</h3>
                  </div>
                  <div className="service-tags">
                    {s.items.map((item) => (
                      <span key={item} className="badge badge-blue">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p style={{ color: 'var(--text2)', marginBottom: '1rem' }}>Not sure what you need? Let's talk.</p>
              <NavLink to="/contact" className="btn btn-primary">Book a Free Consultation</NavLink>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Services