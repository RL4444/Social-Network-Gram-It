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
        <div className="search-icon">
          <img src="/images/search2.png" alt="" />
        </div>
        <div id="search-bar">
          <div>
            <input type="text" placeholder="friends search" />
          </div>
        </div>
        <div className="eachnavitem">
          <a href="/">
            <img src="/images/news.png" alt="" />
          </a>
          <div className="nav-item-text">
            <p>NEWS STREAM</p>
          </div>
        </div>
        <div className="eachnavitem">
          <a href="/profile">
            <img src="/images/profile.png" alt="" />
          </a>
          <div className="nav-item-text">
            <p>PROFILE</p>
          </div>
        </div>
        <div className="eachnavitem">
          <a href="/friends">
            <img src="/images/friends.png" alt="" />
          </a>
          <div className="nav-item-text">
            <p>FRIEND REQUESTS</p>
          </div>
        </div>
        <div className="eachnavitem">
          <a href="/chat">
            <img src="/images/message.png" alt="" />
          </a>
          <div className="nav-item-text">
            <p>IT! FORUM</p>
          </div>
        </div>
        <div className="eachnavitem">
          <a href="/logout">
            <img src="/images/logout.png" alt="" />
          </a>
          <div className="nav-item-text">
            <p>LOGOUT</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
