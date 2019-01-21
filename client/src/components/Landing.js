import React from "react";
import "./Landing.css";

let Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Survey Me This!</h3>
      Collect feedback from your users!
      <div className="container">
        <h5>
          Steps to navigate through the application and create simple "yes/no"
          surveys:
        </h5>
        <ol style={{ textAlign: "left " }}>
          <li>
            Click on "Login with Google"(if you do not see this option on the
            navbar, just refresh the page and you'll be good to go!)
          </li>
          <li>In order to create surveys, you need credits in your account.</li>
          <li>
            Click on "Add Credits"(Since this is an application with mockup
            billing, do not enter your personal credit/debit card details).
          </li>
          <li>
            For the card number, enter 4242424242424242, with any future
            expiration date.
          </li>
          <li>
            Click on the "+" icon on the lower-right side of the dashboard page.
          </li>
        </ol>
      </div>
      <h5>Boom!! You're all set!</h5>
    </div>
  );
};

export default Landing;
