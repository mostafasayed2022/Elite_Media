import "../Css/Dashboard.css";
import Sidebar from "../Sidebar";
import UploadButton from "../UploadButton";
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

    const [, setIsEditing] = useState<boolean>(false);
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
                const response = await axios.get("http://127.0.0.1:8000/dashboard_contact/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (response.data.length > 0) {
                    setHome(response.data[0]);
                    setHomeExists(true);
                } else {
                    setHomeExists(false);
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setHome({ ...home, [name]: files[0] });
        }
    };

    const handleSave = async () => {
        // const token = localStorage.getItem("access_token");

        try {
            if (home.id) {
                const response = await axios.put(`http://127.0.0.1:8000/dashboard_contact/${home.id}/`, home, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                console.log("Contact updated:", response.data);
                setIsEditing(false);
            } else {
                const response = await axios.post("http://127.0.0.1:8000/dashboard_contact/", home, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
                    },
                });
                console.log("Contact saved:", response.data);
                setIsEditing(false);
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

                        <label>Text</label>
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
                                    <UploadButton
                                        label="Photo or Video"
                                        size="1920x1080"
                                        onFileChange={handleFileChange}
                                        inputName="video"
                                    />
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
                                <UploadButton
                                    label="Photo or Video"
                                    size="1609x699"
                                    onFileChange={handleFileChange}
                                    inputName="serviceimage"
                                />
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
                            <UploadButton
                                label="Photo or Video"
                                size="1728x972"
                                onFileChange={handleFileChange}
                                inputName="teamvideo"
                            />
                        </div>
                        <button className="save-btn" onClick={handleSave}>SAVE</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeDashboard;
