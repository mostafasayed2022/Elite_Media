import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useClients } from '../../../hooks/queries/useFeatures';
import { Skeleton } from '../../ui/Skeleton';
import { motion } from 'framer-motion';
import { FADE_UP } from '../../../constants/animations';
import "../../../Css/Home.css";

const Slick = () => {
  const { data: clientData, isLoading, isError } = useClients();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };
  
  if (isError) return null;

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={FADE_UP}
      className="logo-carousel-container"
    >
      <div className="section-header" style={{ marginBottom: '40px' }}>
        <p className="section-subtitle" style={{ fontSize: '10px', color: '#ccc' }}>
          Trusted by Industry Leaders
        </p>
      </div>

      {isLoading ? (
        <div className="shimmer-container" style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} style={{ height: '80px', width: '120px' }} />
          ))}
        </div>
      ) : (
        <div className="client-carousel">
          <Slider {...settings}>
            {clientData?.map((client, index) => (
              <div key={index} className="logo-item">
                <img 
                  src={client.clientimage} 
                  alt={`Client Logo ${index}`} 
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </motion.div>
  );
};

export default Slick;
