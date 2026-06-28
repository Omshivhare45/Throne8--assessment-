import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import useAuthStore from './store/authStore';

  import './App.css'
  import Home from './pages/public/Home';
  import About from './pages/public/About';
  import Services from './pages/public/Services';
  import Industries from './pages/public/Industries';
  import Portfolio from './pages/public/Portfolio';
  import CaseStudies from './pages/public/CaseStudies';
  import Technologies from './pages/public/Technologies';
  import Blog from './pages/public/Blog';  
  import Careers from './pages/public/Careers';
  import Contact from './pages/public/Contact';

  import Login from "./pages/auth/Login";
  import Register from "./pages/auth/Register";

  import AdminLayout from './pages/admin/AdminLayout';
  import AdminDashboard from './pages/admin/Dashboard';
  import AdminProjects from './pages/admin/Projects';
  import AdminLeads    from './pages/admin/Leads';
  import AdminBlogs    from './pages/admin/Blogs'
  import AdminCareers  from './pages/admin/Careers'
  import AdminSettings from './pages/admin/Settings'

  function ProtectedRoute({ children }){
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    if(!isAuthenticated)return <Navigate to="/login" replace />
    return children;
  }


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/services' element={<Services />}/>
      <Route path='/Industries' element={<Industries />}/>
      <Route path='/Portfolio' element={<Portfolio />}/>
      <Route path='/casestudies' element={<CaseStudies />}/>
      <Route path='/technologies' element={<Technologies />}/>
      <Route path='/blog' element={<Blog />}/>
      <Route path='/careers' element={<Careers />}/>
      <Route path='/contact' element={<Contact />}/>

      <Route path="/login" element={<Login />} />

      <Route path='/Admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}/>
      <Route index              element={<AdminDashboard />} />
          <Route path="blogs"       element={<AdminBlogs />} />
          <Route path="projects"    element={<AdminProjects />} />
          <Route path="leads"       element={<AdminLeads />} />
          <Route path="careers"     element={<AdminCareers />} />
          <Route path="settings"    element={<AdminSettings />} />
      
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<Navigate to="/" replace />}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
