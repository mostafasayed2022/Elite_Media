import React, { useState } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import video from "../assets/about/animation.mp4";
import "../Css/Contact.css";

interface Join {
  name: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  linkedinProfile: string;
  portfolio: string;
  resume: File | null;
}

const JoinTeam: React.FC = () => {
  const [fileName, setFileName] = useState("Click to upload");
  const [formData, setFormData] = useState<Join>({
    name: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    linkedinProfile: "",
    portfolio: "",
    resume: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({ ...formData, resume: file });
      setFileName(file.name);
    } else {
      setFileName("Click to upload");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Join,
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave2 = async () => {
    const data = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof Join];
      if (key === "resume" && value) {
        data.append(key, value as File);
      } else if (value) {
        data.append(key, String(value));
      }
    }

    try {
      await axios.post("https://api.elitemediahouses.com/jointeam/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application sent successfully!");
    } catch (error) {
      alert("Error sending application.");
    }
  };

  return (
    <div className="join-team-page">
      <Header />
      
      <main>
        <div className="contact-info-container">
          <div className="contact-form-team">
            <div className="text-team">
              <h1 className="title-services-text">Join Our Team</h1>
              <div className="team-text">
                <h4>Excited to have you!</h4>
                <p>Fill out the form below to apply for a position at Elite Media.</p>
              </div>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSave2(); }}>
              <div className="form-1-team">
                <div className="input-group">
                  <label>Name</label>
                  <input
                    className="inp"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                </div>
                <div className="input-group">
                  <label>Job Title</label>
                  <input
                    className="inp"
                    type="text"
                    placeholder="Your Title"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange(e, "jobTitle")}
                  />
                </div>
              </div>
              
              <div className="form-2-team">
                <div className="input-group">
                  <label>Email</label>
                  <input
                    className="inp"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    className="inp"
                    type="tel"
                    placeholder="Your Phone"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange(e, "phoneNumber")}
                  />
                </div>
              </div>

              <div className="form-2-team">
                <div className="input-group">
                  <label>LinkedIn Profile</label>
                  <input
                    className="inp"
                    type="text"
                    placeholder="LinkedIn URL"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange(e, "linkedinProfile")}
                  />
                </div>
                <div className="input-group">
                  <label>Portfolio</label>
                  <input
                    className="inp"
                    type="text"
                    placeholder="Portfolio URL"
                    value={formData.portfolio}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                  />
                </div>
              </div>

              <div className="form-3-team">
                <div className="upload-box1">
                  <label htmlFor="resume-upload" className="resume-label">
                    Resume/CV 
                    <span className="formats-info">(Allowed formats: pdf, doc)</span>
                  </label>
                  <div className="upload-input-container">
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="upload-input"
                    />
                    <label htmlFor="resume-upload" className="file-name">
                      {fileName}
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="btn-4-team">
                <button type="submit" className="contact-btn-team">
                  Join The Team
                </button>
              </div>
            </form>
          </div>
          
          <div className="vid">
            <video
              className="contact-video"
              src={video}
              playsInline
              autoPlay
              muted
              loop
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinTeam;
