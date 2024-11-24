import React, { useEffect, useState } from "react";
import "../Css/About.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
// import { useNavigate } from "react-router-dom";

interface TeamMember {
    name: string;
    title: string;
    image: string | null; // Assuming you'll have image URLs instead of File
    id?: number;
}

const TeamSection: React.FC = () => {
    const [teamMember, setTeamMember] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS for animations
    }, []);

    useEffect(() => {
        const fetchTeamMemberData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://api.elitemediahouses.com/team_member_get/");
                
                if (response.data.length > 0) {
                    setTeamMember(response.data);
                }
            } catch (error) {
                console.error("Error fetching team members:", error);
                setError("Failed to load team members. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMemberData();
    }, []);

    return (
        <>
            <div className="team-section">
                <h2 className="team-title" data-aos="fade-up">OUR TEAM</h2>
                <p className="team-subtitle" data-aos="fade-up">Meet the faces behind the magic!</p>
                <p className="team-subtitle" data-aos="fade-up">A Collective of Creative Visionaries and Strategic Thinkers Driving our Success!</p>

                {loading ? (
                    <p>Loading team members...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="team-grid">
                        {teamMember.map((member, index) => (
                            <div key={index} className="team-card">
                                {member.image ? (
                                    <img
                                        data-aos="fade-up"
                                        src={member.image}
                                        alt={member.name}
                                        className="team-image"
                                        loading="lazy" // Lazy loading image for performance
                                    />
                                ) : (
                                    <div className="team-placeholder" data-aos="fade-up">No Image</div>
                                )}
                                <div className="team-info">
                                    <h3 data-aos="fade-up">{member.name}</h3>
                                    <p data-aos="fade-up">{member.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="join-team">
                    <a href="/join" className="join-team-button">JOIN OUR TEAM</a>
                </div>
            </div>
        </>
    );
};

export default TeamSection;
