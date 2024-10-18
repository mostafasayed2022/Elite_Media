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
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
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

    const handleSave3 = async (section: keyof Home,) => {
        const formData = new FormData();
        // Append all fields to FormData
        if (home[section]) {
            formData.append(section, home[section] as Blob);

        }
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


    const handleSave2 = async (section: keyof Home, section2: keyof Home) => {
        const formData = new FormData();
        // Append all fields to FormData
        if (home[section] && home[section2]) {
            formData.append(section, home[section] as Blob);
            formData.append(section2, home[section2] as Blob);
        }


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


    const handleSave = async (section: keyof Home, section2: keyof Home, section3: keyof Home) => {
        const formData = new FormData();

        // Append all fields to FormData
        if (home[section] && home[section2] && home[section3]) {
            formData.append(section, home[section] as Blob);
            formData.append(section2, home[section2] as Blob);
            formData.append(section3, home[section3] as Blob);
        }


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
                                <label htmlFor="intro-image-upload" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="intro-image-upload"
                                        type="file"
                                        accept="image/, video/"
                                        onChange={(e) => handleFileChange(e, 'image')}
                                        className="file-upload-input"
                                    />
                                </label>

                                <label htmlFor="intro-video-upload" className="file-upload-label">
                                    Upload Video
                                    <input
                                        id="intro-video-upload"
                                        type="file"
                                        accept="image/, video/"
                                        onChange={(e) => handleFileChange(e, 'video')}
                                        className="file-upload-input"
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="save-btn" onClick={() => handleSave("text", "image", "video")}>SAVE</button>


                    </div>

                    <div className="section intro-session">
                        <h2>Clients Session</h2>
                        <label>image</label>
                        <div className="intro-section1">
                            <div>
                                <label htmlFor="client-image-upload" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="client-image-upload"
                                        type="file"
                                        accept="image/, video/"
                                        onChange={(e) => handleFileChange(e, 'clientimage')}
                                        className="file-upload-input"
                                    />
                                </label>


                            </div>
                        </div>
                        <button className="save-btn" onClick={() => handleSave3("clientimage")}>SAVE</button>
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
                                    <label htmlFor="service-image-upload" className="file-upload-label">
                                        Upload Image
                                        <input
                                            id="service-image-upload"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'serviceimage')}
                                            className="file-upload-input"
                                        />
                                    </label>

                                    <label htmlFor="service-video-upload" className="file-upload-label">
                                        Upload Video
                                        <input
                                            id="service-video-upload"
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
                        <button className="save-btn" onClick={() => handleSave("servicename", "serviceimage", "servicevideo")}>SAVE</button>
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

                        </div>
                        <button className="save-btn" onClick={() => handleSave2("teamtext", "teamimage")}>SAVE</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeDashboard;

