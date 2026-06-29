import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './About.css'

const VALUES = [
  { num: '01', title: 'Client First',    desc: 'Every decision starts with your business goals, not our preferences.' },
  { num: '02', title: 'Transparency',    desc: 'No hidden costs. Clear timelines, weekly updates, always.' },
  { num: '03', title: 'Speed + Quality', desc: 'Agile delivery without cutting corners on maintainability.' },
  { num: '04', title: 'Long-term',       desc: 'We build things that last and are straightforward to hand off.' },
]

const TEAM = [
  { initials: 'OS', name: 'Om Shivhare',  role: 'Founder & Lead Developer' },
  { initials: 'NM', name: 'Narendra Modi',     role: 'Full-Stack Engineers' },
  { initials: 'AS', name: 'Amit Shah',  role: 'UI/UX Designers' },
  { initials: 'KN', name: 'Kamal Nath',  role: 'Cloud & Infrastructure' },
]

const About = () => {
  return (
    <>
      <Navbar />
      <main className="page">

        {/* Page header */}
        <div className="page-hero">
          <div className="container">
            <span className="tag">Who we are</span>
            <h1>Built by developers,<br />for businesses that scale</h1>
            <p>XYZ is a software company from Bhopal, India. We build digital products for startups and enterprises worldwide.</p>
          </div>
        </div>

        {/* Vision + Mission */}
        <section className="section">
          <div className="container about-vm-grid">
            <div className="about-vm-card">
              <span className="about-vm-label">Vision</span>
              <h2>To be the most trusted software partner globally</h2>
              <p>Known for quality, speed, and relationships that outlast the project.</p>
            </div>
            <div className="about-vm-divider" />
            <div className="about-vm-card">
              <span className="about-vm-label">Mission</span>
              <h2>Deliver software that solves real problems</h2>
              <p>Scalable, secure, and maintainable — without big agency overhead.</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-center">
              <span className="section-tag">What drives us</span>
              <h2 className="section-title">Core values</h2>
            </div>
            <div className="about-values-grid">
              {VALUES.map((v) => (
                <div key={v.num} className="about-value-item">
                  <span className="about-value-num">{v.num}</span>
                  <div>
                    <h3 className="about-value-title">{v.title}</h3>
                    <p className="about-value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div className="section-center">
              <span className="section-tag">The people</span>
              <h2 className="section-title">Meet the team</h2>
            </div>
            <div className="about-team-grid">
              {TEAM.map((m) => (
                <div key={m.name} className="about-team-card">
                  <div className="about-avatar">{m.initials}</div>
                  <h3 className="about-team-name">{m.name}</h3>
                  <p className="about-team-role">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default About