import React, { Fragment } from "react";
import { connect } from "react-redux";

import Spnnier from "../layouts/Spnnier";

const Posts = ({ loading }) => {
  if (loading) {
    return <Spnnier />;
  }
  return (
    <Fragment>
      <h1>Post's</h1>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Posts);
