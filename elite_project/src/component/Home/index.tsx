import { useEffect, useState } from "react";
import "../../Css/Home.css";
import logo from "../../assets/logos/EMH logo 2.png";
import Slick from "../Slick";
import ServicesSection from "../ServicesSection ";
import Cards from "../Cards";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
// import ChoiceModal from "../ChoiceModal ";
import Footer from "../Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
// import { Helmet } from "react-helmet-async";





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
    const [, setHome] = useState<Home>({
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
                const response = await axios.get("https://api.elitemediahouses.com/home/", {
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
          {/* <Helmet>
        <title> Elite Media Houses | Creative Marketing Solutions for Every Brand.</title>
        <meta
          name="description"
          content="Welcome to Elite Media Houses, your partner in innovative marketing strategies. We provide exceptional media production, web & app development, branding and identity, and graphic design services to elevate your brand's visibility and success."
        />
      </Helmet> */}
            {/* {!choiceMade && <ChoiceModal setChoiceMade={setChoiceMade} />} 
            {choiceMade && ( 
                <> */}
            <Header />
            <div className="media-header-container">
                <div className="media-info">
                    <span className="badge" data-aos="fade-right">A MEDIA SERVICES</span>
                    <h1 className="title" data-aos="fade-right">
                        Elite Media Houses <br />
                        {/* <span className="sub-title" data-aos="fade-right">Made By <span className="highlight">Elites  span For Elite</span></span> */}
                    </h1>
                    <div className="logo-container-media-home">
                        <span className="made-by" data-aos="fade-right">Made By</span>
                        <span className="separator" data-aos="fade-right">|</span>
                        <span className="elites" data-aos="fade-right">Elites <br /> For Elites</span>
                    </div>
                    <p className="description" data-aos="fade-right">
                        Welcome To The Home Of Creativity, Uniqueness, Freshness, Originality And More.
                    </p>
                    <div className="btn-work-home">
                        <Link to={"/contact"}><button className="view-work-button btn-work" data-aos="fade-right">CONTACT</button></Link>
                    </div>
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
                {/* <div className="cards">
                    <div className="card" >
                        <img data-aos="fade-right" src={image1} alt="" />
                    </div>
                    <div className="card">
                        <img data-aos="fade-left" src={image2} alt="" />
                    </div>
                </div> */}
            </section>

            <section>
                <div className="title-services" >
                    <h1 data-aos="zoom-in-down">Our Work</h1>
                    <div className="title-text-container">
                        <p className="title-text">Leverage our full-service team of experts to drive revenue and grow your business.We’ve got  your back.</p>
                    </div>
                </div>
            </section>

            <section>
                <Cards />
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