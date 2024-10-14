// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import Header from "../Header";
import "../../Css/About.css"
import "../../Css/Home.css"
import CardsWork from "../CardsWork";
import Footer from "../Footer";
const Work = () => {
    return (
        <>
            <Header />
            <section className="work-container">
                <header className="about-header work-header" >
                    <span className="badge badge-work ">Work</span>

                    <h1 className="title">
                        Elite Media Houses <br />
                        <span className="sub-title work">Made By <span className="highlight">Elites  For  Elite</span></span>
                    </h1>
                </header>
            </section>
            
            <section>
                <CardsWork/>
            </section>
            <Footer/>
        </>
    );
}





export default Work;