import React, { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Friendbutton from "./Friendbutton";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null
    };

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.sortYTvideo = this.sortYTvideo.bind(this);
    this.uploadYTurl = this.uploadYTurl.bind(this);
  }
  handleChangeTextarea(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {}
    );
  }
  handleChangeInput(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {}
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
  sortYTvideo() {
    if (!this.props.youtubeurl) {
      return (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3R1ysTlxiVY"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      );
    } else return;
    // { __html: "this.props.youtubeurl" };
  }

  uploadYTurl() {
    axios.post("/insertmedia", this.state).then(resp => {
      if (resp.data.success) {
        this.sortYTvideo();
      }
    });
    // .then(() => this.props.showYouTubeUploader());
  }

  componentDidMount() {}

  render(props) {
    const {
      firstName,
      lastName,
      id,
      imageUrl,
      showBio,
      toggleShowBio,
      bio,
      showYouTubeUploader,
      uploadYTurl
    } = this.props;

    const { spotifyurl, youtubeurl } = this.state;
    return (
      <div id="profile-outer-container">
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

                    <input type="hidden" name="_csrf" value="{{csrfToken}}" />

                    <button type="submit">SUBMIT</button>
                  </form>
                ) : bio ? (
                  <div id="biocontainer">
                    <p id="biotext"> " {bio} " </p>
                    <p id="biobutton" onClick={toggleShowBio}>
                      {" "}
                      EDIT BIO{" "}
                    </p>
                  </div>
                ) : (
                  <p id="biobutton" onClick={toggleShowBio}>
                    ADD BIO
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="video-box">
          <div id="video-title">
            <div id="video-button-and-logo">
              <div id="videoplayerlogo">
                <img src="./images/vp.png" alt="" />
              </div>
              <div className="videoplayertitle">
                <h2>VIDEO BOX</h2>
              </div>
              <div className="video-button" onClick={showYouTubeUploader}>
                {this.props.YTuploaderVisable ? (
                  <p id="biobutton">CLOSE UPLOADER</p>
                ) : (
                  <p id="biobutton">CHANGE VIDEO</p>
                )}
              </div>
            </div>
            {this.props.YTuploaderVisable ? (
              <div>
                <p>
                  hint: if you need help in finding an embed code - see video
                  below
                </p>

                <input
                  onChange={this.handleChangeInput}
                  type="text"
                  name="youtubeurl"
                  placeholder="copy full embed code in here"
                />
                <button type="button" onClick={this.uploadYTurl}>
                  UPLOAD
                </button>
              </div>
            ) : null}
          </div>
          <div dangerouslySetInnerHTML={{ __html: this.props.youtubeurl }} />
          <div id="video"> {this.sortYTvideo()}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
