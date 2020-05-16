import React from "react";
import { connect } from "react-redux";

import { removeAlert } from "../../action/alert";

import cross from "../../icons/cross.svg";

const Alert = ({ removeAlert, alerts }) =>
  alerts !== null &&
  alerts.map((a) => (
     <div className="alert-container">
    <div className={`container d-flex ${a.alertType} alert  d-flex`} key={a.id}>
      <p>{a.msg}</p>
      <img src={cross} alt="" onClick={() => removeAlert(a.id)} />
    </div>
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
