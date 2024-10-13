// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "../../Css/Home.css";
import logo from "../../assets/logos/logo1.png";
import Slick from "../Slick";
import ServicesSection from "../ServicesSection ";
import image1 from "../../assets/home/image1.png";
import image2 from "../../assets/home/image2.png"
import Cards from "../Cards";
import Header from "../Header";



const Home = () => {
    return (
        <>
            <Header />

            <div className="media-header-container">
                <div className="media-info">
                    <span className="badge">A MEDIA SERVICES</span>
                    <h1 className="title">
                        Elite Media Houses <br />
                        <span className="sub-title">Made By <span className="highlight">Elites  For  Elite</span></span>
                    </h1>
                    <p className="description">
                        Welcome To The Home Of Creativity, Uniqueness, Freshness, Originality And More.
                    </p>
                </div>
                <div className="logo-container">
                    <img src={logo} alt="EMH Logo" className="emh-logo" />
                </div>
            </div>

            <section>
                <Slick />
            </section>

            <section>
                <ServicesSection />
            </section>

            <section>
                <div className="cards">
                    <div className="card">
                        <img src={image1} alt="" />
                    </div>
                    <div className="card">
                        <img src={image2} alt="" />
                    </div>
                </div>
            </section>

            <section>
                <div className="title-services">
                    <h1>Ready to Elevate Your Career ?
                        Join Our Elite Squad of Innovators !</h1>
                </div>
            </section>

            <section>
                <Cards />
            </section>
        </>
    );
}

export default Home;