import { useEffect, useState } from 'react';
import '../Css/Home.css';
// import mediaVideo from "../assets/home/Media Production.mov"
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file for AOS animations
import axios from 'axios';
import image1 from "../assets/home/img1.png";
import image2 from "../assets/home/img2.png";
import video from "../assets/home/media-home.mp4";
interface Home {
    text: string;
    video: File | null;
    image: File | null;
    clientvideo: File | null;
    clientimage: File | null;
    teamtext: string;
    teamvideo: File | null;
    teamimage: File | null;
    servicename: string;
    serviceimage: File | null;
    servicevideo: string;
    id?: number;
}



const ServicesSection = () => {

    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setHome] = useState<Home>({
        text: "",
        video: null,
        image: null,
        clientvideo: null,
        clientimage: null,
        teamtext: "",
        teamvideo: null,
        teamimage: null,
        servicename: "",
        serviceimage: null,
        servicevideo: "",
    });


    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a default duration for the animations
    }, []);

    useEffect(() => {
        const fetchServiceData = async () => {

            try {
                const response = await axios.get("https://api.elitemediahouses.com/get_service/", {
                });

                if (response.data.length > 0) {
                    setHome(response.data[0]);

                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchServiceData();
    }, [navigate]);


    return (
        <div id="services-section" className="services-section">
            <div className="services-header">
                <h3 className="services-subtitle" data-aos="fade-down">OUR SERVICES</h3>
                <p className="services-description" data-aos="fade-down-right">Complete Marketing Services From Vision to Execution</p>
                <h1 className="services-title" data-aos="fade-down-right">
                    Things we're <span className="highlight-services">Great</span> at
                </h1>
                <Link to={"/work"}><button className="view-work-button " data-aos="fade-down">VIEW ALL WORK</button></Link>
            </div>
            <div className="services-media-grid">
                <div className="media-item video-container">
                    {/* {home.servicevideo ? ( */}
                        <video className="media-video-work" src={video} autoPlay loop muted />
                    {/* ) : (
                        <p>Loading video...</p>
                    )} */}
                    <h2 className="media-text" >Media Production</h2>

                </div>
                <div className="media-overlay" >
                    {/* <h2 className="media-text" data-aos="fade-down-right">MEDIA PRODUCTION</h2> */}
                </div>
                {/* Two Image Items */}
                <div className="image-item">
                    <div className="media-item">
                        <img className="media-image" src={image1} alt="Service Image" />
                        <h2 className="media-text" >WEB & APP</h2>
                    </div>

                    <div className="media-item">
                        <img className="media-image" src={image2} alt="Service Image" />
                        <h2 className="media-text" >BRANDING</h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServicesSection;
