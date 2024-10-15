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
                        <div className="intro-section1">
                            <textarea placeholder="Write here..." className="intro-text" />
                            <UploadButton label="Photo or Video" size="1920x1080" />
                        </div>
                        <button className="save-btn">SAVE</button>
                    </div>

                    <div className="section clients-session">
                        <h2>Clients Session</h2>
                        <UploadButton label="Photos" size="200x200" />
                        <button className="save-btn">SAVE</button>
                    </div>

                    <div className="section services-session">
                        <h2>Services Session</h2>
                        <div className="service-container">
                            <div className="service service1">
                                <input type="text" placeholder="Media Production" />
                                <UploadButton label="Photo or Video" size={"1609x699"} />
                            </div>

                            <div className="service service2">
                                <input type="text" placeholder="Websites & Apps" />
                                <UploadButton label="Photo or Video" size={"768x1198"} />
                            </div>

                            <div className="service service3">
                                <input type="text" placeholder="Graphic Design" />
                                <UploadButton label="Photo or Video" size={"768x1198"} />
                            </div>
                            <button className="add-service-btn">+ Add Service</button>
                        </div>
                        <button className="save-btn">SAVE</button>

                    </div>
                    <div className="section intro-session">
                        <h2>Team Session</h2>
                        <label>Text</label>
                        <div className="intro-section1">
                            <textarea placeholder="Write here..." className="intro-text" />
                            <UploadButton label="Photo or Video" size="1728x972" />
                        </div>
                        <button className="save-btn">SAVE</button>
                    </div>
                </div>

            </div>

        </>
    );
}


export default Home;