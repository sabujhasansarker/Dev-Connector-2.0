import React from "react";

import notfound from "./404";
import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <div className="notfound">
      <img src={notfound} alt="" />
      <Link to="/" className="btn">
        {" "}
        Back to home
      </Link>
    </div>
  );
};

export default Notfound;
