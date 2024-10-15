import { Link, useLocation } from 'react-router-dom';
import Logo from "../assets/logos/logo1.png";

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  // Function to determine if the link is active based on the current path
  const isActive = (path: string) => location.pathname === path;

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
      </div>
    </div>
  );
};

export default Sidebar;
