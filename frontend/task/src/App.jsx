import { BrowserRouter, Routes, Route } from 'react-router-dom';

  import './App.css'
  import Home from '../src/pages/public/Home';
  import About from '../src/pages/public/About';
  import Services from '../src/pages/public/Services';
  import Industries from '../src/pages/public/Industries';
  import Portfolio from '.../src/pages/public/Portfolio';
  import CaseStudies from '../src/pages/public/CaseStudies';
  import Technologies from '../src/pages/public/Technologies';
  import Blog from '../src/pages/public/Blog';  
  import Careers from '../src/pages/public/Careers';
  import Contact from '../src/pages/public/Contact';
  import Admin from '../src/pages/admin/AdminLayout';

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
