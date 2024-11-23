import React, { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Dashboard.css";

interface About {

    image: File | null;
    imagePreviewUrl: string | null; // Preview URL for the "Clients" section

    aboutimage: File | null;
    aboutImagePreviewUrl: string | null; // Preview URL for the "About" section

    why_choose_usimage: File | null;
    whyChooseUsImagePreviewUrl: string | null; // Preview URL for the "Why Choose Us" section

    image_philo: File | null;
    philoImagePreviewUrl: string | null; // Preview URL for the "Our Philosophy" section

    id?: number;
}
interface Text1 {
    text: string;
    // Preview URL for the "Clients" section
    abouttext_about: string;
    // Preview URL for the "About" section
    why_choose_ustext: string;
    // Preview URL for the "Why Choose Us" section
    text_philo: string;
    // Preview URL for the "Our Philosophy" section
    teamtext: string;

}
interface TeamMember {
    name: string;
    title: string;
    image: File | null;
    id?: number;
}
interface Home {
    text: string;
    video: File | null;
    image: File | null;
    clientvideo: File | null;
    clientimage: File | null;
    teamtext: string;

    teamimage: File | null;
    servicename: string;
    serviceimage: File | null;
    servicevideo: File | null;

    teamvideo: File | null;
    // teamvideoPreviewUrl: string ;
    id?: number;

}


const AboutDashboard = () => {
    const [video, setVideo] = useState<Home>({

        teamvideo: null,
        // teamvideoPreviewUrl: "",
        text: "",
        video: null,
        image: null,
        clientvideo: null,
        clientimage: null,
        teamtext: "",
        teamimage: null,
        servicename: "",
        serviceimage: null,
        servicevideo: null,

    });
    const [about, setAbout] = useState<About>({

        image: null,
        imagePreviewUrl: null,

        aboutimage: null,
        aboutImagePreviewUrl: null,

        why_choose_usimage: null,
        whyChooseUsImagePreviewUrl: null,

        image_philo: null,
        philoImagePreviewUrl: null,

    });
    const [text1, setText] = useState<Text1>({
        text: "",

        abouttext_about: "",

        why_choose_ustext: "",

        text_philo: "",

        teamtext: "",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [teamMember, setTeamMember] = useState<TeamMember[]>([{
        name: "",
        title: "",
        image: null,
    }]);
    const [imageFileNames, setImageFileNames] = useState<string[]>(["Click to upload image"]);
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
                const response = await axios.get("https://api.elitemediahouses.com/home_dashboard/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (response.data.length > 0) {
                    setVideo(response.data[0]);

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
    // useEffect for fetching About data
    useEffect(() => {
        const fetchAboutData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("https://api.elitemediahouses.com/about_dashboard/", {
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


    useEffect(() => {
        const fetchAboutData1 = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("https://api.elitemediahouses.com/about_dashboard/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length > 0) {
                    setText(response.data[0]);
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchAboutData1();
    }, [navigate]);

    // useEffect for fetching Team Member data
    useEffect(() => {
        const fetchTeamMemberData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get("https://api.elitemediahouses.com/team_member/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length > 0) {
                    // Map response data to the works array
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const fetchTeamMember = response.data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        image: null, // Files can't be fetched directly, so leave them as null
                        name: item.name,
                        // Same for video
                    }));

                    // Set the works and placeholder file names based on fetched data
                    setTeamMember(fetchTeamMember);
                    setImageFileNames(fetchTeamMember.map(() => "Click to upload image"));

                }
            } catch (error) {
                console.error("Error fetching works:", error);
            }
        };

        fetchTeamMemberData();
    }, [navigate]);



    // File change 1

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof About, previewField: keyof About) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAbout({ ...about, [field]: file, [previewField]: previewUrl });
            setFileName(`File: ${file.name}`);
        } else {
            setFileName("Click to upload");
        }
    };
    const handleFileChange3 = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Home) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            // const previewUrl = URL.createObjectURL(file);
            setVideo({
                ...video, [field]: file
                // , [previewField]: previewUrl
            });
            setFileName(`File: ${file.name}`);
        } else {
            setFileName("Click to upload");
        }
    };

    // File change 2
    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof TeamMember) => {
        const file = e.target.files ? e.target.files[0] : null;
        const updatedWorks = [...teamMember];
        updatedWorks[index] = { ...updatedWorks[index], [field]: file };
        setTeamMember(updatedWorks);
        if (file) {
            if (field === "image") {
                const updatedImageFileNames = [...imageFileNames];
                updatedImageFileNames[index] = file.name;
                setImageFileNames(updatedImageFileNames);
            }
        }
    };

    // text change 1
    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setText({ ...text1, [name]: value });
    };

    // text change 2
    const handleTextChange2 = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;

        // Create a new copy of the array
        const updatedTeamMembers = [...teamMember];

        // Update the specific team member at the index
        updatedTeamMembers[index] = {
            ...updatedTeamMembers[index], // Keep the other properties (e.g., image) intact
            [name]: value, // Dynamically update the field (name, title, etc.)
        };

        // Set the updated array back to state
        setTeamMember(updatedTeamMembers);
    };


    const handleSave = async (section: keyof About) => {
        const formData = new FormData();

        // Append all fields to FormData
        if (about[section]) {
            formData.append(section, about[section] as Blob);

        }

        // if (text1[section2]) {

        //     formData.append(section2, text1[section2] as string);
        // }

        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data',
            };

            if (about.id) {
                const response = await axios.patch(`https://api.elitemediahouses.com/about_dashboard/${about.id}/`, formData, { headers });
                console.log("About updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/about_dashboard/", formData, { headers });
                console.log("About saved:", response.data);
            }
        } catch (error: any) {
            if (error.response?.data) {
                console.error("Server responded with errors:", error.response.data);
            } else {
                console.error("Error saving data:", error.message);
            }
        }
    };

    const handleSaveourval = async (section: keyof Home) => {
        const formData = new FormData();
        // Append all fields to FormData
        if (video[section]) {
            formData.append(section, video[section] as Blob);

        }
        try {
            // const token = localStorage.getItem("access_token");
            if (video.id) {
                const response = await axios.put(`https://api.elitemediahouses.com/home_dashboard/${video.id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Home updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/home_dashboard/", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Home saved:", response.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };
    const handleSave2 = async (section: keyof Text1) => {
        const formData = new FormData();

        // Append all fields to FormData
        if (text1[section]) {
            formData.append(section, text1[section] as string);
        }

        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data',
            };

            if (about.id) {
                const response = await axios.patch(`https://api.elitemediahouses.com/about_dashboard/${about.id}/`, formData, { headers });
                console.log("About updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/about_dashboard/", formData, { headers });
                console.log("About saved:", response.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSave3 = async (section1: keyof TeamMember, index: number,) => {
        const teammembers = teamMember[index];
        const formData = new FormData();

        // Append all fields to FormData
        if (teammembers[section1]) formData.append(section1, teammembers[section1] as Blob);
        
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data',
            };

            if (teammembers.id) {
                const response = await axios.patch(`https://api.elitemediahouses.com/team_member/${teammembers.id}/`, formData, { headers });
                console.log("About updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/team_member/", formData, { headers });
                console.log("About saved:", response.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };
    const handleSave4 = async (section1: keyof TeamMember, index: number,) => {
        const teammembers = teamMember[index];
        const formData = new FormData();

        // Append all fields to FormData
        if (teammembers[section1]) formData.append(section1, teammembers[section1] as string);
        
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data',
            };

            if (teammembers.id) {
                const response = await axios.patch(`https://api.elitemediahouses.com/team_member/${teammembers.id}/`, formData, { headers });
                console.log("About updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/team_member/", formData, { headers });
                console.log("About saved:", response.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleAddCard = () => {
        setTeamMember([...teamMember, { title: "", image: null, name: "" }]);
        setImageFileNames([...imageFileNames, "Click to upload image"]);

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
                                value={text1.why_choose_ustext}
                                onChange={handleTextChange}
                            />
                            <div>
                                <label htmlFor="why-choose-us-image" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="why-choose-us-image"
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={(e) => handleFileChange(e, "why_choose_usimage", "whyChooseUsImagePreviewUrl")}
                                        className="file-upload-input"
                                        required
                                    />
                                </label>
                            </div>
                            {about.whyChooseUsImagePreviewUrl && <img src={about.whyChooseUsImagePreviewUrl} alt="Preview" className="image-preview" />}

                        </div>
                        <button
                            className="save-btn"
                            onClick={() => {
                                handleSave2("why_choose_ustext") ||  // Call the first function
                                handleSave("why_choose_usimage");  // Call the second function
                            }}
                        >
                            SAVE
                        </button>
                    </div>
                    <div className="section intro-session">
                        <h2>Clients Session</h2>
                        <label>Text</label>
                        <div className="intro-section1">
                            <textarea
                                placeholder="Write here..."
                                className="intro-text"
                                name="text"
                                value={text1.text}
                                onChange={handleTextChange}
                            />
                            <div>
                                <label htmlFor="client-image-upload" className="file-upload-label">
                                    Upload Image
                                    <input
                                        id="client-image-upload"
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={(e) => handleFileChange(e, "image", "imagePreviewUrl")}
                                        className="file-upload-input"
                                    />
                                </label>
                            </div>
                            {about.imagePreviewUrl && <img src={about.imagePreviewUrl} alt="Preview" className="image-preview" />}
                        </div>
                        <button
                            className="save-btn"
                            onClick={() => {
                                handleSave2("text") || // Call the first function
                                handleSave("image");  // Call the second function
                            }}
                        >
                            SAVE
                        </button>
                        
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
                                    value={text1.abouttext_about}
                                    onChange={handleTextChange}
                                />
                                <div>
                                    <label htmlFor="team-video-upload3" className="file-upload-label">
                                        Upload Image
                                        <input
                                            id="team-video-upload3"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'aboutimage', "aboutImagePreviewUrl")}
                                            className="file-upload-input"
                                        />
                                    </label>
                                </div>
                                <button
                            className="save-btn"
                            onClick={() => {
                                handleSave2("abouttext_about") ||  // Call the first function
                                handleSave("aboutimage");  // Call the second function
                            }}
                        >
                            SAVE
                        </button>
                                
                                {about.aboutImagePreviewUrl && <img src={about.aboutImagePreviewUrl} alt="Preview" className="image-preview" />}
                            </div>

                            <label htmlFor="text">Text “Our Philosophy”</label>
                            <div className="sec2">
                                <textarea
                                    placeholder="Write here..."
                                    className="intro-text"
                                    name="text_philo"
                                    value={text1.text_philo}
                                    onChange={handleTextChange}
                                />
                                <div>
                                    <label htmlFor="philo-image-upload" className="file-upload-label">
                                        Upload Image
                                        <input
                                            id="philo-image-upload"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange(e, 'image_philo', "philoImagePreviewUrl")}
                                            className="file-upload-input"
                                        />
                                    </label>


                                </div>
                                <button
                            className="save-btn"
                            onClick={() => {
                                handleSave2("text_philo") || handleSave("image_philo"); // Call the first function
                                  // Call the second function
                            }}
                        >
                            SAVE
                        </button>
                                



                                {about.philoImagePreviewUrl && <img src={about.philoImagePreviewUrl} alt="Preview" className="image-preview" />}
                            </div>
                            <label htmlFor="text">Our value</label>
                            <div className="sec2">
                                <div>
                                    <label htmlFor="ourvaluevideo" className="file-upload-label">
                                        Upload video
                                        <input
                                            id="ourvaluevideo"
                                            type="file"
                                            accept="image/, video/"
                                            onChange={(e) => handleFileChange3(e, 'teamvideo')}
                                            className="file-upload-input"
                                        />
                                    </label>
                                    <button className="save-btn" onClick={() => handleSaveourval("teamvideo")}>Save our </button>


                                </div>
                                {/* {video.teamvideoPreviewUrl && <img src={video.teamvideoPreviewUrl} alt="Preview" className="image-preview" />} */}
                            </div>
                        </div>

                    </div>

                    {/*end  About Session */}

                    <div className="section services-session">
                        <h2>Our Team Session</h2>
                        <textarea
                            placeholder="Write here..."
                            className="intro-text"
                            name="teamtext"
                            value={text1.teamtext}
                            onChange={handleTextChange}
                        />
                        <div>

                        </div>
                        <div className="service">
                        </div>
                        <button className="save-btn" onClick={() => handleSave2("teamtext")}>SAVE</button>
                    </div>

                    <div className="section services-session">
                        <h2>Our Team Member Session</h2>
                        {teamMember.map((teammembers, index) => (
                            <div key={index}>
                                <h3>Team Member {index + 1}</h3>
                                {/* <textarea
                                    placeholder="Write title here..."
                                    className="intro-text"
                                    name={`teamMember[${index}].title`}
                                    value={teammembers.title}
                                    onChange={(e) => handleTextChange(e)} // Make sure `handleTextChange` handles index updates correctly
                                /> */}
                                <div className="section-team">
                                    <input
                                        type="text"
                                        placeholder="Write name here..."
                                        className="input-team"
                                        name="name"
                                        value={teammembers.name}
                                        onChange={(e) => handleTextChange2(e, index)} // Adjust this for handling names
                                    />

                                    <input
                                        type="text"
                                        className="input-team"
                                        name="title"
                                        value={teammembers.title}
                                        placeholder="Write title here..."
                                        onChange={(e) => handleTextChange2(e, index)}
                                    />

                                    <div>
                                        <label htmlFor={`team-image-upload-${index}`} className="file-upload-label">
                                            Upload Image
                                            <input
                                                id={`team-image-upload-${index}`}
                                                type="file"
                                                accept="image/*, video/*"
                                                onChange={(e) => handleFileChange2(e, index, 'image')}
                                                className="file-upload-input"
                                            />
                                        </label>
                                    </div>
                                    {teammembers.image && <img src={URL.createObjectURL(teammembers.image)} alt={`Preview ${index}`} className="image-preview" />}
                                </div>
                                <button
                            className="save-btn"
                            onClick={() => {
                                handleSave3("image", index) || handleSave4("name", index)|| handleSave4("title", index); // Call the first function
                                  // Call the second function
                            }}
                        >
                            SAVE
                        </button>
                                
                            </div>
                        ))}
                        <button className="add-service-btn" onClick={handleAddCard}>
                            + Add New Member
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
};

export default AboutDashboard;
