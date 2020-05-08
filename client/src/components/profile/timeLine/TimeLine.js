import React from "react";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";

const TimeLine = ({ profile }) => {
  return (
    <div className="body" id="timeline">
      <ProfileLeft profile={profile} />
      <ProfileRight />
    </div>
  );
};

export default TimeLine;
