import { Link } from 'react-router-dom';
 import Logo from "../assets/logos/logo1.png"
const Sidebar = () => (
  <div className="sidebar">
    <div className="logo">
      <img src={Logo} alt="Logo" />
    </div>
    <h2 className="dashboard-title">Dashboard</h2>
    <hr />
    <div className="menu">
      <h4>PAGES</h4>
      <ul>
        <li className="active"><Link to="/HomeDashboard">Home</Link></li>
        <li><Link to="/AboutDashboard">About</Link></li>
        <li><Link to="/WorkDashboard">Work</Link></li>
        <li><Link to="/ContactDashboard">Contact</Link></li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
