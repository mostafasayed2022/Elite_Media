// eslint-disable-next-line @typescript-eslint/no-unused-vars
import  { useEffect, useState } from "react";
import "../Css/Footer.css";
import logo from "../assets/logos/logo1.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import '@fortawesome/fontawesome-free/css/all.min.css';


interface Contact {
    address: string;
    phone: string;
    email: string;
    facebook_profile: string;
    instagram_profile: string;
    linkedin_profile: string;
    id?: number; // Optional since it might be absent initially
}

const Footer = () => {

    // const [isEditing, setIsEditing] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setContactExists] = useState<boolean>(true);
    const navigate = useNavigate(); // Hook for redirection

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [contact, setContact] = useState<Contact>({
        address: "",
        phone: "",
        email: "",
        facebook_profile: "",
        instagram_profile: "",
        linkedin_profile: "",
    });


    useEffect(() => {
        const fetchContactData = async () => {

            try {
                const response = await axios.get("https://api.elitemediahouses.com/contact/", {

                });

                if (response.data.length > 0) {
                    setContact(response.data[0]); // Assuming the user has only one contact
                    setContactExists(true); // Contact exists
                } else {
                    setContactExists(true); // No contact exists, user will create one
                    // Optionally, initialize a blank contact for the user to fill out
                    setContact({
                        address: "",
                        phone: "",
                        email: "",
                        facebook_profile: "",
                        instagram_profile: "",
                        linkedin_profile: "",
                    });
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error("Error fetching contact data:", error.response);
                    // Only redirect to login for authentication errors (401)
                    if (error.response.status === 401) {
                        navigate("/login");
                    }
                } else {
                    console.error("Error fetching contact data:", error);
                }
            }
        };

        fetchContactData();
    }, [navigate]);



    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <div className="head">
                        <h4>Get in touch</h4>
                        <div className="touch">
                            <a href="mailto:hello@elitemediahouses.com">{contact.email}</a>
                            <ul className="footer-contact">
                                <li>Egypt|(+20) {contact.phone}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="touch-1">
                        <h4>Services</h4>
                        <ul className="footer-services">
                            <li>Media Production</li>
                            <li>Websites & Applications</li>
                            <li>Branding & Identity</li>
                            <li>Graphic Design</li>
                        </ul>
                    </div>

                </div>
                <div className="footer-but">
                    <div className="social-icons-footer">
                        <a href={contact.facebook_profile}><i className="fab fa-facebook-f"></i></a>
                        <a href={contact.instagram_profile}><i className="fab fa-instagram"></i></a>
                        <a href={contact.linkedin_profile}><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="copy">
                        <Link to="/login">sign In</Link>
                        <p>© 2024 Elite Media Houses. All rights reserved.</p>
                    </div>
                </div>

            </footer>
        </>
    );
}


export default Footer;