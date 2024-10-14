import React from "react";
import Header from "../Header";
import "../../Css/Contact.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "../Footer";

const Contact: React.FC = () => {
    return (
        <>
            <Header />
            <div className="contact-info-container">
                <div className="contact-details">
                    <h2>CONTACT INFORMATION</h2>
                    <p><i className="fas fa-map-marker-alt"></i> Mahmoud Mabrouk, 5 St. Omneya<br />
                        Sheraton H, Ezzelden, Cairo, Egypt</p>
                    <p className="mail"><i className="fas fa-envelope"></i>  <a href="mailto:hello@elitemediahouses.com">hello@elitemediahouses.com</a></p>
                    <p className="phone"><i className="fas fa-phone"></i>  Egypt (+20) 1067559248</p>
                    <div className="social-icons">
                        {/* Social Icons */}
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="contact-form">
                    <form>
                        <div className="form-1">
                            <div className="input-group">
                                <label>Name</label>
                                <input className="inp" type="text" placeholder="Your Name" />
                            </div>
                            <div className="input-group">
                                <label>Title</label>
                                <input className="inp" type="text" placeholder="Your Job Title" />
                            </div>
                        </div>
                        <div className="form-2">
                            <div className="input-group">
                                <label>Email</label>
                                <input className="inp" type="email" placeholder="Your Email" />
                            </div>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input className="inp" type="tel" placeholder="Your Phone Number" />
                            </div>
                        </div>
                        <div className="form-3">
                            <div className="input-group">
                                <label>Message</label>
                                <textarea placeholder="Your Message"></textarea>
                            </div>
                        </div>
                        <div className="btn-4">
                            <button type="submit" className="contact-btn">CONTACT</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}


export default Contact;