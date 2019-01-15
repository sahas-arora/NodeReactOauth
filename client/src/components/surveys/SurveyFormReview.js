import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";

import formFields from "./formFields";
import * as actions from "../../actions";

let SurveyFormReview = props => {
  let reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name} className="collection">
        <label className="bold">{field.label}</label>
        <div>{props.formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Kindly review your entries once again.</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={props.onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => props.submitSurvey(props.formValues, props.history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log("The state of SurveyFormReview", state);
  return {
    formValues: state.form.surveyForm.values
    // formTitles: state.form.surveyForm.fields
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
