import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/logo1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../Css/Layout.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Work", path: "/work" },
    { title: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Elite Media Logo" />
        </Link>
      </div>

      <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          {navLinks.map((link) => (
            <li key={link.path} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
          <li className="nav-item-btn">
            <Link to="/contact" className="contact-button-btn">
              Let's Talk
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Toggle Icon */}
      <div className="hamburger-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Desktop Contact Button */}
      <Link to="/contact" className="contact-button">
        Contact Us
      </Link>
    </header>
  );
};

export default Header;
