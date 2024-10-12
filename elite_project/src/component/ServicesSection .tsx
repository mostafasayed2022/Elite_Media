import React from 'react';
import '../Css/Home.css';
import mediaVideo from "../assets/home/Media Production.mov"

const ServicesSection = () => {
    return (
        <div className="services-section">
            <div className="services-header">
                <h3 className="services-subtitle">OUR SERVICES</h3>
                <p className="services-description">Complete Marketing Services From Vision to Execution</p>
                <h1 className="services-title">
                    Things we're <span className="highlight-services">Great</span> at
                </h1>
                <button className="view-work-button">VIEW ALL WORK</button>
            </div>
            <div className="services-media">
            <video className="media-video" src={mediaVideo}  autoPlay loop muted />
            <div className="media-overlay">
                    <h2 className="media-text">MEDIA PRODUCTION</h2>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
