// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import '../Css/Header.css';
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo1.png";

const Header: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="header-container">
                <img src={logo} alt="Logo" className="logo" />
                <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                    ☰
                </button>
                <nav className="nav-links">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/work">Work</Link>
                        </li>
                    </ul>

                </nav>
                <li className="nav-item btn">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
                
                
                <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={toggleMobileMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" onClick={toggleMobileMenu}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/work" onClick={toggleMobileMenu}>Work</Link>
                        </li>
                        <li className="nav-item btn">
                            <Link className="nav-link" to="/contact" onClick={toggleMobileMenu}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Header;
