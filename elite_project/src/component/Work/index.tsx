import { useEffect } from "react";
import Header from "../Header";
import "../../Css/About.css"
import "../../Css/Home.css"
import CardsWork from "../CardsWork";
import Footer from "../Footer";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file for AOS animations
// import { Helmet } from "react-helmet-async";
const Work = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a default duration for the animations
    }, []);


    return (
        <>
                  {/* <Helmet>
        <title> Work | Elite Media Houses – Success Stories in Marketing</title>
        <meta
          name="description"
          content="Explore our portfolio of successful projects across various industries. From creative campaigns to impactful media production, see how we’ve helped brands grow and thrive."
        />
      </Helmet> */}
            <Header />
            <section className="work-container">
                <header className="about-header" >
                    <span className="badge-about " data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">Work</span>
                    <h1 className="title" data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">
                        Elite Media Houses <br />
                    </h1>
                    <div className="logo-container-media" data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">
                        <span className="made-by" >Made By</span>
                        <span className="separator">|</span>
                        <span className="elites" >Elites <br /> For Elites</span>
                    </div>
                </header>
            </section>
            <section>
                <div className="show">
                    <p className="show-every"> Show EveryThing</p>
                    <hr />
                </div>
                <CardsWork />
            </section>
            <Footer />
        </>
    );
}





export default Work;