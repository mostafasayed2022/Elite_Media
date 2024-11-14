import  { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Css/Home.css';

interface ClientData {
  clientimage: string;
  id?: number;
}

const Slick = () => {
  const [clientData, setClientData] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.elitemediahouses.com/getclient_image/");
        if (response.data.length > 0) {
          setClientData(response.data);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200, // screens up to 1200px
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992, // screens up to 992px
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // screens up to 768px
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576, // screens up to 576px
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // screens up to 480px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="logo-carousel-container">
      {clientData.length > 1 ? (
        <Slider {...settings}>
          {clientData.map((client, index) => (
            <div className="logo-item" key={index}>
              <img src={client.clientimage} alt={`Client ${index}`} />
            </div>
          ))}
        </Slider>
      ) : (
        <div>
          <img src={clientData[0]?.clientimage} alt="Single Client" />
        </div>
      )}
    </div>
  );
};

export default Slick;
