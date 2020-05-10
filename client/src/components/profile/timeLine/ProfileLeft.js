import React, { Fragment } from "react";
import Moment from "react-moment";
import Skills from "./Skills";
import Bio from "./Bio";

const ProfileLeft = ({ profile }) => {
  const { education, experience, bio, status, address, date, skills } = profile;

  return (
    <div className="intro p-20 shadwo">
      <i className="fas fa-globe-europe"></i> Intro
      <div className="intro-text">
        {skills && <Skills profile={profile} />}
        {bio && <Bio profile={profile} />}
        {education &&
          education.length > 0 &&
          education.map((e) => (
            <p key={e._id}>
              <i className="fas fa-graduation-cap"></i>
              {e.to && e.to ? "Went to" : "Studies "} {e.fieldofstudy} at{" "}
              {e.school}
            </p>
          ))}

        {experience && (
          <Fragment>
            {experience.map((e) => (
              <p key={e._id}>
                <i className="fas fa-briefcase"></i>
                {e.to && e.to ? "Working" : "Former"} at {e.title}
                {e.company}
              </p>
            ))}{" "}
          </Fragment>
        )}
        {address && (
          <Fragment>
            <i className="fas fa-home "></i> Live in {address}
          </Fragment>
        )}
        {date && (
          <p>
            <i className="fas fa-clock"></i> Joined on{" "}
            <Moment format="MMMM YYYY">{date}</Moment>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileLeft;
