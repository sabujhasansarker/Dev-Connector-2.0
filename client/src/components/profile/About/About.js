import React, { useState } from "react";
import { Link } from "react-router-dom";
import Overview from "./Overview";
import Education from "./Education";
import Experience from "./Experience";
import ContactAndBasic from "./ContactAndBasic";

const About = ({ profile }) => {
  const [toggle, setToggle] = useState({
    overview: true,
    education: false,
    experience: false,
    contact: false,
  });

  return (
    <div id="about">
      <h1>About</h1>
      <div className="grid">
        <div className="left">
          <Link
            to="#overview"
            onClick={(e) =>
              setToggle({
                overview: true,
                education: false,
                experience: false,
                contact: false,
              })
            }
          >
            Overview
          </Link>
          <Link
            to="#educaion"
            onClick={(e) =>
              setToggle({
                overview: false,
                education: true,
                experience: false,
                contact: false,
              })
            }
          >
            Education
          </Link>
          <Link
            to="#experience"
            onClick={(e) =>
              setToggle({
                overview: false,
                education: false,
                experience: true,
                contact: false,
              })
            }
          >
            Experience
          </Link>
          <Link
            to="#contact"
            onClick={(e) =>
              setToggle({
                overview: false,
                education: false,
                experience: false,
                contact: true,
              })
            }
          >
            Contact and basic info
          </Link>
        </div>
        <div className="right">
          {toggle.overview && <Overview profile={profile} />}
          {toggle.education && <Education education={profile.education} />}
          {toggle.experience && (
            <Experience
              experience={profile.experience}
              skills={profile.skills}
              status={profile.status}
            />
          )}
          {toggle.contact && <ContactAndBasic profile={profile} />}
        </div>
      </div>
    </div>
  );
};

export default About;
