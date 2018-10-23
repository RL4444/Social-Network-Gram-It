import React, { Component } from "react";
import axios from "./axios";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(props) {
    console.log("mounted component");
  }
  render() {
    return (
      <div id="navbarstyling">
        <div id="applogocontainer">
          <a href="/">
            <img src="/images/it-logo.png" />
          </a>
        </div>
        <div id="search-bar">
          <div>
            <input type="text" placeholder="friends search" />
          </div>
          <div className="search-icon">
            <img src="/images/search2.png" alt="" />
          </div>
        </div>
        <div className="eachnavitem">
          <a href="/">
            <img src="/images/news.png" alt="" />
          </a>
        </div>

        <div id="online-link" className="eachnavitem">
          <a href="/online">online!</a>
        </div>

        <div className="eachnavitem">
          <a href="/profile">
            <img src="/images/profile.png" alt="" />
          </a>
        </div>
        <div className="eachnavitem">
          <a href="/friends">
            <img src="/images/friends.png" alt="" />
          </a>
        </div>

        <div className="eachnavitem">
          <a href="/chat">
            <img src="/images/message.png" alt="" />
          </a>
        </div>
        <div className="eachnavitem">
          <a href="/logout">
            <img src="/images/logout.png" alt="" />
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
