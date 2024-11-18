import { useEffect, useState } from "react";
import Header from "../Header";
import "../../Css/About.css"
import "../../Css/Home.css"
import Slick from "../Slick";
// import section1 from "../../assets/about/section1.png";
// import section2 from "../../assets/about/section2.png";
// import section3 from "../../assets/about/section3.png";
import mediaVideo2 from "../../assets/about/media2.mp4"
import Footer from "../Footer";
import TeamSection from "../TeamSection";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";


interface About {
    text: string;
    image: File | null;
    imagePreviewUrl: string | null; // Preview URL for the "Clients" section
    abouttext_about: string;
    aboutimage: string;
    aboutImagePreviewUrl: string | null; // Preview URL for the "About" section
    why_choose_ustext: string;
    why_choose_usimage: string;
    whyChooseUsImagePreviewUrl: string | null; // Preview URL for the "Why Choose Us" section
    text_philo: string;
    image_philo: string;
    philoImagePreviewUrl: string | null; // Preview URL for the "Our Philosophy" section
    teamtext: string;
    id?: number;
}


const About = () => {
    // const [imageFileNames, setImageFileNames] = useState<string[]>(["Click to upload image"]);
    // const [, setFileName] = useState<string>('Click to upload');
    const navigate = useNavigate();
    const [about, setAbout] = useState<About>({
        text: "",
        image: null,
        imagePreviewUrl: null,
        abouttext_about: "",
        aboutimage: "",
        aboutImagePreviewUrl: null,
        why_choose_ustext: "",
        why_choose_usimage: "",
        whyChooseUsImagePreviewUrl: null,
        text_philo: "",
        image_philo: "",
        philoImagePreviewUrl: null,
        teamtext: "",
    });

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get("https://api.elitemediahouses.com/about/", {
                });

                if (response.data.length > 0) {
                    setAbout(response.data[0]);
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchAboutData();
    }, [navigate]);



    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a default duration for the animations
    }, []);

    return (
        <>
            <Helmet>
        <title> About | Elite Media Houses – Your Marketing Innovation Partner</title>
        <meta
          name="description"
          content="Learn about Elite Media Houses, an Advertising agency built on creativity, collaboration, and results. Our team is dedicated to delivering excellence through innovative strategies."
        />
      </Helmet>
            <Header />
            <div className="about-container" >
                <header className="about-header" >
                    <span className="badge-about" data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom" >about</span>

                    <h1 className="title" data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom"
                    >
                        Elite Media Houses <br />
                    </h1>
                    <div className="logo-container-media" data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom">
                        <span className="made-by" >Made By</span>
                        <span className="separator">|</span>
                        <span className="elites" >Elites <br /> For Elites</span>
                    </div>
                </header>
                {/* <hr className="horizontal" /> */}
                <section className="partners-section" >
                    <h3> Proud Partners in Success!</h3>
                    <p className="section-pha" >Celebrating the Achievements of Our Valued Clients.</p>
                    <Slick />
                </section>

                <section className="about-content">
                    <div className="about-section">
                        <div className="image">
                            <img data-aos="fade-up-left" src={about.why_choose_usimage} alt="section1" />
                        </div>
                        <div className="paragraph" data-aos="fade-up-right">
                            <h3 className="heading1">Why Choose Us</h3>
                            <p className="pha1">
                                In a rapidly evolving market choosing the right partner can make all the <span>difference</span>
                            </p>
                            <p className="pha2">
                                {about.why_choose_ustext}
                            </p>

                            <p className="pha3">
                                1. Innovative Approaches<br />
                                2. ⁠Agility and Flexibility<br />
                                3. ⁠Personalized Service<br />
                                4. ⁠Commitment to Your Success<br />
                                5. ⁠FreshPerspective<br />
                            </p>
                            <div className="container-btn">
                                <a href="/contact" className="contact-button-about">CONTACT</a>
                            </div>
                        </div>

                    </div>





                    <div className="about-section">
                        <div className="paragraph" data-aos="fade-up-left">
                            <h3 className="heading1">About</h3>
                            <p className="paragraph1">
                                <span>Elite Media Houses</span>  is the epicenter of <span>creative</span>  and <span>unique</span>  advertising solutions. Our team embodies <span>youth, freshness</span> , and <span>originality</span> ,{about.abouttext_about}

                            </p>
                        </div>

                        <div className="image image-section2">
                            <img data-aos="fade-up-right" src={about.aboutimage} alt="section2" />
                        </div>
                    </div>


                    <div className="about-section">
                        <div className="image3">
                            <img data-aos="fade-up-left" src={about.image_philo} alt="section3" />
                        </div>
                        <div className="paragraph4" data-aos="fade-up-right">
                            <h3 className="heading1">Our Philosophy</h3>
                            <p className="paragraph2">
                                At <span>Elite Media Houses Advertising  Services</span> , we believe that <span>creativity</span>  and <span>innovation</span>  {about.text_philo} <span>fresh</span>  and <span>original</span>   approach, always striving to be trendsetters and pioneers in the advertising industry.

                            </p>

                        </div>
                    </div>

                </section>
                <section>
                    <div className="services-media">
                        <video className="media-video" src={mediaVideo2} autoPlay loop muted />
                        <h2 className="media-text-about" >Our Values</h2>
                    </div>
                </section>
            </div>
            <section>
                <TeamSection />
            </section>
            <Footer />
        </>
    );
}





export default About;