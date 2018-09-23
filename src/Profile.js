import React, { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Friendbutton from "./Friendbutton";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      spotifyurl: "",
      youtubeurl: "",
      error: null
    };

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.getSpotifyUrl = this.getSpotifyUrl.bind(this);
    this.setSpotifyUrl = this.setSpotifyUrl.bind(this);
  }
  handleChangeTextarea(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  handleChangeInput(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        // console.log(this.state);
      }
    );
  }

  handleSubmitTextarea(e) {
    e.preventDefault();
    axios.post("/uploadBio", this.state).then(resp => {
      if (resp.data.success) {
        this.props.setBio(resp.data.info.bio);
        this.props.toggleShowBio();
      }
    });
  }
  getSpotifyUrl() {
    axios.get("/allmedia").then(data => {
      if (data.data.success) {
        this.setState({
          spotifyurl: data.data.spotifyurl,
          youtubeurl: data.data.youtubeurl
        });
      }
    });
  }
  setSpotifyUrl(spotifyurl) {
    axios.post("/insertspotifyurl", { spotifyurl }).then(resp => {
      if (resp.data.success)
        this.setState({
          spotifyurl: resp.data.spotifyurl
        });
    });
  }

  render(props) {
    const {
      firstName,
      lastName,
      id,
      imageUrl,
      showBio,
      toggleShowBio,
      bio
    } = this.props;

    const { spotifyurl, youtubeurl } = this.state;

    console.log("state in profile", this.state);
    return (
      <div>
        <div id="placeholdernavbar" />
        <div id="placeholdernavbar" />
        <div id="placeholdernavbar" />
        <h2>your profile</h2>
        <div className="profile-flex-layout">
          <div className="eachcolumn">
            <img
              className="profilepic"
              src={imageUrl || "/images/default.png"}
              alt=""
              onClick={this.props.clickHandler}
            />
          </div>
          <div className="eachcolumn">
            <div>
              <div className="biostyler">
                <h2 id="oppNameProfile">
                  {firstName} {lastName}
                </h2>
              </div>
              <div id="biooutercontainer">
                {showBio ? (
                  <form onSubmit={this.handleSubmitTextarea} className="">
                    <textarea
                      id="biowritingbox"
                      name="bio"
                      onChange={this.handleChangeTextarea}
                    />
                    <button type="submit">Submit</button>
                  </form>
                ) : bio ? (
                  <div id="biocontainer">
                    <p id="biotext"> " {bio} " </p>
                    <p id="biobutton" onClick={toggleShowBio}>
                      {" "}
                      Click to edit your bio{" "}
                    </p>
                  </div>
                ) : (
                  <p onClick={toggleShowBio}>Click to add a bio</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
