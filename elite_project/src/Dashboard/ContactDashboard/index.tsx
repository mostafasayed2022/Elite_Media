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
    const navigate = useNavigate(); // Hook for redirection

    useEffect(() => {
        const fetchContactData = async () => {
            const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
    
            if (!token) {
                // Redirect to login if not authenticated
                navigate("/login"); // Adjust the route based on your app's structure
                return;
            }
    
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/dashboard-contact/", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the JWT in the headers
                    },
                });
    
                if (response.data.length > 0) {
                    setContact(response.data[0]); // Assuming the response is an array and the user has only one contact
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error("Error fetching contact data:", error.response);
                    // Optional: Redirect to login if the token is invalid or expired
                    if (error.response.status === 401) {
                        navigate("/login");
                    }
                } else {
                    console.error("Error fetching contact data:", error);
                }
            }
        };
    
        fetchContactData();
    }, [navigate]); // Include navigate in the dependency array
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/dashboard-contact/${contact.id}/`, contact, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Contact updated:", response.data);
            setIsEditing(false); // Exit edit mode
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
                </div>
            </div>
        </div>
    );
};

export default ContactDashboard;
