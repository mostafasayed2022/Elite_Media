// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import Header from "../Header";
import "../../Css/About.css"
import "../../Css/Home.css"
import Slick from "../Slick";
import section1 from "../../assets/about/section1.png";
import section2 from "../../assets/about/section2.png";
import section3 from "../../assets/about/section3.png";
import mediaVideo2 from "../../assets/about/media2.mp4"
import Footer from "../Footer";
import TeamSection from "../TeamSection";


const About = () => {
    return (
        <>
            <Header />
            <div className="about-container" >
                <header className="about-header" >
                    <span className="badge">about</span>

                    <h1 className="title">
                        Elite Media Houses <br />
                        <span className="sub-title">Made By <span className="highlight">Elites  For  Elite</span></span>
                    </h1>
                </header>

                <section className="partners-section">
                    <h3>Proud Partners in Success!</h3>
                    <p className="section-pha">Celebrating the Achievements of Our Valued Clients.</p>
                    <Slick />
                </section>

                <section className="about-content">
                    <div className="about-section">
                        <div className="image">
                            <img src={section1} alt="section1" />
                        </div>
                        <div className="paragraph">
                            <h3 className="heading1">Why Choose Us</h3>
                            <p className="pha1">
                                In a rapidly evolving market choosing the right partner can make all the <span>difference</span>
                            </p>
                            <p className="pha2">
                                In EMH, we offer a unique blend of innovation, agility, and personalized service that sets us apart from larger, more traditional agencies.
                            </p>

                            <p className="pha3">
                                1. Innovative Approaches<br />
                                2. ⁠Agility and Flexibility<br />
                                3. ⁠Personalized Service<br />
                                4. ⁠Commitment to Your Success<br />
                                5. ⁠FreshPerspective<br />
                            </p>

                            <a href="/contact" className="contact-button">CONTACT</a>
                        </div>

                    </div>





                    <div className="about-section">
                        <div className="paragraph">
                            <h3 className="heading1">About</h3>
                            <p className="paragraph1">
                                <span>Elite Media Houses</span>  is the epicenter of <span>creative</span>  and <span>unique</span>  advertising solutions. Our team embodies <span>youth, freshness</span> , and <span>originality</span> , making us trendsetters and the first choice for our clients. With a distinctive approach, we stay at the forefront of innovation, ensuring our presence is always top of mind.

                            </p>
                        </div>

                        <div className="image">
                            <img src={section2} alt="section2" />
                        </div>
                    </div>


                    <div className="about-section">
                        <div className="image3">
                            <img src={section3} alt="section3" />
                        </div>
                        <div className="paragraph4">
                            <h3 className="heading1">Our Philosophy</h3>
                            <p className="paragraph2">
                                At <span>Elite Media Houses Advertising  Services</span> , we believe that <span>creativity</span>  and <span>innovation</span>  are the cornerstones of impactful advertising. Our philosophy is rooted in the idea that every brand has a <span>unique story</span>  to tell, and it is our mission to bring that story to life in the most compelling and memorable way. We embrace a <span>fresh</span>  and <span>original</span>   approach, always striving to be trendsetters and pioneers in the advertising industry.
                            </p>

                        </div>
                    </div>

                </section>
                <section>
                    <div className="services-media">
                        <video className="media-video" src={mediaVideo2} autoPlay loop muted />
                        <div className="media-overlay media-about">
                            <h2 className="media-text text-about">Our Values</h2>
                        </div>
                    </div>
                </section>
            </div>
            <section>
                <TeamSection/>
            </section>
            <Footer/>
        </>
    );
}





export default About;