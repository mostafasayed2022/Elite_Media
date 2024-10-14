import React from "react";



type TeamMember = {
    name: string;
    title: string;
    image: string;
};


const teamMembers: TeamMember[] = [
    { name: 'Mohamed Emam', title: 'Executive Co-Founder', image: '/path/to/image1.jpg' },
    { name: 'Mariam Basion', title: 'Executive Co-Founder', image: '/path/to/image2.jpg' },
    { name: 'Mohammed Hosary', title: 'Executive Co-Founder', image: '/path/to/image3.jpg' },
    { name: 'Amr Ali', title: 'Executive Co-Founder', image: '/path/to/image4.jpg' },
    { name: 'Yahia A. El Qarsh', title: 'Senior Video Editor', image: '/path/to/image5.jpg' },
    { name: 'Ahmed Soliman', title: 'Senior Graphic Designer', image: '/path/to/image6.jpg' },
    { name: 'Rana Mohamed', title: 'HR', image: '/path/to/image7.jpg' },
    { name: 'Arwa Sakr', title: 'Motion Designer', image: '/path/to/image8.jpg' },
    { name: 'Nouran Abdeen', title: 'Sales Representative', image: '/path/to/image9.jpg' },
];



const TeamSection: React.FC = () => {
    return (
        <>
            <div className="team-section">
                <h2 className="team-title">OUR TEAM</h2>
                <p className="team-subtitle">Meet the faces behind the magic!</p>
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
                    <a href="/join-team" className="join-team-button">JOIN OUR TEAM</a>
                </div>
            </div>

        </>
    )
}


export default TeamSection;