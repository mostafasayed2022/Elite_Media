import React from "react";
import Sidebar from "../Sidebar";
import UploadButton from "../UploadButton";
import SearchBar from "../SearchBar";

const WorkDashboard = () => {
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
                            {/* Dashboard Sections */}
                            <div className="upload-section">
                                {/* Company Name Field */}
                                <div className="field">
                                    <label>Company Name</label>
                                    <input type="text" placeholder="Company Name" />
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
                                <div className="field">
                                    <label>Deliverables</label>
                                    <div className="tags">
                                        <div className="tag">
                                            #Media Production
                                            {/* <FaTimes className="remove-icon" /> */}
                                        </div>
                                        <div className="tag">
                                            #Application
                                            {/* <FaTimes className="remove-icon" /> */}
                                        </div>
                                    </div>
                                    <input type="text" placeholder="Add Deliverables" />
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
                                    <div className="video-title">Axis Video</div>
                                </div>
                            </div>
                            <div className="upload-section">
                                {/* Company Name Field */}
                                <div className="field">
                                    <label>Company Name</label>
                                    <input type="text" placeholder="Company Name" />
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
                                <div className="field">
                                    <label>Deliverables</label>
                                    <div className="tags">
                                        <div className="tag">
                                            #Media Production
                                            {/* <FaTimes className="remove-icon" /> */}
                                        </div>
                                        <div className="tag">
                                            #Application
                                            {/* <FaTimes className="remove-icon" /> */}
                                        </div>
                                    </div>
                                    <input type="text" placeholder="Add Deliverables" />
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
                                    <div className="video-title">Axis Video</div>
                                </div>
                            </div>


                            <div className="upload-section">
                                {/* Company Name Field */}
                                <div className="field">
                                    <label>Company Name</label>
                                    <input type="text" placeholder="Company Name" />
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
                                <div className="field">
                                    <label>Deliverables</label>
                                    <div className="tags">
                                        <div className="tag">
                                            #Media Production
                                            {/* <FaTimes className="remove-icon" /> */}
                                        </div>
                                        <div className="tag">
                                            #Application
                                            {/* <FaTimes className="remove-icon" /> */}
                                        </div>
                                    </div>
                                    <input type="text" placeholder="Add Deliverables" />
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
                                    <div className="video-title">Axis Video</div>
                                </div>
                            </div>




                            {/* end */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default WorkDashboard;