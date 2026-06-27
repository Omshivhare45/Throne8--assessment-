import{ useState, useEffect } from 'react'
import{ NavLink, useLocation } from 'react-router-dom'
import useThemeStore from '../store/Themestore.js'
import {FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
    {label:"Home", to:"/"},
    {label:'Blogs', to:"/blog"},
    {label:'Case Study', to:"/case-studies"},
    {label:'About', to:"/about"},
    {label:'Industries', to:"/industries"},
    {label:'Services', to:"/services"},
    {label:'Portfolio', to:"/portfolio"},
    {label:'Technologies', to:"/technologies"},
    {label:'Contact', to:"/contact"}
]

const Navbar = () => {
    const { theme, toggleTheme } = useThemeStore();
    const [menuOpen, setMenuOpen ] = useState(false);
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                CareerForge
            </div>

            <ul className="navbar-links">
                {navLinks.map((link) => (
                    <li key={link.to}>
                        <NavLink to={link.to}>
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className='navbar-actions'>
                <button className='theme-btn' onClick={toggleTheme}>
                    {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </button>

                <NavLink to="/contact" className="consult-btn">
                    Book Consultation
                </NavLink>

                <button className='menu-btn' onClick={() => setMenuOpen(!menuOpen)}>
                    { menuOpen ? <FiX /> :<FiMenu />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar;