import React from "react";
import { connect } from "react-redux";
import Spnnier from "../layouts/Spnnier";
import { Redirect, Route } from "react-router-dom";
import Notfound from "../layouts/Notfound";

const Deshboard = ({ auth: { loading, user }, match }) => {
  if (loading) {
    return <Spnnier />;
  }

  if (user && user.username !== match.params.username) {
    return <Route exact component={Notfound} />;
  }

  return (
    <div>
      <h1>Deshboard</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Deshboard);
