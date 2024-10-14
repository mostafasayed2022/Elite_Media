// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import Header from "../Header";
import "../../Css/About.css"
import "../../Css/Home.css"
import CardsWork from "../CardsWork";
import Footer from "../Footer";

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file for AOS animations
const Work = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a default duration for the animations
    }, []);


    return (
        <>
            <Header />
            <section className="work-container">
                <header className="about-header work-header" >
                    <span className="badge badge-work " data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">Work</span>

                    <h1 className="title" data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">
                        Elite Media Houses <br />
                        <span className="sub-title work" data-aos="fade-up"
                            data-aos-anchor-placement="top-bottom">Made By <span className="highlight">Elites  For  Elite</span></span>
                    </h1>
                </header>
            </section>

            <section>
                <CardsWork />
            </section>
            <Footer />
        </>
    );
}





export default Work;