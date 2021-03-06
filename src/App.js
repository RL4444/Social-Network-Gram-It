import React, { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./Profilepic";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile";
import Uploader from "./uploader";
import OtherPersonsProfile from "./OtherPersonsProfile";
import Logout from "./logout";
import Friendbutton from "./Friendbutton";
import Navbar from "./Navbar";
import Friends from "./friends";
import Onlineusers from "./Onlineusers";
import Chat from "./chat";
import Today from "./today";
import Onlinesidebar from "./onlinesidebar";
import SearchBar from "./SearchBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upLoaderIsVisible: false,
      showBio: false,
      showSearch: false,
      YTuploaderVisable: false,
      youtubeurl: ""
    };
    this.showUploader = this.showUploader.bind(this);
    this.setImage = this.setImage.bind(this);
    this.toggleShowBio = this.toggleShowBio.bind(this);
    this.setBio = this.setBio.bind(this);
    this.closeUploader = this.closeUploader.bind(this);
    this.showYouTubeUploader = this.showYouTubeUploader.bind(this);
    this.loadUserInfo = this.loadUserInfo.bind(this);
    this.loadUserMedia = this.loadUserMedia.bind(this);
  }
  showUploader() {
    this.setState(
      {
        upLoaderIsVisible: true //this is
      },
      () => console.log(this.state.upLoaderIsVisible)
    );
  }
  setImage(url) {
    this.setState({
      imageUrl: url,
      upLoaderIsVisible: false
    });
  }

  showSearch() {
    console.log("show search working");
  }
  setBio(bio) {
    this.setState({
      bio: bio
    });
  }
  showYouTubeUploader() {
    this.setState({
      YTuploaderVisable: !this.state.YTuploaderVisable
    });
  }
  toggleShowBio() {
    this.setState({
      showBio: !this.state.showBio
    });
  }
  closeUploader() {
    this.setState({
      upLoaderIsVisible: false
    });
  }
  loadUserInfo() {
    axios.get("/user").then(({ data }) => {
      this.setState({
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.profile_pic,
        bio: data.bio
      });
    });
  }
  loadUserMedia() {
    console.log("hitting loadUserMedia method in App");
    axios.get("/allmedia").then(({ data }) => {
      console.log(
        "data in app parent component - checkign for media loading",
        data.youtubeurl
      );
      this.setState({
        youtubeurl: data.youtubeurl
      });
    });
  }

  componentDidMount() {
    this.loadUserInfo();
    this.loadUserMedia();
  }

  render() {
    const {
      firstName,
      lastName,
      id,
      imageUrl,
      bio,
      showBio,
      youtubeurl,
      YTuploaderVisable
    } = this.state;
    if (!this.state.id) {
      return <div>"Loading.. Please wait"</div>;
    }
    return (
      <div id="app">
        <Navbar
          firstName={firstName}
          lastName={lastName}
          id={id}
          imageUrl={imageUrl}
        />
        <SearchBar />
        <Onlinesidebar />
        <BrowserRouter>
          <div id="profilemaindiv">
            <Route exact path="/online" component={Onlineusers} />

            <Route exact path="/friends" component={Friends} />
            <Route path="/chat" component={Chat} />
            <Route
              exact
              path="/Profile"
              render={() => (
                <Profile
                  firstName={firstName}
                  lastName={lastName}
                  id={id}
                  imageUrl={imageUrl}
                  showBio={showBio}
                  toggleShowBio={this.toggleShowBio}
                  clickHandler={this.showUploader}
                  setBio={this.setBio}
                  bio={bio}
                  youtubeurl={youtubeurl}
                  showYouTubeUploader={this.showYouTubeUploader}
                  YTuploaderVisable={YTuploaderVisable}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Today
                  firstName={firstName}
                  lastName={lastName}
                  id={id}
                  imageUrl={imageUrl}
                />
              )}
            />
            <Route exact path="/user/:id/" component={OtherPersonsProfile} />
          </div>
        </BrowserRouter>
        {this.state.upLoaderIsVisible && (
          <div id="uploadermodalbackground">
            <Uploader
              setImage={this.setImage}
              clickHandler={this.showUploader}
            />
            <p id="cancelx" onClick={this.closeUploader}>
              x
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
