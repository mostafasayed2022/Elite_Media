import React, { Suspense, lazy } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import logo from "../assets/logos/logo1.png";
import "../Css/Home.css";

// Lazy loading components
const ServicesSection = lazy(() => import("../components/features/home/ServicesSection"));
const HomeCards = lazy(() => import("../components/features/home/HomeCards"));
const Slick = lazy(() => import("../components/features/home/Slick"));
const CallToAction = lazy(() => import("../components/features/home/CallToAction"));

const Home = () => {
    return (
        <div className="home-container">
            <Header />
            
            <main>
                {/* Hero / Banner Section */}
                <section className="media-header-container">
                    <div className="media-info">
                        <span className="badge">Elite Media Houses</span>
                        <h1 className="title">
                            ELITE MEDIA <br /> FOR ELITES
                        </h1>
                        <p className="description">
                            We don't just create content, we create impact. Our mission is to elevate your brand to the elite status it deserves.
                        </p>
                    </div>
                    <div className="logo-container-home">
                        <img src={logo} alt="Elite Logo" className="emh-logo" />
                    </div>
                </section>

                {/* Services Section */}
                <Suspense fallback={<div className="container">Loading Services...</div>}>
                    <ServicesSection />
                </Suspense>

                {/* Clients / Logos Slider */}
                <Suspense fallback={null}>
                    <Slick />
                </Suspense>

                {/* Works Preview Section */}
                <Suspense fallback={<div className="container">Loading Work...</div>}>
                    <HomeCards />
                </Suspense>

                {/* Call to Action Section */}
                <Suspense fallback={null}>
                    <CallToAction />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
