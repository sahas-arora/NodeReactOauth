import React from "react";
// import { Field } from "redux-form";

let SurveyField = props => {
  // console.log("The meta prop of survey field are: ", props.meta);
  // console.log("The input prop of survey field is: ", props.input);

  return (
    <div>
      <label>{props.label}</label>
      <input style={{ marginBottom: "5px" }} {...props.input} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default SurveyField;
