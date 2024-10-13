import React, { useRef } from "react";
import "../Css/Home.css";
import XtraGreenLogo from '../assets/home/image4.png';
import AlmentorLogo from '../assets/home/image6.png';
import AxisLogo from '../assets/home/image3.png';
import AlJoufLogo from '../assets/home/image5.png';

import Abtal from "../assets/work/Abtal El Amal Initiative-image.png";
import Ahmed from "../assets/work/Ahmed Farid Mustapha.png";
import united from "../assets/work/UNITED BROTHERS.png";
import zyout from "../assets/work/ZYOUT-image.png";





import video from "../assets/home/xtra.mp4";
import video1 from "../assets/home/Axis.mp4"; // Video for AXIS
import video2 from "../assets/work/Abtal El Amal Initiative.mp4"; // Video for AXIS
import video3 from "../assets/work/ZYOUT.mp4"; // Video for AXIS


const CardsWork: React.FC = () => {
    // Initialize videoRefs with an array of nullable HTMLVideoElement
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const handleMouseEnter = (index: number) => {
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            videoElement.play(); // Play video if it exists
        }
    };

    const handleMouseLeave = (index: number) => {
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            videoElement.pause(); // Pause video if it exists
            videoElement.currentTime = 0; // Reset video
        }
    };

    // Array of card data with their respective videos
    const cardsData = [
        { logo: XtraGreenLogo, title: "Xtra Green", description: "#Branding & Identity", videoSrc: video },
        { logo: AlmentorLogo, title: "Almentor", description: "#Media Production #Videographic #Printing & Giveaways #Editing" }, // Same video
        { logo: AxisLogo, title: "AXIS", description: "#Branding & Identity", videoSrc: video1 }, // Different video for AXIS
        { logo: AlJoufLogo, title: "Al Jouf Urban Observatory", description: "#Motion Graphic" }, // Same video
        { logo: Abtal, title: "Al Jouf Urban Observatory", description: "#UI/UX #WEBSITE" , videoSrc: video2 }, // Same video
        { logo: Ahmed, title: "Al Jouf Urban Observatory", description: "#Motion Graphic #Application" }, // Same video
        { logo: united, title: "Al Jouf Urban Observatory", description: "#UI/UX #WEBSITE" }, // Same video
        { logo: zyout, title: "Al Jouf Urban Observatory", description: "#Motion Graphic #Branding & Identity",videoSrc: video3 }, // Same video

    ];

    return (
        <div className="container">
            <div className="grid">
                {cardsData.map((card, index) => (
                    <div 
                        className="cardss" 
                        key={index} 
                        onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <div className="card-logo">
                            <img src={card.logo} alt={card.title} className="card-image" />
                            <video 
                                src={card.videoSrc}  // Use videoSrc from card data
                                className="video" 
                                muted 
                                loop 
                                ref={el => (videoRefs.current[index] = el)} 
                            />
                        </div>
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsWork;
