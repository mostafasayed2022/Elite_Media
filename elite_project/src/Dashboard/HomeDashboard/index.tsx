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

interface ClientData {
    clientimage: File | null;
    clientimagePreviewUrl: string | null; 

    id?: number;
}


interface Service {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [clientData, setClientData] = useState<ClientData[]>([{
        clientimage: null,
        clientimagePreviewUrl: ""
    }]);
    const MAX_CLIENT_IMAGES = 9; // Set your limit here
    const [homeServices, setHomeServices] = useState<Service[]>([{
        servicename: "",
        serviceimage: null,
        servicevideo: null
    }]);

    const [imageFileNames, setImageFileNames] = useState<string[]>(["Click to upload image"]);
    const [, setFileName] = useState<string>('Click to upload');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHomeData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                // navigate("/login");
                return;
            }

            try {
                const response = await axios.get("https://api.elitemediahouses.com/home_dashboard/", {
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

    // useEffect for fetching Team Member data
    useEffect(() => {
        const fetchDataClient = async () => {
            const token = localStorage.getItem("access_token");
    
            if (!token) {
                navigate("/login"); // Redirect if no token is found
                return;
            }
    
            try {
                const response = await axios.get("https://api.elitemediahouses.com/client_image/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.data.length > 0) {
                    // Map the response data to include preview URLs for display
                    const fetchClientData = response.data.map((item: any) => ({
                        ...item,
                        clientimagePreviewUrl: item.clientimage
                            ? `${item.clientimage}` // Adjust base URL if needed
                            : null,
                    }));
    
                    // Update the state with fetched data for client images
                    setClientData(fetchClientData);
                    setImageFileNames(fetchClientData.map(() => "Click to upload image"));
                }
            } catch (error) {
                console.error("Error fetching client images:", error);
            }
        };
    
        fetchDataClient();
    }, [navigate]);
    


    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHome({ ...home, [name]: value });
    };


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTextChange2 = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof Service) => {
        const {  value } = e.target;
        const updatedHomes = [...homeServices];
        updatedHomes[index] = { ...updatedHomes[index], [field]: value };
        setHomeServices(updatedHomes);
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
    // File change 2
    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof ClientData) => {
        const file = e.target.files ? e.target.files[0] : null;
        const updatedWorks = [...clientData];
        updatedWorks[index] = { ...updatedWorks[index], [field]: file };
        // setClientData(updatedWorks);
        if (file) {
           
            if (field === "clientimage") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    updatedWorks[index] = {
                        ...updatedWorks[index],
                        [field]: file,
                        clientimagePreviewUrl: reader.result as string, // Set preview URL
                    };
                    setClientData(updatedWorks);
                };
                reader.readAsDataURL(file);
                const updatedImageFileNames = [...imageFileNames];
                updatedImageFileNames[index] = file.name;
                setImageFileNames(updatedImageFileNames);
            }
        }
    };
    const handleClearImage = async (field: keyof ClientData, index: number) => {
        const client = clientData[index];
        if (!client.id) return;

        try {
            await axios.delete(`https://api.elitemediahouses.com/client_image/${client.id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            // Update the state by clearing the specific field data
            const updatedClients = [...clientData];
            updatedClients[index] = {
                ...updatedClients[index],
                [field]: "" as any,  // Explicitly assign empty string or null
            };
            setClientData(updatedClients);

            console.log("Image cleared successfully");
        } catch (error) {
            console.error("Error clearing image:", error);
        }
    };



    const handleFileChange3 = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: keyof Service
    ) => {
        const file = e.target.files ? e.target.files[0] : null;
        const updatedServices = [...homeServices];
        updatedServices[index] = { ...updatedServices[index], [field]: file };
        setHomeServices(updatedServices);

        if (file) {
            if (field === "serviceimage" || field === "servicevideo") {
                const updatedFileNames = [...imageFileNames];
                updatedFileNames[index] = file.name;
                setImageFileNames(updatedFileNames);
            }
        }
    };



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const handleSave3 = async (section: keyof Home, ) => {
    //     const formData = new FormData();
    //     // Append all fields to FormData
    //     if (home[section]) {
    //         formData.append(section, home[section] as Blob);

    //     }
    //     try {
    //         // const token = localStorage.getItem("access_token");
    //         if (home.id) {
    //             const response = await axios.put(`/api/home_dashboard/${home.id}/`, formData, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    //                     'Content-Type': 'multipart/form-data', // Important for file uploads
    //                 },
    //             });
    //             console.log("Home updated:", response.data);
    //         } else {
    //             const response = await axios.post("/api/home_dashboard/", formData, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
    //                     'Content-Type': 'multipart/form-data', // Important for file uploads
    //                 },
    //             });
    //             console.log("Home saved:", response.data);
    //         }
    //     } catch (error) {
    //         console.error("Error saving data:", error);
    //     }
    // };
    const handleSave4 = async (section: keyof ClientData, index: number,) => {
        const clientData1 = clientData[index];
        const formData = new FormData();
        // Append all fields to FormData
        if (clientData1[section]) {
            formData.append(section, clientData1[section] as Blob);

        }
        try {
            // const token = localStorage.getItem("access_token");
            if (clientData1.id) {
                const response = await axios.put(`https://api.elitemediahouses.com/client_image/${clientData1.id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Home updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/client_image/", formData, {
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
                const response = await axios.put(`https://api.elitemediahouses.com/home_dashboard/${home.id}/`, formData, {
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
                const response = await axios.put(`https://api.elitemediahouses.com/home_dashboard/${home.id}/`, formData, {
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


    const handleSaveService3 = async (section: keyof Service, section2: keyof Service, section3: keyof Service, index: number) => {
        const homeServices1 = homeServices[index];

        const formData = new FormData();

        // Append all fields to FormData
        if (homeServices1[section] && homeServices1[section2] && homeServices1[section3]) {
            formData.append(section, homeServices1[section] as Blob);
            formData.append(section2, homeServices1[section2] as Blob);
            formData.append(section3, homeServices1[section3] as Blob);
        }


        try {
            // const token = localStorage.getItem("access_token");
            if (homeServices1.id) {
                const response = await axios.put(`https://api.elitemediahouses.com/service/${homeServices1.id}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
                console.log("Home updated:", response.data);
            } else {
                const response = await axios.post("https://api.elitemediahouses.com/service/", formData, {
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

    const handleAddCard = () => {
        if (clientData.length < MAX_CLIENT_IMAGES) {
            setClientData([...clientData, { clientimage: null, clientimagePreviewUrl: "" }]);
            setImageFileNames([...imageFileNames, "Click to upload image"]);
        } else {
            alert(`You cant upload a maximum of ${MAX_CLIENT_IMAGES} images.`);
        }
    };


    const handleAddService = () => {
        if (homeServices.length) {
            setHomeServices([...homeServices, { servicename: '', serviceimage: null, servicevideo: null }]);
            setImageFileNames([...imageFileNames, "Click to upload image"]);
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
                        <label>Image</label>
                        {clientData.map((client, index) => (
                            <div className="intro-section1" key={index}>
                                <div>
                                    <label htmlFor={`client-image-upload-${index}`} className="file-upload-label">
                                        Upload Image
                                        <input
                                            id={`client-image-upload-${index}`}
                                            type="file"
                                            accept="image/*, video/*"
                                            onChange={(e) => handleFileChange2(e, index, 'clientimage')}
                                            className="file-upload-input"
                                        />
                                    </label>
                                    {client.clientimagePreviewUrl && (
                                        <img
                                            src={client.clientimagePreviewUrl as string}
                                            alt={`Preview ${index}`}
                                            className="image-preview"
                                        />
                                    )}
                                </div>
                                <button className="save-btn" onClick={() => handleSave4("clientimage", index)}>SAVE</button>
                                <button className="save-btn" onClick={() => handleClearImage("clientimage", index)}>Delete</button>
                            </div>
                        ))}
                        <button className="add-service-btn" onClick={handleAddCard}>
                            + Add New Member
                        </button>
                    </div>



                    <div className="section services-session">
                        <h2>Services Session</h2>
                        <div className="service-container">
                            {homeServices.map((service, index) => (
                                <div className="service service1" key={index}>
                                    <input
                                        type="text"
                                        name="servicename"
                                        value={service.servicename}
                                        placeholder="Media Production"
                                        onChange={(e) => handleTextChange2(e, index, 'servicename')}
                                    />
                                    <div>
                                        <label htmlFor="service-image-upload" className="file-upload-label">
                                            Upload Image
                                            <input
                                                id="service-image-upload"
                                                type="file"
                                                accept="image/, video/"
                                                onChange={(e) => handleFileChange3(e, index, 'serviceimage')}
                                                className="file-upload-input"
                                            />
                                        </label>

                                        <label htmlFor="service-video-upload" className="file-upload-label">
                                            Upload Video
                                            <input
                                                id="service-video-upload"
                                                type="file"
                                                accept="image/, video/"
                                                onChange={(e) => handleFileChange3(e, index, 'servicevideo')}
                                                className="file-upload-input"
                                            />
                                        </label>
                                    </div>
                                    <button className="save-btn" onClick={() => handleSaveService3("servicename", "serviceimage", "servicevideo", index)}>SAVE</button>
                                </div>
                            ))}
                        </div>
                        <button className="add-service-btn" onClick={handleAddService}>+ Add Service</button>

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

