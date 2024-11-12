import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/logos/logo1.png";

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to determine if the link is active based on the current path
  const isActive = (path: string) => location.pathname === path;

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication data from local storage or cookies
    localStorage.removeItem('authToken'); // Example for clearing auth token
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <h2 className="dashboard-title">Dashboard</h2>
      <hr />
      <div className="menu">
        <h4>PAGES</h4>
        <ul>
          <li className={isActive('/HomeDashboard') ? 'active' : ''}>
            <Link to="/HomeDashboard">Home</Link>
          </li>
          <li className={isActive('/AboutDashboard') ? 'active' : ''}>
            <Link to="/AboutDashboard">About</Link>
          </li>
          <li className={isActive('/WorkDashboard') ? 'active' : ''}>
            <Link to="/WorkDashboard">Work</Link>
          </li>
          <li className={isActive('/ContactDashboard') ? 'active' : ''}>
            <Link to="/ContactDashboard">Contact</Link>
          </li>
        </ul>
        <hr />
        <h4>ACCOUNT</h4>
        <ul>
          <li >
            <button onClick={handleLogout}  className='logout-button'>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
