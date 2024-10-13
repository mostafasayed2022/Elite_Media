import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/Header.css";
import logo from '../assets/logos/logo1.png'; // Replace with your actual logo file path

const Header: React.FC = () => {
    return (
        <header className="header-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
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

                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/services">SERVICES</Link>
                    </li> */}
                </ul>
            </nav>
            <div className='contact-button-cont'>
                <div className="contact-button-container ">
                    <Link className="contact-button" to="/contact">CONTACT</Link>
                </div>

                <div className="contact-button-container ">
                    <Link className="contact-button" to="/login">LOGIN</Link>
                </div>

                <div className="contact-button-container ">
                    <Link className="contact-button" to="/register">REGISTER</Link>
                </div>
            </div>

        </header>
    );
};

export default Header;
