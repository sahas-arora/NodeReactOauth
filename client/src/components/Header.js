import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );

      default:
        return [
          <div>
            <li key="a">
              <Payments />
            </li>
            <li key="c" style={{ margin: "0 10px" }}>
              Credits: {this.props.auth.credits}
            </li>
            <li key="b">
              <a href="/api/logout">Logout</a>
            </li>
          </div>
        ];
    }
  }

  render() {
    // console.log("The props of header are: ", this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            NodeReactOauth
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
