import React, { Component } from "react";
import axios from "./axios";
import { connect } from "react-redux";
import {
  recieveFriendsWannabes,
  acceptFriendRequest,
  endFriendship
} from "./actions";
import Profilepic from "./profilepic";

class Friends extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log("state in component did mount");
    this.props.dispatch(recieveFriendsWannabes());
  }
  acceptFriendsButton(id) {
    this.props.dispatch(acceptFriendRequest(id));
  }
  endFriendshipButton(id) {
    this.props.dispatch(endFriendship(id));
  }

  render() {
    var { user } = this.props;

    if (!this.props.friends || !this.props.pending) {
      return null;
    }
    var listOfFriends = (
      <div id="bigmommafriends">
        <h1>friends</h1>
        {this.props.friends &&
          this.props.friends.map(friend => {
            // console.log("fiends ", friend);
            return (
              <div className="acceptedfriendslayout" key={friend.id}>
                <img
                  src={friend.profile_pic || "/images/default.png"}
                  onClick={() => (location.href = "/user/" + friend.id)}
                  alt=""
                />
                <div className="acceptedfriendstextlayout">
                  <h3>{friend.first_name}</h3>
                  <button onClick={e => this.endFriendshipButton(friend.id, e)}>
                    UN-FRIEND
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    );

    var listOfPendingFriends = (
      <div id="bigmommafriends">
        <h1>friend requests</h1>
        {this.props.pending &&
          this.props.pending.map(friend => {
            console.log("what data do I have?:", friend);
            return (
              <div className="acceptedfriendslayout" key={friend.id}>
                <div>
                  <img
                    className="profilepic"
                    src={friend.profile_pic || "/images/default.png"}
                    onClick={() => (location.href = "/user/" + friend.id)}
                    alt=""
                  />
                  <div className="acceptedfriendstextlayout">
                    <h3>{friend.first_name}</h3>
                    <button
                      onClick={e => this.acceptFriendsButton(friend.id, e)}
                    >
                      ACCEPT
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
    return (
      <div>
        <div>
          {!this.props.friends.length && (
            <div>
              <div id="placeholdernavbar" />
              <h1>friends</h1>
              <div id="placeholdernavbar" />
              <p>:( you have no friends</p>
            </div>
          )}
          {!!this.props.friends.length && listOfFriends}
        </div>

        <div>
          {!this.props.pending.length && (
            <div>
              <div id="placeholdernavbar" />
              <div id="placeholdernavbar" />

              <h1>friend requests</h1>
              <div id="placeholdernavbar" />
              <p id="nopendingtext">no pending requests</p>
            </div>
          )}
          {!!this.props.pending.length && listOfPendingFriends}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pending: state.user && state.user.filter(user => user.status == 1),
    friends: state.user && state.user.filter(user => user.status == 2)
  };
};
export default connect(mapStateToProps)(Friends);
