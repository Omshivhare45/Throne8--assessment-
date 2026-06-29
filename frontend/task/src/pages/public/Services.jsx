import { NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './Services.css'

const SERVICES = [
  {
    num: '01',
    title: 'Custom Software Development',
    desc: 'End-to-end enterprise applications, SaaS platforms, and business automation built to your exact requirements.',
    tags: ['Enterprise Apps', 'SaaS Platforms', 'CRM & ERP', 'Automation'],
  },
  {
    num: '02',
    title: 'Web Development',
    desc: 'Full-stack web applications from MERN-based platforms to e-commerce and admin dashboards.',
    tags: ['MERN Stack', 'E-Commerce', 'Admin Dashboards', 'PWAs'],
  },
  {
    num: '03',
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile apps for Android and iOS that feel right on every device.',
    tags: ['Android', 'iOS', 'React Native', 'Cross-Platform'],
  },
  {
    num: '04',
    title: 'AI Solutions',
    desc: 'Practical AI integrations — chatbots, recommendation systems, and generative AI features that create real value.',
    tags: ['AI Chatbots', 'Resume Analyzer', 'Recommendations', 'Generative AI'],
  },
  {
    num: '05',
    title: 'Cloud & DevOps',
    desc: 'Infrastructure setup, containerisation, and automated pipelines so your team ships faster and sleeps better.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    num: '06',
    title: 'Cyber Security',
    desc: 'Security audits, penetration testing, and ongoing monitoring to keep your product and user data safe.',
    tags: ['Security Audits', 'Pen Testing', 'API Security', 'Monitoring'],
  },
  {
    num: '07',
    title: 'Maintenance & Support',
    desc: 'Post-launch monitoring, performance tuning, and fast bug fixes — so nothing breaks quietly in production.',
    tags: ['Monitoring', 'Performance', 'Bug Fixes', '24/7 Support'],
  },
]

const Services = () => {
  return (
    <>
      <Navbar />
      <main className="page">

        <div className="page-hero">
          <div className="container">
            <span className="tag">What we do</span>
            <h1>Full-stack engineering,<br />start to finish</h1>
            <p>From first wireframe to production deployment — we handle everything.</p>
          </div>
        </div>

        <section className="section">
          <div className="container">

            <div className="services-list">
              {SERVICES.map((s) => (
                <div key={s.num} className="service-row">
                  <span className="service-num">{s.num}</span>
                  <div className="service-body">
                    <h3 className="service-title">{s.title}</h3>
                    <p className="service-desc">{s.desc}</p>
                    <div className="service-tags">
                      {s.tags.map((tag) => (
                        <span key={tag} className="service-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="services-cta">
              <p>Not sure what you need? Let's talk it through.</p>
              <NavLink to="/contact" className="btn btn-primary">Book a free consultation</NavLink>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Services