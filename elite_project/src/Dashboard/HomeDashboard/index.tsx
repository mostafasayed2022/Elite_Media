import "../Css/Dashboard.css";

import Sidebar from "../Sidebar"
import UploadButton from "../UploadButton"
import SearchBar from "../SearchBar"


const Home = () => {
    return (
        <>
            <div className="dashboard-container">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="main-content">
                    <SearchBar />

                    {/* Dashboard Sections */}
                    <div className="section intro-session">
                        <h2>INTRO Session</h2>
                        <label>Text</label>
                        <textarea placeholder="Write here..." className="intro-text" />
                        <UploadButton label="Photo or Video" size="1920x1080" />
                        <button className="save-btn">SAVE</button>
                    </div>

                    <div className="section clients-session">
                        <h2>Clients Session</h2>
                        <UploadButton label="Photos" size="200x200" />
                        {/* <div className="client-logos">
                            {["logo1.png", "logo2.png", "logo3.png"].map((logo, index) => (
                                <img key={index} src={logo} alt={Client ${index}} className="client-logo" />
            ))}
                        </div> */}
                        <button className="save-btn">SAVE</button>
                    </div>

                    <div className="section services-session">
                        <h2>Services Session</h2>
                        <div className="service">
                            <input type="text" placeholder="Service 1" />
                            <UploadButton label="Photo or Video" size="768x1198" />
                        </div>
                        <div className="service">
                            <input type="text" placeholder="Service 2" />
                            <UploadButton label="Photo or Video" size="768x1198" />
                        </div>
                        <button className="add-service-btn">+ Add Service</button>
                    </div>
                </div>
            </div>

        </>
    );
}


export default Home;