import{ useState, useEffect } from 'react'
import{ Link, useLocation } from 'react'
import useThemeStore from '../store/Themestore'

const NAV = [
    { label: "About", to:'/about'},
    {label: "Services", to :"/services"},
    {label: "Blog", to : "/blog" },
    { label: "Careers", to:"/careers"},
    {label:"Contact", to:"/contact"},
]

export default function Navbar(){
    const { theme , toggleTheme } = useThemeStore()
    const [ scrolled, setScrolled ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const location = useLocation(

        useEffect(() => {
            const onScroll = () => setScrolled(window.scrollY > 10)
            window.addEventListener('scroll', onScroll, {passive :true})
            return () => window.removeEventListener('scroll', onScroll)
        }, [])

        useEffect(() => setOpen(false), [location])

        return(
            <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className='navbar_inner container'></div>

                <Link to="/" className="navbar_logo">
                CareerForge
                </Link>

                <nav className='navbar_links'>
                    {nav.map((n) => (
                        <Link
                        key={n.to}
                        to={n.to}
                        className={`navbar_link ${location.pathname === n.to ? 'navbar_link--active' :''}`}>
                            {n.label}
                        </Link>
                    ))}
                </nav>
                <div className='navbar_actions'>
                    <button className='theme-toggle' onClick={toggleTheme} aria-label='Toggle theme'>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>
        )
    )
}