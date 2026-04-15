import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWork } from "../../../hooks/queries/useWork";
import { FADE_UP, STAGGER_CONTAINER } from "../../../constants/animations";
import "../../../Css/Home.css";

const HomeCards: React.FC = () => {
    const { data: works, isLoading, isError } = useWork();

    if (isLoading) {
        return (
            <div className="container">
                <div className="grid">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="cardss shimmer" style={{ height: '300px' }} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) return null;

    return (
        <div className="container">
            <div className="title-services">
                <h1>Show Everything</h1>
                <div className="title-text-container">
                    <p className="title-text">
                        Explore our elite portfolio of creative media production, strategic branding, and high-end digital solutions.
                    </p>
                </div>
            </div>

            <motion.div 
                variants={STAGGER_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid"
            >
                {works?.slice(0, 4).map((item) => (
                    <motion.div
                        key={item.id}
                        variants={FADE_UP}
                        className="cardss"
                    >
                        <div className="card-logo">
                            {/* Static Image */}
                            {item.logo && (
                                <img 
                                    src={item.logo} 
                                    alt={item.title} 
                                    className="card-image" 
                                />
                            )}

                            {/* Hover Video */}
                            {item.video && (
                                <video
                                    src={item.video}
                                    className="video"
                                    playsInline 
                                    muted 
                                    loop
                                    onMouseEnter={(e) => {
                                        const video = e.currentTarget;
                                        video.play().catch(() => {});
                                    }}
                                    onMouseLeave={(e) => {
                                        const video = e.currentTarget;
                                        video.pause();
                                        video.currentTime = 0;
                                    }}
                                />
                            )}
                        </div>
                        
                        <div style={{ padding: '20px 0' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color3)' }}>{item.title}</p>
                            <p style={{ color: 'var(--color4)', fontSize: '0.9rem' }}>{item.deliverables}</p>
                        </div>

                        <Link 
                            to="/work" 
                            className="absolute inset-0 z-10"
                            style={{ position: 'absolute', inset: 0 }}
                            aria-label={`View ${item.title}`}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <div className="btn-work-home">
                <Link to="/work">
                    <button className="view-work-button">
                        View More Work
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomeCards;
