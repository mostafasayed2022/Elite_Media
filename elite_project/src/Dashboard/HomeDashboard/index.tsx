import "../Css/Dashboard.css";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
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

const HomeDashboard: React.FC = () => {
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
    const [, setFileName] = useState<string>('Click to upload');
    const [homeExists, setHomeExists] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHomeData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/home_dashboard/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length > 0) {
                    setHome(response.data[0]);
                    setHomeExists(true);
                } else {
                    setHomeExists(true);
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

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHome({ ...home, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Home) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            setHome({ ...home, [field]: file }); // Update the specific field in state
            setFileName(`File: ${file.name}`);
        } else {
            setFileName('Click to upload');
        }
    };

    const handleSave = async () => {
        const formData = new FormData();

        // Append all fields to FormData
        Object.entries(home).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            // const token = localStorage.getItem("access_token");
            if (home.id) {
                const response = await axios.put(`http://127.0.0.1:8000/home_dashboard/${home.id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Home updated:", response.data);
            } else {
                const response = await axios.post("http://127.0.0.1:8000/home_dashboard/", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Home saved:", response.data);
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
                        <h2>INTRO Session</h2>
                        {homeExists ? (
                            <>
                                <label>Text</label>
                                <div className="intro-section1">
                                    <textarea
                                        name="text"
                                        value={home.text}
                                        placeholder="Write here..."
                                        className="intro-text"
                                        onChange={handleTextChange}
                                    />
                                    <div >

                                    </div>
                                    <div>
                                        <label htmlFor="team-video-upload" className="file-upload-label">
                                            Upload Image
                                            <input
                                                id="team-video-upload"
                                                type="file"
                                                accept="image/, video/"
                                                onChange={(e) => handleFileChange(e, 'image')}
                                                className="file-upload-input"
                                            />
                                        </label>

                                        <label htmlFor="team-video-upload" className="file-upload-label">
                                            Upload Video
                                            <input
                                                id="team-video-upload"
                                                type="file"
                                                accept="image/, video/"
                                                onChange={(e) => handleFileChange(e, 'video')}
                                                className="file-upload-input"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <button className="save-btn" onClick={handleSave}>SAVE</button>
                            </>
                        ) : (
                            <p>No home data available.</p>
                        )}
                    </div>
                    <div className="section services-session">
                        <h2>Services Session</h2>
                        <div className="service-container">
                            <div className="service service1">
                                <input
                                    type="text"
                                    name="servicename"
                                    value={home.servicename}
                                    placeholder="Media Production"
                                    onChange={handleTextChange}
                                />
                                <div>
                                    <label htmlFor="team-video-upload" className="file-upload-label">
                                        Upload Image
                                        <input
                                            id="team-video-upload"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'serviceimage')}
                                            className="file-upload-input"
                                        />
                                    </label>

                                    <label htmlFor="team-video-upload" className="file-upload-label">
                                        Upload Video
                                        <input
                                            id="team-video-upload"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'servicevideo')}
                                            className="file-upload-input"
                                        />
                                    </label>
                                </div>
                            </div>
                            <button className="add-service-btn">+ Add Service</button>
                        </div>
                        <button className="save-btn" onClick={handleSave}>SAVE</button>
                    </div>

                    <div className="section team-session">
                        <h2>Team Session</h2>
                        <label>Text</label>
                        <div className="intro-section1">
                            <textarea
                                name="teamtext"
                                value={home.teamtext}
                                placeholder="Write here..."
                                className="intro-text"
                                onChange={handleTextChange}
                            />
                            <div>
                                <label htmlFor="team-video-upload" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="team-video-upload"
                                        type="file"
                                        accept="image/, video/"
                                        onChange={(e) => handleFileChange(e, 'teamimage')}
                                        className="file-upload-input"
                                    />
                                </label>

                                <label htmlFor="team-video-upload" className="file-upload-label">
                                    Upload Video
                                    <input
                                        id="team-video-upload"
                                        type="file"
                                        accept="image/, video/"
                                        onChange={(e) => handleFileChange(e, 'teamvideo')}
                                        className="file-upload-input"
                                    />
                                </label>
                            </div>

                        </div>
                        <button className="save-btn" onClick={handleSave}>SAVE</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeDashboard;
