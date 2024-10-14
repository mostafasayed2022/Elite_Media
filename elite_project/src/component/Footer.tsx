// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "../Css/Footer.css";
import logo from "../assets/logos/logo1.png"
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <h4>Get in touch:</h4><br />
                    <a href="mailto:hello@elitemediahouses.com">hello@elitemediahouses.com</a>
                    <ul className="footer-contact">
                        <li>Egypt|(+20) 1067559248</li>
                    </ul>
                    {/* <h4>Services:</h4> */}
                    <ul className="footer-services">
                        <li>Media Production</li>
                        <li>Websites & Applications</li>
                        <li>Branding & Identity</li>
                        <li>Graphic Design</li>
                    </ul>
                </div>
                <div className="footer-but">
                    <div className="social-icons">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-instagram"></i></a>
                        <a href="#"><i className="fa fa-linkedin"></i></a>
                    </div>
                    <div className="copy">
                        <p>© 2024 Elite Media Houses. All rights reserved.</p>
                    </div>
                </div>

            </footer>
        </>
    );
}


export default Footer;