import React from "react";
import { connect } from "react-redux";

import { setPopup, removePopup } from "../../../action/popup";

const EducationFrom = ({ setPopup, removePopup }) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <form action="">
          <input type="text" placeholder="inter your name" />
          <br /> <input type="text" placeholder="inter your name" />
          <br />
          <input type="text" placeholder="inter your name" />
          <br />
          <input type="text" placeholder="inter your name" />
        </form>
        <button onClick={(e) => removePopup()}>Close</button>
      </div>
    </div>
  );
};

export default connect(null, { setPopup, removePopup })(EducationFrom);
