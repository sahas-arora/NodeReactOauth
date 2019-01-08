import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";

import * as actions from "../actions";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="NodeReactOauth"
        description="$5 for 5 email credits"
        amount={500}
        token={token => {
          console.log(token);
          this.props.tokenHandler(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payment);
