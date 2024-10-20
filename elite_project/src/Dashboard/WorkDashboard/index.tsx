import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "../Css/Dashboard.css";




interface Work {
    title: string;
    logo: File | null;
    deliverables: string;
    video: File | null;
    id?: number;

}

const WorkDashboard = () => {

    const [work, setWork] = useState<Work>({
        title: " ",
        logo: null,
        deliverables: " ",
        video: null,
    });

    const [imageFileName, setImageFileName] = useState<string>("Click to upload image");
    const [videoFileName, setVideoFileName] = useState<string>("Click to upload video");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/dashboard_work/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (response.data.length > 0) {
                    setWork(response.data[0]);

                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchWorkData();
    }, [navigate]);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWork({ ...work, [name]: value });
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Work) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setWork({ ...work, [field]: file });

            // Set the file name based on whether it's an image or video
            if (field === "logo") {
                setImageFileName(file.name);
            } else if (field === "video") {
                setVideoFileName(file.name);
            }
        } else {
            // Reset file name if no file is selected
            if (field === "logo") {
                setImageFileName("Click to upload image");
            } else if (field === "video") {
                setVideoFileName("Click to upload video");
            }
        }
    }
    const handleSave = async (section: keyof Work, section2: keyof Work, section3: keyof Work, section4: keyof Work) => {
        const formData = new FormData();
        // Append all fields to FormData
        if (work[section] && work[section2] && work[section3] && work[section4]) {
            formData.append(section, work[section] as Blob);
            formData.append(section2, work[section2] as Blob);
            formData.append(section3, work[section3] as Blob);
            formData.append(section4, work[section4] as Blob);

        }


        try {
            // const token = localStorage.getItem("access_token");
            if (work.id) {
                const response = await axios.put(`http://127.0.0.1:8000/dashboard_work/${work.id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Work updated:", response.data);
            } else {
                const response = await axios.post("http://127.0.0.1:8000/dashboard_work/", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Work saved:", response.data);
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
                    <div className="section services-session">
                        <div className="service-container">
                            {/* Render the cards dynamically */}
                            <div className="card-work" >
                                {/* Company Name Field */}
                                <div className="field">
                                    <label>Company Name</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={work.title}
                                        onChange={handleTextChange}
                                        placeholder="Company Name"
                                        className="input-work"
                                    />
                                </div>

                                {/* Company Logo Upload Field */}
                                <div className="field">
                                    <label>Company Logo</label>
                                    <div className="upload-box">
                                        <label htmlFor="companyLogo" className="upload-placeholder">
                                            <input
                                                type="file"
                                                id="companyLogo"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'logo')}
                                                className="file-upload-input"
                                            />
                                            <div>{imageFileName}</div>
                                        </label>
                                        {/* <span className="file-size">778x524</span> */}
                                    </div>
                                </div>

                                {/* Deliverables Field */}
                                <div className="field1">
                                    <label>Deliverables</label>
                                    <input
                                        type="text"
                                        name="deliverables"
                                        value={work.deliverables}
                                        onChange={handleTextChange}
                                        placeholder="Add Deliverables"
                                        className="input-work"
                                    />
                                </div>

                                {/* Project Video Upload Field */}
                                <div className="field">
                                    <label>Project Video</label>
                                    <div className="upload-box">
                                        <label htmlFor="projectVideo" className="upload-placeholder">
                                            <input
                                                type="file"
                                                id="projectVideo"
                                                accept="video/*"
                                                onChange={(e) => handleFileChange(e, 'video')}
                                                className="file-upload-input"
                                            />
                                            <div>{videoFileName}</div>
                                        </label>
                                        {/* <span className="file-size">778x524</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons to add new work and save */}

                        <button className="save-btn" onClick={() => handleSave("title", "logo", "deliverables", "video",)}>SAVE</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkDashboard;
