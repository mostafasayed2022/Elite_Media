import React from "react";
import Header from "../Header";
import "../../Css/Contact.css";
const Contact: React.FC = () => {
    return (
        <>
            <Header />
            <div className="contact-info-container">
                <div className="contact-details">
                    <h2>CONTACT INFORMATION</h2>
                    <p>Mahmoud Mabrouk, 5 St. Omneya<br />
                        Sheraton H, Ezzelden, Cairo, Egypt</p>
                    <p>Email: <a href="mailto:hello@elitemediahouses.com">hello@elitemediahouses.com</a></p>
                    <p>Phone: Egypt (+20) 1067559248</p>
                    <div className="social-icons">
                        {/* Social Icons */}
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="contact-form">
                    <form>
                        <div className="input-group">
                            <label>Name</label>
                            <input type="text" placeholder="Your Name" />
                        </div>
                        <div className="input-group">
                            <label>Title</label>
                            <input type="text" placeholder="Your Job Title" />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="Your Email" />
                        </div>
                        <div className="input-group">
                            <label>Phone Number</label>
                            <input type="tel" placeholder="Your Phone Number" />
                        </div>
                        <div className="input-group">
                            <label>Message</label>
                            <textarea placeholder="Your Message"></textarea>
                        </div>
                        <button type="submit" className="contact-btn">CONTACT</button>
                    </form>
                </div>
            </div>

        </>
    );
}


export default Contact;