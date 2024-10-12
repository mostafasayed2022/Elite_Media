// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "../../Css/Home.css";
import logo from "../../assets/logos/logo1.png";

const Home = () => {
    return (
        <>
            <div className="media-header-container">
                <div className="media-info">
                    <span className="badge">A MEDIA SERVICES</span>
                    <h1 className="title">
                        Elite Media Houses <br />
                        <span className="sub-title">Made By <span className="highlight">Elites  For  Elite</span></span>
                    </h1>
                    <p className="description">
                        Welcome To The Home Of Creativity, Uniqueness, Freshness, Originality And More.
                    </p>
                </div>
                <div className="logo-container">
                    <img src={logo} alt="EMH Logo" className="emh-logo" />
                </div>
            </div>
        </>
    );
}





export default Home;