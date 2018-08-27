import React, { Component } from "react";
import axios from "./axios";
import Friendbutton from "./Friendbutton";

class OtherPersonsProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get("/user/" + this.props.match.params.id + ".json")
            .then(({ data }) => {
                // console.log(
                //     "data from componentDidMount on other persons profile component axios request: ",
                //     data
                // );
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

    render() {
        const { firstName, lastName, id, imageUrl, bio } = this.state;
        return (
            <div>
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                <h2>profile for {firstName}</h2>
                <div id="profile">
                    <div id="eachcolumn">
                        <img id="profilepic" src={imageUrl} alt="" />
                    </div>
                    <div id="eachcolumn">
                        <div id="OPPlayout">
                            <h1 id="oppName">
                                {firstName} {lastName}
                            </h1>
                            <p id="oppBio">{bio}</p>
                            <Friendbutton oppId={this.props.match.params.id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherPersonsProfile;

// loggedInUserId={this.state.loggedInUserId}

// /*you need to pass this props of the params.id as a prop to the friendbutton
// who will use that with the server request req.session.id to make a query to the db*/
