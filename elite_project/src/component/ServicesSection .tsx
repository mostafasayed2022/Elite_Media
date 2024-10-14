import React, {useEffect} from 'react';
import '../Css/Home.css';
import mediaVideo from "../assets/home/Media Production.mov"
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file for AOS animations
const ServicesSection = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a default duration for the animations
    }, []);


    return (
        <div   id="services-section"className="services-section">
            <div className="services-header">
                <h3 className="services-subtitle" data-aos="fade-down">OUR SERVICES</h3>
                <p className="services-description" data-aos="fade-down-right">Complete Marketing Services From Vision to Execution</p>
                <h1 className="services-title" data-aos="fade-down-right">
                    Things we're <span className="highlight-services">Great</span> at
                </h1>
                <Link to={"/work"}><button className="view-work-button btn-work" data-aos="fade-down">VIEW ALL WORK</button></Link>
            </div>
            <div className="services-media" >
            <video className="media-video" src={mediaVideo}  autoPlay loop muted />
            <div className="media-overlay" >
                    <h2 className="media-text" data-aos="fade-down-right">MEDIA PRODUCTION</h2>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
