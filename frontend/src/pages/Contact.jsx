import React from 'react';
import { FaUser, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../comp_css/Contact.css';

const Contact = () => {
  const teamMembers = [
    {
      name: "Dr.S.Srithar",
      role: "Project Guide",
      email: "srithar@gmail.com",
      linkedin: "linkedin.com/in/srithar",
      github: "github.com/srithar"
    },
    {
      name: "A Sarvani",
      role: "Frontend Developer",
      email: "sarvani@icecreamdelight.com",
      linkedin: "https://www.linkedin.com/in/sravani-annapureddy/",
      github: "github.com/sarvani"
    },
    {
      name: "N Sowjanya",
      role: "Backend Developer",
      email: "sowjanya@icecreamdelight.com",
      linkedin: "www.linkedin.com/in/nallapaneni-lakshmi-sowjanya-1b224a2b0",
      github: "github.com/NALLAPANENILAKSHMISOWJANYA"
    },
    {
      name: "B Deepthi",
      role: "UI/UX Designer",
      email: "deepthi@icecreamdelight.com",
      linkedin: "https://www.linkedin.com/in/deepthi-chowdary-6216a0330/",
      github: "github.com/deepthichowdary"
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Our Team</h1>
        <p>Meet the people behind Ice Cream Delight</p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-member-info">
              <FaUser className="member-icon" />
              <h2>{member.name}</h2>
              <h3>{member.role}</h3>
              <div className="member-contact">
                <a href={`mailto:${member.email}`}>
                  <FaEnvelope className="contact-icon" />
                </a>
                <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="contact-icon" />
                </a>
                <a href={`https://${member.github}`} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="contact-icon" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact; 