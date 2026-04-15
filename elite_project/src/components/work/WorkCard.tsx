import React from 'react';
import { motion } from 'framer-motion';
import { WorkItem } from '../../api/services/work.service';
import { SCALE_UP } from '../../constants/animations';
import "../../Css/Work.css";

interface WorkCardProps {
  item: WorkItem;
  index: number;
}

const WorkCard: React.FC<WorkCardProps> = ({ item }) => {
  return (
    <motion.div 
      variants={SCALE_UP}
      className="work-card"
    >
      <div className="work-image-container">
        {item.logo && (
          <img 
            src={item.logo} 
            alt={item.title} 
            className="work-image"
          />
        )}
        
        {item.video && (
          <video
            src={item.video}
            className="work-video"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
            onMouseEnter={(e) => {
              (e.target as HTMLVideoElement).play().catch(() => {});
              (e.target as HTMLVideoElement).style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLVideoElement).pause();
              (e.target as HTMLVideoElement).currentTime = 0;
              (e.target as HTMLVideoElement).style.opacity = '0';
            }}
            muted
            loop
            playsInline
          />
        )}
      </div>

      <div className="work-card-info">
        <h3 className="work-title">
          {item.title}
        </h3>
        <p className="work-deliverables">
          {item.deliverables}
        </p>
      </div>

      <a href="/work" className="work-link" aria-label={`View ${item.title}`} />
    </motion.div>
  );
};

export default WorkCard;
