import React, { useState } from "react";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";

const WorkDashboard = () => {
    const [cards, setCards] = useState([{}]); // Initialize with one card

    const handleAddCard = () => {
        setCards([...cards, {}]); // Add a new empty card to the state
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
                            {cards.map((card, index) => (
                                <div className="card-work" key={index}>
                                    {/* Company Name Field */}
                                    <div className="field">
                                        <label>Company Name</label>
                                        <input type="text" placeholder="Company Name" className="input-work" />
                                    </div>

                                    {/* Company Logo Upload Field */}
                                    <div className="field">
                                        <label>Company Logo</label>
                                        <div className="upload-box">
                                            <label htmlFor="companyLogo" className="upload-placeholder">
                                                <div>Click to upload</div>
                                            </label>
                                            <span className="file-size">778x524</span>
                                        </div>
                                    </div>

                                    {/* Deliverables Field */}
                                    <div className="field1">
                                        <label>Deliverables</label>
                                        <input type="text" placeholder="Add Deliverables" className="input-work" />
                                    </div>

                                    {/* Project Video Upload Field */}
                                    <div className="field">
                                        <label>Project Video</label>
                                        <div className="upload-box">
                                            <label htmlFor="projectVideo" className="upload-placeholder">
                                                <div>Click to upload</div>
                                            </label>
                                            <span className="file-size">778x524</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Buttons to add new work and save */}
                        <button className="add-service-btn" onClick={handleAddCard}>
                            + Add New Work
                        </button>
                        <button className="save-btn">SAVE</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkDashboard;
