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
      () => {
        console.log(this.state);
      }
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("Running handleSubmit", this.state);
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
        <h1 className="formtitle">Login</h1>
        <div className="formstyler">
          {this.state.error ? <div>ERROR: {this.state.error}</div> : null}
          <form onSubmit={this.handleSubmit} className="">
            <div>
              <input
                onChange={this.handleChange}
                type="text"
                name="email"
                placeholder="email"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <button type="submit">Submit</button>
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
