import React from "react";
import "../Css/Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="dashboard-container">
                <aside className="sidebar">
                    <div className="logo">Logo</div>
                    <nav className="navigation">
                        <ul>
                            <li className="nav-item">
                                <NavLink to="/dashboard" >Home</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to="/about" >About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/work" >Work</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" >Contact</NavLink>
                            </li> */}
                        </ul>
                    </nav>
                    <div className="settings-logout">
                        <button className="settings-button">Settings</button>
                        <button className="logout-button">Logout</button>
                    </div>
                </aside>

                <main className="content">
                    <header className="header">
                        <input type="text" placeholder="Search" className="search-bar" />
                    </header>

                    <section className="intro-session section">
                        <h2>INTRO Session</h2>
                        <textarea placeholder="Text" />
                        <div className="upload-section">
                            <button>Click to upload</button>
                            <span>Home Video</span>
                        </div>
                        <button className="save-button">SAVE</button>
                    </section>

                    <section className="clients-session section">
                        <h2>Clients Session</h2>
                        <div className="upload-section">
                            <button>Click to upload</button>
                        </div>
                        <button className="save-button">SAVE</button>
                    </section>

                    <section className="services-session section">
                        <h2>Services Session</h2>
                        <div className="services-container">
                            <div className="service">
                                <input type="text" placeholder="Service 1" />
                                <button>Click to upload</button>
                            </div>
                            <div className="service">
                                <input type="text" placeholder="Service 2" />
                                <button>Click to upload</button>
                            </div>
                            <div className="service">
                                <input type="text" placeholder="Service 3" />
                                <button>Click to upload</button>
                            </div>
                        </div>
                        <button className="add-service-button">Add Service</button>
                        <button className="save-button">SAVE</button>
                    </section>

                    <section className="work-session section">
                        <h2>Work Session</h2>
                        <a href="#" className="work-link">Go To Work Page For Editing</a>
                        <button className="work-button">WORK</button>
                    </section>

                    <section className="team-session section">
                        <h2>Team Session</h2>
                        <textarea placeholder="Text" />
                        <div className="upload-section">
                            <button>Click to upload</button>
                        </div>
                        <button className="save-button">SAVE</button>
                    </section>
                </main>
            </div>
        </>
    );
}


export default Home;