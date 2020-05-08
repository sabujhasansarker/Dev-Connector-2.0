import React from "react";
import { Link } from "react-router-dom";

const ContactAndBasic = ({ profile }) => {
  const { social } = profile && profile;
  return (
    <div className="contact">
      <h1>Contact and Basic Information</h1>
      <div className="p-20">
        <p>Email : {profile.user.email}</p>
        <hr />
        <p>
          Username :{" "}
          <Link to={`/${profile.username}`}>
            http://localhost:3000/{profile.username}
          </Link>
        </p>
        <hr />
        <div className="website_social_link">
          <h4>WEBSITES AND SOCIAL LINKS</h4>
          <br />
          <div className="top">
            <i className="fas fa-plus"></i>
            <h6 className="add">Add Website and social links</h6>
          </div>
          {profile.website && (
            <p>
              Website : <Link to={profile.website}>{profile.website}</Link>{" "}
            </p>
          )}
          <hr />
          {social && (
            <p>
              Social Link :
              {profile.githubusername && profile.githubusername && (
                <a
                  href={`http://github.com/${profile.githubusername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-github fa-2x"></i>
                </a>
              )}
              {social && social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-facebook fa-2x"></i>
                </a>
              )}
              {social && social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-twitter fa-2x"></i>
                </a>
              )}
              {social && social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-youtube fa-2x"></i>
                </a>
              )}
              {social && social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-linkedin fa-2x"></i>
                </a>
              )}
              {social && social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-instagram fa-2x"></i>
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactAndBasic;
