import React from "react";
import { connect } from "react-redux";

import { removeAlert } from "../../action/alert";

const Alert = ({ removeAlert, alerts }) =>
  alerts !== null &&
  alerts.map((a) => (
    <div className={`alert alert-${a.alertType} d-flex`} key={a.id}>
      <h4>{a.msg}</h4>{" "}
      <i className="fas fa-times" onClick={() => removeAlert(a.id)}></i>
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
