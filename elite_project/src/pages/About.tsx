import React, { Suspense, lazy } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import banner from "../assets/home/bacground.png"; // Fixed path based on CSS comment
import video from "../assets/about/animation.mp4";
import teamImage from "../assets/about/team.png"; // Placeholder for image3
import logo1 from "../assets/logos/logo1.png";
import "../Css/About.css";

const TeamSection = lazy(
  () => import("../components/features/about/TeamSection"),
);

const About = () => {
  return (
    <div className="about-container">
      <Header />

      <main>
        {/* About Header / Banner */}
        <section
          className="about-header"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <h1 className="badge-about">About Us</h1>
          <h2>Elite Media for Elites</h2>
        </section>

        {/* Video Section */}
        <section className="video-about">
          <video
            className="media-video"
            src={video}
            playsInline
            autoPlay
            muted
            loop
          />
          <div className="media-text-about">Elite Media</div>
        </section>

        {/* About Content Section */}
        <section className="about-content">
          <div className="about-section">
            <div className="paragraph">
              <h4 className="heading1">Who we are</h4>
              <h1 className="pha1">
                Creative Agency <span>Focused</span> on Your Brand
              </h1>
              <p className="pha2">
                We are a full-service creative agency that helps businesses
                develop their brand identity and strategic marketing solutions.
              </p>
              <p className="pha3">
                Our vision is to become the global benchmark for creative
                excellence, bridging the gap between artistic vision and
                commercial success.
              </p>
            </div>
            <div className="image">
              <img src={teamImage} alt="About Us" />
            </div>
          </div>

          <div
            className="about-section image-section2"
            style={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}
          >
            <div className="image3">
              <img src={teamImage} alt="Our Vision" />
            </div>
            <div className="paragraph4">
              <h4 className="heading1">Our Vision</h4>
              <p className="paragraph2">
                <span>Elite Vision:</span> To become the premier choice for
                brands that demand excellence and strategic innovation in every
                frame and pixel.
              </p>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="partners-section">
          <h3>Our Partners</h3>
          <p>Building success through strong industry collaborations.</p>
          <div className="partner-logos">
            <img src={logo1} alt="Partner 1" />
            <img src={logo1} alt="Partner 2" />
            <img src={logo1} alt="Partner 3" />
          </div>
        </section>

        {/* Team Section */}
        <Suspense fallback={<div className="container">Loading Team...</div>}>
          <TeamSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default About;
