import React, { useEffect, useRef, useState } from "react";
import "../Css/Home.css";
import axios from "axios";

interface Work {
    id: number;
    title: string;
    logo: string;  // Assuming logo is a URL string
    deliverables: string;
    video: string; // Assuming video is a URL string
}

const Cards: React.FC = () => {
    const [work, setWork] = useState<Work[]>([]); // Initialize with an empty array

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

    // Fetch data from the backend
    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const response = await axios.get("https://api.elitemediahouses.com/work/");
                if (response.data.length > 0) {
                    setWork(response.data);
                }
            } catch (error) {
                console.error("Error fetching works:", error);
            }
        };
        fetchWorks();
    }, []);

    return (
        <div className="container">
            <div className="grid">
                {work.map((item, index) => (
                    <div
                        className="cardss"
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <div className="card-logo">
                            {/* Display logo if it exists */}
                            {item.logo && (
                                <img src={item.logo} alt={item.title} className="card-image" />
                            )}

                            {/* Display video if it exists */}
                            {item.video && (
                                <div className="video-about">
                                    <video
                                        src={item.video}
                                        className="video"
                                        muted
                                        loop
                                        ref={el => (videoRefs.current[index] = el)}
                                    />
                                </div>
                            )}
                        </div>
                        <h2>{item.title}</h2>
                        <p>{item.deliverables}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;
