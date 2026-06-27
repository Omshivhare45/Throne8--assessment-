import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  import Admin from './pages/admin/AdminLayout';

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
      <Route path='/Admin' element={<Admin />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
