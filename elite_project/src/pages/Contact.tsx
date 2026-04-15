import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../Css/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <Header />
      
      <main>
        <div className="contact-info-container parent">
          {/* Left Side: Contact Details */}
          <div className="contact-cont">
            <div className="contact-details">
              <h2>ELITE MEDIA HOUSES</h2>
              <p className="address">
                <FaMapMarkerAlt /> <span>Egypt | Cairo, Creative District</span>
              </p>
              <div className="mail-phone">
                <p className="mail">
                   <FaEnvelope /> <a href="mailto:info@elitemediahouses.com">info@elitemediahouses.com</a>
                </p>
                <p className="phone">
                   <FaPhoneAlt /> <span>+20 123 456 789</span>
                </p>
              </div>

              <div className="social-icons">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form">
            <div className="text-team">
              <h1 className="title-services-text">Contact Us</h1>
              <div className="team-text">
                <h4>Ready to start your project?</h4>
                <p>Get in touch with our creative team today.</p>
              </div>
            </div>

            <form>
              <div className="form-1">
                <div className="input-group">
                  <label>Name</label>
                  <input className="inp" type="text" placeholder="Your Name" />
                </div>
                <div className="input-group">
                  <label>Interest</label>
                  <input className="inp" type="text" placeholder="Digital Marketing" />
                </div>
              </div>

              <div className="form-2">
                <div className="input-group">
                  <label>Email</label>
                  <input className="inp" type="email" placeholder="Your Email" />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input className="inp" type="tel" placeholder="Your Phone" />
                </div>
              </div>

              <div className="input-group">
                <label>Message</label>
                <textarea 
                  placeholder="Tell us about your project"
                  style={{ height: '150px', resize: 'none' }}
                />
              </div>

              <div className="btn-4">
                <button type="submit" className="contact-btn">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
