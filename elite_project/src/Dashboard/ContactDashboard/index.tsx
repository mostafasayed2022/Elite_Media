import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
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

const ContactDashboard: React.FC = () => {
    const [contact, setContact] = useState<Contact>({
        address: "",
        phone: "",
        email: "",
        facebook_profile: "",
        instagram_profile: "",
        linkedin_profile: "",
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [contactExists, setContactExists] = useState<boolean>(true); // New state to track if contact exists
    const navigate = useNavigate(); // Hook for redirection

    useEffect(() => {
        const fetchContactData = async () => {
            const token = localStorage.getItem("access_token"); // Assuming the JWT token is stored in localStorage
    
            if (!token) {
                // Redirect to login if not authenticated
                navigate("/login"); // Adjust the route based on your app's structure
                return;
            }
    
            try {
                const response = await axios.get("https://api.elitemediahouses.com/dashboard_contact/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Include the JWT in the headers
                    },
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSave = async () => {
        // const token = localStorage.getItem("access_token");

        try {
            if (contact.id) {
                // If the contact exists, perform an update
                const response = await axios.put(`https://api.elitemediahouses.com/dashboard_contact/${contact.id}/`, contact, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                console.log("Contact updated:", response.data);
                setIsEditing(false); // Exit edit mode
            } else {
                // Show error if contact does not exist and user is trying to save
                const response = await axios.post(`https://api.elitemediahouses.com/dashboard_contact/`, contact, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
                    },
                });
                console.log("Contact saved:", response.data);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="main-content">
                <SearchBar />

                <div className="contact-form-container">
                    <h2 className="contact-title">Contact</h2>

                    {contactExists ? (
                        <>
                            {/* Contact fields */}
                            <div className="contact-field">
                                <label>Location</label>
                                <input 
                                    type="text" 
                                    className="contact-input" 
                                    name="address" 
                                    value={contact.address} 
                                    onChange={handleChange} 
                                    readOnly={!isEditing} 
                                />
                            </div>

                            <div className="contact-field">
                                <label>EMH Gmail</label>
                                <input 
                                    type="text" 
                                    className="contact-input" 
                                    name="email" 
                                    value={contact.email} 
                                    onChange={handleChange} 
                                    readOnly={!isEditing} 
                                />
                            </div>

                            <div className="contact-field">
                                <label>EMH Number</label>
                                <input 
                                    type="text" 
                                    className="contact-input" 
                                    name="phone" 
                                    value={contact.phone} 
                                    onChange={handleChange} 
                                    readOnly={!isEditing} 
                                />
                            </div>

                            <div className="contact-field">
                                <label>Facebook Profile</label>
                                <input 
                                    type="text" 
                                    className="contact-input" 
                                    name="facebook_profile" 
                                    value={contact.facebook_profile} 
                                    onChange={handleChange} 
                                    readOnly={!isEditing} 
                                />
                            </div>

                            <div className="contact-field">
                                <label>Instagram Profile</label>
                                <input 
                                    type="text" 
                                    className="contact-input" 
                                    name="instagram_profile" 
                                    value={contact.instagram_profile} 
                                    onChange={handleChange} 
                                    readOnly={!isEditing} 
                                />
                            </div>

                            <div className="contact-field">
                                <label>LinkedIn Profile</label>
                                <input 
                                    type="text" 
                                    className="contact-input" 
                                    name="linkedin_profile" 
                                    value={contact.linkedin_profile} 
                                    onChange={handleChange} 
                                    readOnly={!isEditing} 
                                />
                            </div>

                            {isEditing ? (
                                <button className="save-btn" onClick={handleSave}>SAVE</button>
                            ) : (
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>EDIT</button>
                            )}
                        </>
                    ) : (
                        <p>No contact record found. Please create one.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactDashboard;
