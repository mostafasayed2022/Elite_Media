// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../Css/Contact.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "../Footer";
import axios from "axios";




interface Contact {
    address: string;
    phone: string;
    email: string;
    facebook_profile: string;
    instagram_profile: string;
    linkedin_profile: string;
    id?: number; // Optional since it might be absent initially
}



const Contact: React.FC = () => {
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
            <Header />
            <div className="parent">
                <div className="contact-info-container">
                    <div className="contact-cont">
                        <div className="contact-details">
                            <h2>CONTACT INFORMATION</h2>
                            <p className="address"><i className="fas fa-map-marker-alt"></i> <a href="https://g.co/kgs/6qQLj2X">{contact.address}</a></p>
                            <div className="mail-phone">
                                <p className="mail"><i className="fas fa-envelope"></i>  <a href="mailto:hello@elitemediahouses.com">{contact.email}</a></p>
                                <p className="phone"><i className="fas fa-phone"></i>  Egypt (+20) {contact.phone}</p>
                            </div>

                            <div className="social-icons">
                                {/* Social Icons */}
                                <a href={contact.facebook_profile}><i className="fab fa-facebook-f"></i>  </a>
                                <a href={contact.instagram_profile}><i className="fab fa-instagram"></i></a>
                                <a href={contact.linkedin_profile}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <form>
                            <div className="form-1">
                                <div className="input-group">
                                    <label>Name</label>
                                    <input className="inp"
                                        type="text"
                                        placeholder="Your Name" />
                                </div>
                                <div className="input-group">
                                    <label>Title</label>
                                    <input className="inp" type="text" placeholder="Your Job Title" />
                                </div>
                            </div>
                            <div className="form-2">
                                <div className="input-group">
                                    <label>Email</label>
                                    <input className="inp" type="email" placeholder="Your Email" />
                                </div>
                                <div className="input-group">
                                    <label>Phone Number</label>
                                    <input className="inp" type="tel" placeholder="Your Phone Number" />
                                </div>
                            </div>

                            <div className="form-3">
                                <div className="input-group input-group2 ">
                                    <label>Message</label>
                                    <textarea placeholder="Your Message"></textarea>
                                </div>
                            </div>
                        </form>

                        <div className="btn-4">
                            <button type="submit" className="contact-btn">CONTACT</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}


export default Contact;