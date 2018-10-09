import React, { Component } from "react";
import axios from "./axios";
import { connect } from "react-redux";

const mapStateToProps = state => {
  // console.log("state in onlinesidebar ", state);
  return {
    users: state.users
  };
};

class Onlinesidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div id="onlinesidebarcontainer">
        <div>
          <h2>Online now</h2>
        </div>

        {this.props.users &&
          this.props.users.map(user => (
            <div id="online-sidebar-layout" key={user.id}>
              <img
                className="side-bar-pic-style"
                onClick={() => (location.href = "/user/" + user.id)}
                src={user.profile_pic || "/images/default.png"}
                alt={user.first_name}
              />
            </div>
          ))}
        <button onClick={() => (location.href = "/chat")}>CHAT NOW</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Onlinesidebar);
