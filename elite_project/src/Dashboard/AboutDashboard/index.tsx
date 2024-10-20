import React, { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Dashboard.css";

interface About {
    text: string;
    image: File | null;
    abouttext_about: string;
    aboutimage: File | null;
    why_choose_ustext: string;
    why_choose_usimage: File | null;
    text_philo: string;
    image_philo: File | null;
    teamtext: string;
    teamimage: File | null;
    id?: number;
}

const AboutDashboard = () => {
    const [about, setAbout] = useState<About>({
        text: "",
        image: null,
        abouttext_about: "",
        aboutimage: null,
        why_choose_ustext: "",
        why_choose_usimage: null,
        text_philo: "",
        image_philo: null,
        teamtext: "",
        teamimage: null,
    });
    const [, setFileName] = useState<string>('Click to upload');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAboutData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/about_dashboard/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAbout({ ...about, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof About) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            setAbout({ ...about, [field]: file });
            setFileName(`File: ${file.name}`);
        } else {
            setFileName('Click to upload');
        }
    };

    const handleSave = async (section: keyof About, section2: keyof About) => {
        const formData = new FormData();

        // Append all fields to FormData
        if (about[section] && about[section2]) {
            formData.append(section, about[section] as Blob);
            formData.append(section2, about[section2] as string);
        }

        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data',
            };

            if (about.id) {
                const response = await axios.put(`http://127.0.0.1:8000/about_dashboard/${about.id}/`, formData, { headers });
                console.log("About updated:", response.data);
            } else {
                const response = await axios.post("http://127.0.0.1:8000/about_dashboard/", formData, { headers });
                console.log("About saved:", response.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <Sidebar />
                <div className="main-content">
                    <SearchBar />
                    <div className="section intro-session">
                        <h2>Why Choose Us Session</h2>
                        <label>Text</label>
                        <div className="intro-section1">
                            <textarea
                                placeholder="Write here..."
                                className="intro-text"
                                name="why_choose_ustext"
                                value={about.why_choose_ustext}
                                onChange={handleTextChange}
                            />
                            <div>
                                <label htmlFor="why-choose-us-image" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="why-choose-us-image"
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={(e) => handleFileChange(e, "why_choose_usimage")}
                                        className="file-upload-input"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="save-btn" onClick={() => handleSave("why_choose_usimage", "why_choose_ustext")}>SAVE</button>
                    </div>
                    <div className="section intro-session">
                        <h2>Clients Session</h2>
                        <label>Text</label>
                        <div className="intro-section1">
                            <textarea
                                placeholder="Write here..."
                                className="intro-text"
                                name="text"
                                value={about.text}
                                onChange={handleTextChange}
                            />
                            <div>
                                <label htmlFor="client-image-upload" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="client-image-upload"
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={(e) => handleFileChange(e, "image")}
                                        className="file-upload-input"
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="save-btn" onClick={() => handleSave( "image","text")}>SAVE</button>
                    </div>
                    {/* Additional sections here */}
                    {/*start  About Session */}

                    <div className="section intro-session">
                        <h2>About Sessionn</h2>
                        <div className="intro-section2">
                            <label htmlFor="text">Text   “About”</label>
                            <div className="sec1">
                                <textarea
                                    placeholder="Write here..."
                                    className="intro-text"
                                    name="abouttext_about"
                                    value={about.abouttext_about}
                                    onChange={handleTextChange}
                                />
                                <div>
                                    <label htmlFor="team-video-upload3" className="file-upload-label">
                                        Upload Image
                                        <input
                                            id="team-video-upload3"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'aboutimage')}
                                            className="file-upload-input"
                                        />
                                    </label>
                                </div>
                                <button className="save-btn" onClick={() => handleSave("aboutimage","abouttext_about")}>Save About</button>
                            </div>

                            <label htmlFor="text">Text “Our Philosophy”</label>
                            <div className="sec2">
                                <textarea
                                    placeholder="Write here..."
                                    className="intro-text"
                                    name="text_philo"
                                    value={about.text_philo}
                                    onChange={handleTextChange}
                                />
                                <div>
                                    <label htmlFor="philo-image-upload" className="file-upload-label">
                                        Upload Image
                                        <input
                                            id="philo-image-upload"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'image_philo')}
                                            className="file-upload-input"
                                        />
                                    </label>
                                </div>
                                <button className="save-btn" onClick={() => handleSave("image_philo","text_philo")}>Save About</button>
                            </div>
                        </div>
                       
                    </div>


                    {/*start  About Session */}


                    <div className="section services-session">
                        <h2>Our Team Session</h2>
                        <textarea
                            placeholder="Write here..."
                            className="intro-text"
                            name="teamtext"
                            value={about.teamtext}
                            onChange={handleTextChange}
                        />
                         <div>
                            <label htmlFor="team-image-upload" className="file-upload-label">
                                Upload Image
                                <input
                                    id="team-image-upload"
                                    type="file"
                                    accept="image/, video/"
                                    onChange={(e) => handleFileChange(e, 'teamimage')}
                                    className="file-upload-input"
                                />
                            </label>
                        </div>
                        <div className="service">
                        </div>
                        <button className="save-btn" onClick={() => handleSave("teamimage","teamtext")}>SAVE</button>
                    </div>


                </div>
            </div>
        </>
    );
};

export default AboutDashboard;
