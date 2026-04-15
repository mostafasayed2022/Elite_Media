import React from "react";
import { useTeam } from "../../../hooks/queries/useFeatures";
import { Link } from "react-router-dom";
import "../../../Css/About.css";

const TeamSection: React.FC = () => {
    const { data: teamMembers, isLoading, isError } = useTeam();

    if (isError) return null;

    return (
        <section className="team-section">
            <h2 className="team-title">Our Team</h2>
            <p className="team-subtitle">
                A Collective of Creative Visionaries and Strategic Thinkers Driving our Success!
            </p>

            {isLoading ? (
                <div className="team-grid">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="team-card shimmer" style={{ height: '400px' }} />
                    ))}
                </div>
            ) : (
                <div className="team-grid">
                    {teamMembers?.map((member, index) => (
                        <div key={index} className="team-card">
                            <img
                                src={member.image || ""}
                                alt={member.name}
                                className="team-image"
                            />
                            <div className="team-info">
                                <h3>{member.name}</h3>
                                <p>{member.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="join-team">
                <Link to="/join" className="join-team-button">
                    Join Our Team
                </Link>
            </div>
        </section>
    );
};

export default TeamSection;
