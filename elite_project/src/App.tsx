import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './component/Header';
import Home from './component/Home';
import About from './component/About';
import Work from './component/Work';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/work" element={<Work/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
