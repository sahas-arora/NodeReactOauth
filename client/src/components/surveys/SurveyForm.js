import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utilities/validatingEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, field => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  render() {
    console.log("The props of Survey Form are: ", this.props);
    //handleSubmit is a prop provided to us by the redux-form. We have wired it up as props through the last line.
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
          <Link
            to="/surveys"
            className="red btn-flat left white-text"
            // onClick={this.props.destroy}
          >
            Cancel
            <i className="material-icons left">backspace</i>
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  let errors = {};

  // if (!values.title) {
  //   errors.title = "You must provide a title.";
  // }
  // if (!values.subject) {
  //   errors.subject = "You must provide a subject for the survey.";
  // }
  // if (!values.emails) {
  //   errors.emails = "You must provide atleast one email recipient.";
  // }
  // if (!values.body) {
  //   errors.body = "You cannot leave the email body empty.";
  // }
  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name, emptyFieldError }) => {
    if (!values[name]) {
      errors[name] = emptyFieldError;
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
