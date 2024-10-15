import React from "react";
import Sidebar from "../Sidebar";
import UploadButton from "../UploadButton";
import SearchBar from "../SearchBar";
import "../Css/Dashboard.css";
const AboutDashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="main-content">
                    <SearchBar />

                    {/* Dashboard Sections */}
                    <div className="section intro-session">
                        <h2>Why Choose Us Session</h2>
                        <label>Text</label>
                        <div className="intro-section1">
                            <textarea placeholder="Write here..." className="intro-text" />
                            <UploadButton label="Photo or Video" size="1920x1080" />
                        </div>
                        <button className="save-btn">SAVE</button>
                    </div>

                    <div className="section intro-session">
                        <h2>Clients Session</h2>
                        <label>Text</label>
                        <div className="intro-section1">
                            <textarea placeholder="Write here..." className="intro-text" />
                            <UploadButton label="Photo or Video" size="200x200" />
                        </div>
                        <button className="save-btn">SAVE</button>
                    </div>

                    <div className="section intro-session">
                        <h2>About Sessionn</h2>
                        <div className="intro-section2">
                            <label htmlFor="text">Text   “About”</label>
                            <div className="sec1">
                                <textarea placeholder="Write here..." className="intro-text-session" />
                                <UploadButton label="Photo or Video" size="751x460" />
                            </div>
                            <label htmlFor="text">Text “Our Philosophy”</label>
                            <div className="sec2">
                                <textarea placeholder="Write here..." className="intro-text-session" />
                                <UploadButton label="Photo or Video" size="751x460" />
                            </div>
                        </div>
                        <UploadButton label="Photo or Video" size="1924x700" />
                    </div>


                    <div className="section services-session">
                        <h2>Our Team Session</h2>
                        <textarea placeholder="Write here..." className="intro-text" />

                        <div className="service">
                        </div>
                        <div className="service">
                        </div>
                        
                        <button className="save-btn">SAVE</button>
                    </div>

                </div>
            </div>
        </>
    );
}


export default AboutDashboard;