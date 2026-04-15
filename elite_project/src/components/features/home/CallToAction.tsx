import React from "react";
import { Link } from "react-router-dom";
import "../../../Css/Home.css";

const CallToAction = () => {
  return (
    <section className="cta-wrapper">
      {/* Primary CTA (Animation/Background) */}
      <div className="CallToAction">
        <div className="action">
          <div className="text-action">
            <h1 className="text-action-1">
              LET'S BUILD SOMETHING <br /> EXTRAORDINARY
            </h1>
            <p className="text-action-2">
              Transform your vision into elite digital experiences.
            </p>
          </div>
          <Link to="/contact">
            <button className="view-work-button">Get Started</button>
          </Link>
        </div>
      </div>

      {/* Bottom Contact Message */}
      <div className="contact-message">
        <div className="action2">
          <div className="text-action2">
            <h1 className="text-action-2">
              Ready to Elevate <br /> Your Brand?
            </h1>
            <p className="text-action-3">
              Elite Media Houses for Elites. Contact us today.
            </p>
          </div>
          <Link to="/contact">
            <button className="view-work-button" style={{ marginTop: "20px" }}>
              Contact Us Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
