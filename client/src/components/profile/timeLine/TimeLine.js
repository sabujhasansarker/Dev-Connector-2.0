import React from "react";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";

const TimeLine = ({ profile }) => {
  return (
    <div className="body">
      <ProfileLeft profile={profile} />
      <ProfileRight />
    </div>
  );
};

export default TimeLine;
