import { useEffect, useState } from 'react';
import '../Css/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file for AOS animations
import axios from 'axios';

interface MediaData {
  text: string;
  video: File | null;
  image: File | null;
  clientvideo: File | null;
  clientimage: File | null;
  teamtext: string;
  teamvideo: File | null;
  teamimage: File | null;
  servicename: string;
  serviceimage: string;
  servicevideo: string;
  id?: number;
}

const ServicesSection = () => {
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState<MediaData[]>([]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a default duration for animations
  }, []);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get("https://api.elitemediahouses.com/get_service/");
        if (response.data.length > 0) {
          setMediaData(response.data);
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
        <Link to={"/work"}>
          <button className="view-work-button" data-aos="fade-down">VIEW ALL WORK</button>
        </Link>
      </div>

      <div className="services-media-grid">
        {mediaData.map((item, index) =>
          item.servicevideo ? (
            <div key={index} className="media-item video-container">
              <video className="media-video-work" src={item.servicevideo} playsInline autoPlay muted loop />
              <h2 className="media-text">{item.servicename}</h2>
            </div>
          ) : null
        )}

        <div className="image-grid">
          {mediaData.slice(0, 3).map((item, index) =>
            item.serviceimage ? (
              <div key={index} className="media-item">
                <img className="media-image" src={item.serviceimage} alt={item.servicename} />
                <h2 className="media-text">{item.servicename}</h2>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
