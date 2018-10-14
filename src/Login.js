import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {}
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    axios.post("/login", this.state).then(resp => {
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
        <h2 className="formtitle">Login</h2>
        <div className="formstyler">
          {this.state.error ? <div>ERROR: {this.state.error}</div> : null}
          <form onSubmit={this.handleSubmit} className="">
            <div className="formitem">
              <input
                onChange={this.handleChange}
                type="text"
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
            <div>
              <input type="hidden" name="_csrf" value="{{csrfToken}}" />
            </div>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
        <div className="reglink">
          <Link to="/reg"> click here to create a new account </Link>
        </div>
      </div>
    );
  }
}

export default Login;
