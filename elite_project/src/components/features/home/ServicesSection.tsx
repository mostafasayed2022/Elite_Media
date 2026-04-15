import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useServices } from '../../../hooks/queries/useFeatures';
import { FADE_UP, STAGGER_CONTAINER } from '../../../constants/animations';
import "../../../Css/Home.css";

const ServicesSection = () => {
  const { data: mediaData, isLoading, isError } = useServices();

  if (isError) return null;

  return (
    <section id="services-section" className="services-section">
      <div className="services-header">
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 variants={FADE_UP} className="services-subtitle">
            OUR SERVICES
          </motion.h3>
          <motion.p variants={FADE_UP} className="services-description">
            Complete Marketing Services From Vision to Execution
          </motion.p>
          <motion.h1 variants={FADE_UP} className="services-title">
            Things we're <span className="highlight-services">Great</span> at
          </motion.h1>
          
          <motion.div variants={FADE_UP} className="logo-container-media-home">
              <span className="made-by">MADE BY</span>
              <span className="separator">|</span>
              <span className="elites">ELITES</span>
              <Link to="/work" style={{ marginLeft: '40px' }}>
                <button className="view-work-button">
                  VIEW ALL WORK
                </button>
              </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="services-media">
        {isLoading ? (
          <div className="services-media-grid">
            <div className="video-container shimmer" />
            <div className="image-grid">
               <div className="shimmer" style={{ height: '280px' }} />
               <div className="shimmer" style={{ height: '280px' }} />
            </div>
          </div>
        ) : (
          <div className="services-media-grid">
            {/* Featured Video */}
            <div className="video-container">
              {mediaData?.[0] && (
                <>
                  <video 
                    className="media-video-work" 
                    src={mediaData[0].servicevideo} 
                    playsInline 
                    autoPlay 
                    muted 
                    loop 
                  />
                  <div className="media-text">
                    {mediaData[0].servicename}
                  </div>
                </>
              )}
            </div>

            {/* Side Images Grid */}
            <div className="image-grid">
              {mediaData?.slice(1, 3).map((item, index) => (
                <div key={index} className="image-item" style={{ position: 'relative' }}>
                  <img 
                    className="media-image" 
                    src={item.serviceimage} 
                    alt={item.servicename} 
                  />
                  <div className="media-overlay" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {item.servicename}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
