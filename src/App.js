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
import Navbar from "./navbar";
import Friends from "./friends";
import Onlineusers from "./Onlineusers";
import Chat from "./chat";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upLoaderIsVisible: false,
            showBio: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.toggleShowBio = this.toggleShowBio.bind(this);
        this.setBio = this.setBio.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
    }
    showUploader() {
        console.log("showUploader is working");
        this.setState(
            {
                upLoaderIsVisible: true //this is
            },
            () => console.log(this.state.upLoaderIsVisible)
        );
    }
    setImage(url) {
        console.log("in setImage");
        this.setState({
            imageUrl: url,
            upLoaderIsVisible: false
        });
    }
    setBio(bio) {
        this.setState({
            bio: bio
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
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("data from Component did mount: ", data);
            this.setState({
                id: data.id,
                firstName: data.first_name,
                lastName: data.last_name,
                imageUrl: data.profile_pic,
                bio: data.bio
            });
        });
    }

    render() {
        const { firstName, lastName, id, imageUrl, bio, showBio } = this.state;
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
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/user/:id/"
                            component={OtherPersonsProfile}
                        />
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

<Logout />;
