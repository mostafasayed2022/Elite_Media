import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
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

const WorkDashboard = () => {
    const [works, setWorks] = useState<Work[]>([
        { title: "", logo: null, deliverables: "", video: null },
    ]); // Initialize with one empty work item

    const [imageFileNames, setImageFileNames] = useState<string[]>(["Click to upload image"]);
    const [videoFileNames, setVideoFileNames] = useState<string[]>(["Click to upload video"]);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await axios.get("https://api.elitemediahouses.com/dashboard_work/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length > 0) {
                    // Map response data to the works array
                    const fetchedWorks = response.data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        logo: null, // Files can't be fetched directly, so leave them as null
                        deliverables: item.deliverables,
                        video: null, // Same for video
                    }));
                    
                    // Set the works and placeholder file names based on fetched data
                    setWorks(fetchedWorks);
                    setImageFileNames(fetchedWorks.map(() => "Click to upload image"));
                    setVideoFileNames(fetchedWorks.map(() => "Click to upload video"));
                }
            } catch (error) {
                console.error("Error fetching works:", error);
            }
        };

        fetchWorks();
    }, []);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const updatedWorks = [...works];
        updatedWorks[index] = { ...updatedWorks[index], [name]: value };
        setWorks(updatedWorks);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Work) => {
        const file = e.target.files ? e.target.files[0] : null;
        const updatedWorks = [...works];
        updatedWorks[index] = { ...updatedWorks[index], [field]: file };
        setWorks(updatedWorks);

        if (file) {
            if (field === "logo") {
                const updatedImageFileNames = [...imageFileNames];
                updatedImageFileNames[index] = file.name;
                setImageFileNames(updatedImageFileNames);
            } else if (field === "video") {
                const updatedVideoFileNames = [...videoFileNames];
                updatedVideoFileNames[index] = file.name;
                setVideoFileNames(updatedVideoFileNames);
            }
        }
    };

    const handleSave = async (
        index: number,
        section1: keyof Work,

    ) => {
        const work = works[index];
        const formData = new FormData();

        if (work[section1]) formData.append(section1, work[section1] as Blob|string);
       

        try {
            if (work.id) {
                const response = await axios.put(`https://api.elitemediahouses.com/dashboard_work/${work.id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Work updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/dashboard_work/", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Work saved:", response.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleAddCard = () => {
        setWorks([...works, { title: "", logo: null, deliverables: "", video: null }]);
        setImageFileNames([...imageFileNames, "Click to upload image"]);
        setVideoFileNames([...videoFileNames, "Click to upload video"]);
    };

    return (
        <>
            <div className="dashboard-container">
                <Sidebar />
                <div className="main-content">
                    <SearchBar />
                    <div className="section services-session">
                        <div className="service-container">
                            {works.map((work, index) => (
                                <div className="card-work" key={index}>
                                    <div className="field">
                                        <label>Company Name</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={work.title}
                                            onChange={(e) => handleTextChange(e, index)}
                                            placeholder="Company Name"
                                            className="input-work"
                                        />
                                    </div>

                                    <div className="field">
                                        <label>Company Logo</label>
                                        <div className="upload-box">
                                            <label htmlFor={`companyLogo-${index}`} className="upload-placeholder">
                                                <input
                                                    type="file"
                                                    id={`companyLogo-${index}`}
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, index, 'logo')}
                                                    className="file-upload-input"
                                                />
                                                <div>{imageFileNames[index]}</div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="field1">
                                        <label>Deliverables</label>
                                        <input
                                            type="text"
                                            name="deliverables"
                                            value={work.deliverables}
                                            onChange={(e) => handleTextChange(e, index)}
                                            placeholder="Add Deliverables"
                                            className="input-work"
                                        />
                                    </div>

                                    <div className="field">
                                        <label>Project Video</label>
                                        <div className="upload-box">
                                            <label htmlFor={`projectVideo-${index}`} className="upload-placeholder">
                                                <input
                                                    type="file"
                                                    id={`projectVideo-${index}`}
                                                    accept="video/*"
                                                    onChange={(e) => handleFileChange(e, index, 'video')}
                                                    className="file-upload-input"
                                                />
                                                <div>{videoFileNames[index]}</div>
                                            </label>
                                        </div>
                                    </div>
                                    <button
                            className="save-btn"
                            onClick={() => {
                                handleSave(index, "title") ||  // Call the first function
                                handleSave(index, "logo")||  // Call the first function
                                handleSave(index, "deliverables")||  // Call the first function
                                handleSave(index, "video");  // Call the second function
                            }}
                        >
                            SAVE
                        </button>

                                    
                                </div>
                            ))}
                        </div>

                        <button className="add-service-btn" onClick={handleAddCard}>
                            + Add New Work
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
// tefa
export default WorkDashboard;
