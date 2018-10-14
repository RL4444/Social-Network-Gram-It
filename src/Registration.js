import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("Running handleSubmit", this.state);
    axios.post("/registration", this.state).then(resp => {
      if (resp.data.error) {
        this.setState({
          error: resp.data.error
        });
      } else {
        location.replace("/");
      }
    });
  }
  render() {
    return (
      <div id="welcomedataform">
        <div>
          <h2 className="formtitle">Registration</h2>
        </div>
        <div id="registrationformdiv">
          <form onSubmit={this.handleSubmit}>
            {this.state.error ? <div>ERROR: {this.state.error}</div> : null}
            <div className="formitem">
              <input
                className="formitem"
                onChange={this.handleChange}
                type="text"
                name="firstName"
                placeholder="name"
              />
            </div>
            <div className="formitem">
              <input
                onChange={this.handleChange}
                type="text"
                name="lastName"
                placeholder="last name"
              />
            </div>
            <div className="formitem">
              <input
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="formitem">
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <div className="formitem">
              <input type="hidden" name="_csrf" value="{{csrfToken}}" />
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
        <div className="reglink">
          <Link to="/login"> already a member? login </Link>
        </div>
      </div>
    );
  }
}

export default Registration;
