import React from "react";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
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
    // const [aboutExists, setAboutExists] = useState<boolean>(true);
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
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (response.data.length > 0) {
                    setAbout(response.data[0]);
                    // setAboutExists(true);
                } else {
                    // setAboutExists(true);
                }
            } catch (error: unknown) {
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
            setAbout({ ...about, [field]: file }); // Update the specific field in state
            setFileName(`File: ${file.name}`);
        } else {
            setFileName('Click to upload');
        }
    };


    const handleSave = async () => {
        const formData = new FormData();

        // Append all fields to FormData
        Object.entries(about).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            if (about.id) {
                const response = await axios.put(`http://127.0.0.1:8000/about_dashboard/${about.id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("About updated:", response.data);
            } else {
                const response = await axios.post("http://127.0.0.1:8000/about_dashboard/", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("About saved:", response.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };




    return (
        <>
            <div className="dashboard-container">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="main-content">
                    <SearchBar />
                    {/* Conditionally render the content based on aboutExists */}
                    {/* {aboutExists ? ( */}
                        {/* <> */}
                            {/* Dashboard Sections */}
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
                                    <label htmlFor="team-video-upload2" className="file-upload-label">
                                    Upload Image2
                                    <input
                                        id="team-video-upload2"
                                        type="file"
                                        accept="image/, video/"
                                        onChange={(e) => handleFileChange(e, 'image')}
                                        className="file-upload-input"
                                        required
                                    />
                                </label>
                                        <label htmlFor="team-video-upload" className="file-upload-label">
                                            Upload Image
                                            <input
                                                id="team-video-upload"
                                                type="file"
                                                accept="image/, video/"
                                                onChange={(e) => handleFileChange(e, "why_choose_usimage")}
                                                className="file-upload-input"
                                                required
                                            />
                                        </label>
                                    </div>
                                </div>
                                <button className="save-btn" onClick={handleSave}>SAVE</button>
                            </div>

                        {/* </>


                    ) : (

                        <div className="no-data">
                            <p>No data available. Please add information to the About section.</p>
                        </div>
                    )} */}



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
                            />                           <div>
                                <label htmlFor="team-video-upload2" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="team-video-upload2"
                                        type="file"
                                        accept="image/, video/"
                                        onChange={(e) => handleFileChange(e, 'image')}
                                        className="file-upload-input"
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="save-btn" onClick={handleSave}>SAVE</button>
                    </div>

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
                                />                                <div>
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
                                    <label htmlFor="team-video-upload" className="file-upload-label">
                                        Upload Image
                                        <input
                                            id="team-video-upload"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'image_philo')}
                                            className="file-upload-input"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* <label htmlFor="team-video-upload" className="file-upload-label">
                                Upload Image
                                <input
                                    id="team-video-upload"
                                    type="file"
                                    accept="image/, video/"
                                    onChange={(e) => handleFileChange(e, 'teamimage')}
                                    className="file-upload-input"
                                />
                            </label> */}
                        </div>
                    </div>


                    <div className="section services-session">
                        <h2>Our Team Session</h2>
                        <textarea
                            placeholder="Write here..."
                            className="intro-text"
                            name="teamtext"
                            value={about.teamtext}
                            onChange={handleTextChange}
                        />
                        <div className="service">
                        </div>
                        <button className="save-btn" onClick={handleSave}>SAVE</button>
                    </div>

                </div>
            </div >
        </>
    );
}


export default AboutDashboard;