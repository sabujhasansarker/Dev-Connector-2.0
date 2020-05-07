import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { profileUpdate } from "../../../action/profile";

const Bio = ({ bio, profileUpdate, skills, status }) => {
  const [toggle, setToggle] = useState(false);

  const [fromdata, setFromdata] = useState({
    skills: skills ? skills.join(",") : "",
    status: status,
    bio: bio,
  });
  const onchage = (e) => {
    setFromdata({ ...fromdata, bio: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //   setFromdata({ ...fr });

    profileUpdate(fromdata);
    setToggle(!toggle);
  };
  return (
    <div className="text-center bio">
      <div className="text-center skill ">
        {!toggle ? (
          <Fragment>
            <div className="bio">
              <h6>Bio</h6>
              <p>{bio}</p>
            </div>
            <button onClick={(e) => setToggle(!toggle)}>update bio</button>
          </Fragment>
        ) : (
          <form onSubmit={onSubmit}>
            <textarea
              type="text"
              value={fromdata.bio}
              onChange={(e) => onchage(e)}
            />
            {bio.length}
            <button onClick={(e) => setToggle(!toggle)}>Cancel</button>
            {bio === fromdata.bio ? (
              <input type="submit" disabled value="Save" />
            ) : (
              <input type="submit" value="Save" />
            )}
          </form>
        )}

        <hr />
      </div>
    </div>
  );
};

export default connect(null, { profileUpdate })(Bio);
