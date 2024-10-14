import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../Css/Contact.css";
import video from "../assets/about/animation.mp4";
const JoinTeam: React.FC = () => {
    const [fileName, setFileName] = useState('Click to upload');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('Click to upload');
        }
    };


    return (
        <>
            <Header />
            <div className="contact-info-container">

                <div className="contact-form-team">
                    <form>
                        {/* <div className="text-team">
                            <h1>Join Our Team</h1>
                            <p>Any question or remarks?     Just write us a message!</p>
                        </div> */}
                        <div className="form-1-team">
                            <div className="input-group">
                                <label>Name</label>
                                <input className="inp" type="text" placeholder="Your Name" />
                            </div>
                            <div className="input-group">
                                <label> Job Title</label>
                                <input className="inp" type="text" placeholder="Your Job Title" />
                            </div>
                        </div>
                        <div className="form-2-team">
                            <div className="input-group">
                                <label>Email</label>
                                <input className="inp" type="email" placeholder="Your Email" />
                            </div>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input className="inp" type="tel" placeholder="Your Phone Number" />
                            </div>
                        </div>

                        <div className="form-2-team">
                            <div className="input-group">
                                <label>LinkedIn Profile</label>
                                <input className="inp" type="text" placeholder="Write your LinkedIn Profile.." />
                            </div>
                            <div className="input-group">
                                <label>Portfolio</label>
                                <input className="inp" type="text" placeholder="Write your Portfolio Link.." />
                            </div>
                        </div>
                        <div className="form-3">
                            <div className=" upload-box">
                                <label htmlFor="resume-upload" className="resume-label">
                                    Resume/CV <span className="formats-info">Allowed formats pdf, doc.</span>
                                </label>
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="upload-input"
                                />
                                <span className="file-name">{fileName}</span>
                            </div>
                        </div>
                        <div className="btn-4-team">
                            <button type="submit" className="contact-btn-team">Join The Team</button>
                        </div>
                    </form>
                </div>

                <div className="vid">
                    <video className="contact-video" src={video}  loop autoPlay muted>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <Footer />
        </>
    );

}


export default JoinTeam


