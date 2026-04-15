import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import JoinTeam from './pages/JoinTeam';

// Dashboard (To be refactored if needed, but keeping for now)
import Dashboard from './Dashboard/Dashboard';
import HomeDashboard from './Dashboard/HomeDashboard';
import ContactDashboard from './Dashboard/ContactDashboard';
import AboutDashboard from './Dashboard/AboutDashboard';
import WorkDashboard from './Dashboard/WorkDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes default
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/join' element={<JoinTeam />} />
          
          {/* Dashboard Routes */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/HomeDashboard" element={<HomeDashboard />} />
          <Route path="/AboutDashboard" element={<AboutDashboard />} />
          <Route path="/WorkDashboard" element={<WorkDashboard />} />
          <Route path="/ContactDashboard" element={<ContactDashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
