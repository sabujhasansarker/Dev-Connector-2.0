import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { profileUpdate } from "../../../action/profile";

const Skills = ({
  profile: { skills, status, username },
  profileUpdate,
  user,
}) => {
  // const { skills, status, username } = profile ? profile : "";

  const [toggle, setToggle] = useState(false);

  const [fromdata, setFromdata] = useState({
    skills: skills ? skills.join(",") : "",
    status: status,
  });
  const onchage = (e) => {
    setFromdata({ ...fromdata, skills: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setFromdata({ ...fromdata });

    profileUpdate(fromdata);
    setToggle(!toggle);
  };
  return (
    <div className="text-center skill ">
      {!toggle ? (
        <Fragment>
          <div className="skills">
            {skills.map((e, index) => (
              <p key={index}>{e} </p>
            ))}
          </div>
          {username === user && (
            <button onClick={(e) => setToggle(!toggle)}>update skills</button>
          )}
        </Fragment>
      ) : (
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            value={fromdata.skills}
            onChange={(e) => onchage(e)}
          />
          <button onClick={(e) => setToggle(!toggle)}>Cancel</button>
          {skills.join(",") === fromdata.skills ? (
            <input type="submit" disabled value="Save" />
          ) : (
            <input type="submit" value="Save" />
          )}
        </form>
      )}

      <hr />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user.username,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { profileUpdate })(Skills);
