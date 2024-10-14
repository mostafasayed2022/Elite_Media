import React from "react";

import "../Css/About.css";

import image1 from "../assets/about/emam.png";
import image2 from "../assets/about/marawan 1.png";
import image3 from "../assets/about/hosny.png";
import image4 from "../assets/about/ali.png";
import image5 from "../assets/about/el qersh 5.png";
import image6 from "../assets/about/ahmed 1.png";
import image7 from "../assets/about/Rana 1 (1).png";
import image8 from "../assets/about/arwa 1.png";
import image9 from "../assets/about/nouran 1.png";
import image10 from "../assets/about/team.png";





type TeamMember = {
    name: string;
    title: string;
    image: string;
};


const teamMembers: TeamMember[] = [
    { name: 'Mohamed Emam', title: 'Executive Co-Founder', image: `${image1}` },
    { name: 'Mariam Basion', title: 'Executive Co-Founder', image: `${image2}` },
    { name: 'Mohammed Hosary', title: 'Executive Co-Founder', image: `${image3}` },
    { name: 'Amr Ali', title: 'Executive Co-Founder', image: `${image4}` },
    { name: 'Yahia A. El Qarsh', title: 'Senior Video Editor', image: `${image5}` },
    { name: 'Ahmed Soliman', title: 'Senior Graphic Designer', image: `${image6}` },
    { name: 'Rana Mohamed', title: 'HR', image: `${image7}` },
    { name: 'Arwa Sakr', title: 'Motion Designer', image: `${image8}` },
    { name: 'Nouran Abdeen', title: 'Sales Representative', image: `${image9}` },
    { name: '', title: '', image: `${image10}` }

];



const TeamSection: React.FC = () => {
    return (
        <>
            <div className="team-section">
                <h2 className="team-title">OUR TEAM</h2>
                <p className="team-subtitle">Meet the faces behind the magic!</p>
                <p className="team-subtitle">A Collective of Creative Visionaries and Strategic Thinkers Driving our Success. !</p>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            <img src={member.image} alt={member.name} className="team-image" />
                            <div className="team-info">
                                <h3>{member.name}</h3>
                                <p>{member.title}</p>

                            </div>

                        </div>
                    ))}


                </div>
                <div className="join-team">
                    <a href="/join" className="join-team-button">JOIN OUR TEAM</a>
                </div>
            </div>

        </>
    )
}


export default TeamSection;