import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/Header.css";
import logo from '../assets/logos/logo1.png'; // Replace with your actual logo file path
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons

const Header: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // To toggle mobile menu

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setIsAuthenticated(!!userToken);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state
    };

    return (
        <header className="header-container">
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={toggleMenu}>HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/work" onClick={toggleMenu}>WORK</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about" onClick={toggleMenu}>ABOUT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => { scrollToSection('services-section'); toggleMenu(); }}>
                            SERVICES
                        </Link>
                    </li>
                    <li className='nav-item-btn'>
                        <Link className="contact-button-btn" to="/contact" onClick={toggleMenu}>CONTACT</Link>
                    </li>

                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/HomeDashboard" onClick={toggleMenu}>DASHBOARD</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div className="contact-button-cont">
                {isAuthenticated ? (
                    <>
                        <div className="contact-button-container">
                            <Link className="contact-button" to="/login">LOGIN</Link>
                        </div>
                        <div className="contact-button-container">
                            <Link className="contact-button" to="/register" >REGISTER</Link>
                        </div>
                    </>
                ) : (
                    <div className="contact-button-container">
                        <Link className="contact-button" to="/contact" onClick={toggleMenu}>CONTACT</Link>
                    </div>
                )}
            </div>
            <div className="hamburger-icon" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
        </header>
    );
};

export default Header;
