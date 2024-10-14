import React from "react";
import logo from "../assets/logos/logo1.png"

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <h2 className="dashboard-title">Dashboard</h2>
            <hr  />
            <div className="menu">
                <h4>PAGES</h4>
                <ul>
                    <li className="active">Home</li>
                    <li>About</li>
                    <li>Work</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
