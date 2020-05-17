import React, { Fragment } from "react";

import AboutNav from "./AboutNav";
import Overview from "./Overview";

const About = ({ profile: { profile } }) => {
  return (
    <Fragment>
      <AboutNav navTitle="OverView" username={profile && profile.username} />
      <Overview profile={profile && profile} />
    </Fragment>
  );
};

export default About;
