import React, { Component } from "react";
import axios from "./axios";
import Friendbutton from "./Friendbutton";

class OtherPersonsProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOPPuser = this.getOPPuser.bind(this);
    this.getOPPmedia = this.getOPPmedia.bind(this);
  }
  getOPPuser() {
    axios
      .get("/user/" + this.props.match.params.id + ".json")
      .then(({ data }) => {
        if (data.redirect) {
          this.props.history.push("/");
        } else {
          this.setState({
            id: data.data.id,
            firstName: data.data.first_name,
            lastName: data.data.last_name,
            imageUrl: data.data.profile_pic,
            bio: data.data.bio
          });
        }
      });
  }

  getOPPmedia() {
    axios
      .get("/usersmedia/" + this.props.match.params.id + ".json")
      .then(({ data }) => {
        if (data.redirect) {
          this.props.history.push("/");
        } else {
          this.setState({
            youtubeurl: data.youtubeurl
          });
        }
      });
  }
  componentDidMount() {
    this.getOPPuser();
    this.getOPPmedia();
  }

  render() {
    console.log("this.state in opp", this.state);
    const { firstName, lastName, id, imageUrl, bio } = this.state;
    return (
      <div>
        <div className="profile-flex-layout">
          <div className="eachcolumn">
            <img
              className="profilepic"
              src={imageUrl || "/images/default.png"}
              alt=""
            />
          </div>
          <div className="eachcolumn">
            <div id="OPPlayout">
              <h1 id="oppName">
                {firstName} {lastName}
              </h1>
              <p id="oppBio"> " {bio} "</p>
              <Friendbutton oppId={this.props.match.params.id} />
            </div>
          </div>
        </div>
        {this.state.youtubeurl ? (
          <div id="video-box">
            <div id="video-title">
              <div id="video-button-and-logo">
                <div id="videoplayerlogoopp">
                  <img src="./images/vp.png" alt="" />
                </div>
                <div className="videoplayertitle" />
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.state.youtubeurl }} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default OtherPersonsProfile;

// loggedInUserId={this.state.loggedInUserId}

// /*you need to pass this props of the params.id as a prop to the friendbutton
// who will use that with the server request req.session.id to make a query to the db*/
