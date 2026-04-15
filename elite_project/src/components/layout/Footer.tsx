import React from "react";
import logo from "../../assets/logos/logo1.png";
import { useContact } from "../../hooks/queries/useContact";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../../Css/Layout.css";

const Footer = () => {
  const { data: contact } = useContact();

  const services = [
    "Media Production",
    "Websites & Applications",
    "Branding & Identity",
    "Graphic Design",
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="Elite Media Logo" />
          </Link>
        </div>

        <div className="head">
          <h4>Our Services</h4>
          <ul className="footer-services">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="touch-1">
          <h4>Get In Touch</h4>
          <ul className="footer-contact">
            <li>
              <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
            </li>
            <li>Egypt | (+20) {contact?.phone}</li>
          </ul>
        </div>
      </div>

      <div className="footer-but">
        <div className="social-icons-footer">
          <a href={contact?.facebook_profile} target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href={contact?.instagram_profile} target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href={contact?.linkedin_profile} target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
        </div>

        <div className="copy">
          <p>© {new Date().getFullYear()} Elite Media Houses. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
