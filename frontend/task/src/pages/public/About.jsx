import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const VALUES = [
  { icon: '🎯', title: 'Client First',    desc: 'Every decision starts with your business goals.' },
  { icon: '🔒', title: 'Transparency',    desc: 'No hidden costs. Weekly updates, always.' },
  { icon: '⚡', title: 'Speed + Quality', desc: 'Agile delivery without cutting corners.' },
  { icon: '🌱', title: 'Long-term',       desc: 'We build things that last and are easy to maintain.' },
]

const TEAM = [
  { name: 'Om Shivhare',  role: 'Founder & Lead Developer', emoji: '👨‍💻' },
  { name: 'Dev Team',     role: 'Full-Stack Engineers',      emoji: '⚙️' },
  { name: 'Design Team',  role: 'UI/UX Designers',           emoji: '🎨' },
  { name: 'DevOps Team',  role: 'Cloud & Infrastructure',    emoji: '☁️' },
]

const About = () => {
  return (
    <>
      <Navbar />
      <main className="page">

        <div className="page-hero">
          <div className="container">
            <span className="tag">Who We Are</span>
            <h1>Built by Developers,<br /><span className="gradient-text">For Businesses That Scale</span></h1>
            <p>XYZ is a software company from Bhopal, India. We build digital products for startups and enterprises worldwide.</p>
          </div>
        </div>

        {/* Vision + Mission */}
        <section className="section">
          <div className="container grid-2">
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔭</div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>Our Vision</h2>
              <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>To be the most trusted software partner globally — known for quality, speed and long-term relationships.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎯</div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>Our Mission</h2>
              <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>Deliver scalable, secure and maintainable software that solves real business problems without big agency overhead.</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section section-alt">
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Core <span className="gradient-text">Values</span></h2>
            <div className="grid-4">
              {VALUES.map((v) => (
                <div key={v.title} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>{v.icon}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text2)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Meet the <span className="gradient-text">Team</span></h2>
            <div className="grid-4">
              {TEAM.map((m) => (
                <div key={m.name} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>{m.emoji}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{m.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: '0.2rem' }}>{m.role}</p>
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