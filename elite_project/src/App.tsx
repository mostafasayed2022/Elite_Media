import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
// import Header from './component/Header';
import Home from './component/Home';
import About from './component/About';
import Work from './component/Work';
import Login from './component/Login';
import Register from './component/Register';
import Contact from './component/Contact';
import JoinTeam from './component/JoinTeam';
import Dashboard from './Dashboard/Dashboard';
import HomeDashboard from './Dashboard/HomeDashboard';
import ContactDashboard from './Dashboard/ContactDashboard';
import AboutDashboard from './Dashboard/AboutDashboard';
import WorkDashboard from './Dashboard/WorkDashboard';

function App() {

  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/join' element={<JoinTeam />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/HomeDashboard" element={<HomeDashboard />} />
          <Route path="/AboutDashboard" element={<AboutDashboard />} />
          <Route path="/WorkDashboard" element={<WorkDashboard />} />
          <Route path="/ContactDashboard" element={<ContactDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
