// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import "../../Css/Home.css";
import logo from "../../assets/logos/logo1.png";
import Slick from "../Slick";
import ServicesSection from "../ServicesSection ";
import image1 from "../../assets/home/image1.png";
import image2 from "../../assets/home/image2.png"
import Cards from "../Cards";
import Header from "../Header";
import { Link,useNavigate } from "react-router-dom";
// import ChoiceModal from "../ChoiceModal ";
import Footer from "../Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";




interface Home {
    text: string;
    video: File | null;
    image: File | null;
    clientvideo: File | null;
    clientimage: File | null;
    teamtext: string;
    teamvideo: File | null;
    teamimage: File | null;
    servicename: string;
    serviceimage: File | null;
    servicevideo: File | null;
    id?: number;
}



const Home = () => {
    // const [choiceMade, setChoiceMade] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [home, setHome] = useState<Home>({
        text: "",
        video: null,
        image: null,
        clientvideo: null,
        clientimage: null,
        teamtext: "",
        teamvideo: null,
        teamimage: null,
        servicename: "",
        serviceimage: null,
        servicevideo: null,
    });

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a default duration for the animations
    }, []);
    
    
    useEffect(() => {
        const fetchHomeData = async () => {

            try {
                const response = await axios.get("http://127.0.0.1:8000/home/", {
                });

                if (response.data.length > 0) {
                    setHome(response.data[0]);

                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchHomeData();
    }, [navigate]);

    

    return (
        <>
            {/* {!choiceMade && <ChoiceModal setChoiceMade={setChoiceMade} />} 
            {choiceMade && ( 
                <> */}
                    <Header />
                    <div className="media-header-container">
                        <div className="media-info">
                            <span className="badge" data-aos="fade-right">A MEDIA SERVICES</span>
                            <h1 className="title" data-aos="fade-right">
                                Elite Media Houses <br />
                                <span className="sub-title" data-aos="fade-right">Made By <span className="highlight">Elites  For  Elite</span></span>
                            </h1>
                            <p className="description" data-aos="fade-right">
                                Welcome To The Home Of Creativity, Uniqueness, Freshness, Originality And More.
                            </p>
                        </div>
                        <div className="logo-container-home">
                            <img data-aos="fade-left" src={logo} alt="EMH Logo" className="emh-logo" />
                        </div>
                    </div>

                    <section >
                        <Slick />
                    </section>

                    <section>
                        <ServicesSection />
                    </section>

                    <section>
                        <div className="cards">
                            <div className="card" >
                                <img data-aos="fade-right" src={image1} alt="" />
                            </div>
                            <div className="card">
                                <img data-aos="fade-left" src={image2} alt="" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="title-services" >
                            <h1 data-aos="zoom-in-down">Ready to Elevate Your Career ?
                                Join Our Elite Squad of Innovators !</h1>
                        </div>
                    </section>

                    <section>
                        <Cards />
                        <div className="btn-work">
                            <Link to={"/work"}><button className="view-work-button btn-work" data-aos="zoom-in-down">VIEW ALL WORK</button></Link>
                        </div>
                    </section>
                    <section className="CallToAction">
                        <div className="action">
                            <div className="text-action">
                                <p className="text-action-1" data-aos="zoom-in-down">Ready to Elevate Your Career ?
                                    Join Our Elite Squad of Innovators !
                                </p>
                                <p className="text-action-2" data-aos="zoom-in-up">Unleash Your Potential and Become Part of the Creative Force Shaping the<br /> Future of Marketing !
                                </p>
                            </div>
                            <div className="btn-work">
                                <Link to={"/join"}><button className="view-work-button btn-work" data-aos="zoom-in-up">JOIN OUR TEAM</button></Link>
                            </div>
                        </div>

                    </section>
                    <section className="contact-message">
                        <div className="action2">
                            <div className="text-action2">
                                <p className="text-action-2" data-aos="fade-right"
                                    data-aos-offset="300"
                                    data-aos-easing="ease-in-sine">Transform Your Vision into Reality with Elite Marketing Solutions !
                                </p>
                                <p className="text-action-3">Elevate Your Brand with Strategic and Creative <br /> Excellence.
                                </p>
                            </div>
                            <div className="btn-work">
                                <Link to={"/contact"}><button className="view-work-button btn-work" data-aos="fade-right">CONTACT</button></Link>
                            </div>
                        </div>
                    </section>

                    <Footer />
                {/* </>
            )} */}
        </>

    );
}

export default Home;