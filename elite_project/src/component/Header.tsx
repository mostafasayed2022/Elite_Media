import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/Header.css";
import logo from '../assets/logos/logo1.png'; // Replace with your actual logo file path

const Header: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Check authentication status from localStorage or your authentication logic
        const userToken = localStorage.getItem('userToken'); // Assuming you store token in localStorage
        setIsAuthenticated(!!userToken); // Update authentication status based on token presence
    }, []);

    return (
        <header className="header-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="" />
            </div>
            <nav className="nav-links">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/work">WORK</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">ABOUT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#" onClick={() => scrollToSection('services-section')}>
                            SERVICES
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/HomeDashboard">DASHBOARD</Link>
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
                            <Link className="contact-button" to="/register">REGISTER</Link>
                        </div>
                    </>
                ) : (
                    <div className="contact-button-container">
                        <Link className="contact-button" to="/contact">CONTACT</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
