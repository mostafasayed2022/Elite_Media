import React, { useState } from "react"; 
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../Css/Contact.css";
import video from "../assets/about/animation.mp4";

interface Join {
    name: string;
    jobTitle: string;
    email: string;
    phoneNumber: string;
    linkedinProfile: string;
    portfolio: string;
    resume: File | null;
}

const JoinTeam: React.FC = () => {
    const [fileName, setFileName] = useState('Click to upload');
    const [formData, setFormData] = useState<Join>({
        name: '',
        jobTitle: '',
        email: '',
        phoneNumber: '',
        linkedinProfile: '',
        portfolio: '',
        resume: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFormData({ ...formData, resume: file });
            setFileName(file.name);
        } else {
            setFileName('Click to upload');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Join) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSave2 = async () => {
        const data = new FormData();
        
        // Append each field in formData to FormData object
        for (const key in formData) {
            const value = formData[key as keyof Join];
            if (key === 'resume' && value) {
                data.append(key, value as File); // Add file directly
            } else if (value) {
                data.append(key, String(value)); // Convert other fields to string
            }
        }

        try {
            const response = await axios.post("https://api.elitemediahouses.com/jointeam/", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Response received:", response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.error("Validation error:", error.response.data); // Log backend validation issues
            } else {
                console.error("Error saving data:", error);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="contact-info-container">
                <div className="contact-form-team">
                    <div className="text-team">
                        <h1 className="title-services-text">Join Our Team</h1>
                        <div className="team-text">
                            <h4>Any question or remarks?</h4>
                            <p>Just write us a message!</p>
                        </div>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSave2(); // Submit form data when the form is submitted
                    }}>
                        <div className="form-1-team">
                            <div className="input-group">
                                <label>Name</label>
                                <input
                                    className="inp"
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange(e, "name")}
                                />
                            </div>
                            <div className="input-group">
                                <label>Job Title</label>
                                <input
                                    className="inp"
                                    type="text"
                                    placeholder="Your Title"
                                    value={formData.jobTitle}
                                    onChange={(e) => handleInputChange(e, "jobTitle")}
                                />
                            </div>
                        </div>
                        <div className="form-2-team">
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    className="inp"
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange(e, "email")}
                                />
                            </div>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input
                                    className="inp"
                                    type="tel"
                                    placeholder="Your Phone"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange(e, "phoneNumber")}
                                />
                            </div>
                        </div>
                        <div className="form-2-team">
                            <div className="input-group">
                                <label>LinkedIn Profile</label>
                                <input
                                    className="inp"
                                    type="text"
                                    placeholder="Your LinkedIn"
                                    value={formData.linkedinProfile}
                                    onChange={(e) => handleInputChange(e, "linkedinProfile")}
                                />
                            </div>
                            <div className="input-group">
                                <label>Portfolio</label>
                                <input
                                    className="inp"
                                    type="text"
                                    placeholder="Your Portfolio"
                                    value={formData.portfolio}
                                    onChange={(e) => handleInputChange(e, "portfolio")}
                                />
                            </div>
                        </div>
                        <div className="form-3-team">
                            <div className="upload-box1">
                                <label htmlFor="resume-upload" className="resume-label">
                                    Resume/CV <span className="formats-info">Allowed formats: pdf, doc.</span>
                                </label>
                                <div className="upload-input-container">
                                    <input
                                        id="resume-upload"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="upload-input"
                                    />
                                    <span className="file-name">{fileName}</span>
                                </div>
                            </div>
                        </div>
                        <div className="btn-4-team">
                            <button type="submit" className="contact-btn-team">Join The Team</button>
                        </div>
                    </form>
                </div>
                <div className="vid">
                    <video className="contact-video" src={video}  playsInline autoPlay muted loop>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JoinTeam;
