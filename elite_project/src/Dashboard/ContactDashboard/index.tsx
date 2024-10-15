import React from "react";
import Sidebar from "../Sidebar";
// import UploadButton from "../UploadButton";
import SearchBar from "../SearchBar";

const ContactDashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="main-content">
                    <SearchBar />

                    {/* Dashboard Sections */}
                    <div className="contact-form-container">
                        <h2 className="contact-title">Contact</h2>

                        <div className="contact-field">
                            <label>Location</label>
                            <a href="#" className="hyperlink">Hyperlink</a>
                            <input type="text"className="contact-input" readOnly />
                        </div>

                        <div className="contact-field">
                            <label>EMH Gmail</label>
                            <a href="mailto:Hello@Elitemediahouses.com" className="hyperlink">Hyperlink</a>
                            <input type="text" className="contact-input" readOnly />
                        </div>

                        <div className="contact-field">
                            <label>EMH Number</label>
                            <input type="text"  className="contact-input" readOnly />
                        </div>

                        <div className="contact-field">
                            <label>Facebook Profile</label>
                            <a href="#" className="hyperlink">Hyperlink</a>
                            <input type="text" className="contact-input" readOnly />
                        </div>

                        <div className="contact-field">
                            <label>Instagram Profile</label>
                            <a href="https://www.instagram.com/elite_media_house/" target="_blank" rel="noopener noreferrer" className="hyperlink">Hyperlink</a>
                            <input type="text" className="contact-input"  readOnly />
                        </div>

                        <div className="contact-field">
                            <label>Linkedin Profile</label>
                            <a href="https://www.linkedin.com/company/elite-media-house/" target="_blank" rel="noopener noreferrer" className="hyperlink">Hyperlink</a>
                            <input type="text" className="contact-input"  readOnly />
                        </div>
                    </div>
                    <button className="save-btn">SAVE</button>
                </div>
            </div>
            
        </>
    );
}


export default ContactDashboard;