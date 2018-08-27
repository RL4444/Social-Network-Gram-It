import React, { Component } from "react";
import axios from "./axios";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

class Onlineusers extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        console.log("this.props.users: ", this.props);
        return (
            <div id="online-now">
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                <h2>look who is online!</h2>
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                {this.props.users &&
                    this.props.users.map(user => (
                        <div className="acceptedfriendslayout" key={user.id}>
                            <img
                                src={user.profile_pic || "/images/default.png"}
                                alt=""
                            />
                            <div className="acceptedfriendstextlayout">
                                <h3>{user.first_name}</h3>
                                <button
                                    onClick={() => (location.href = "/chat")}
                                >
                                    join in the group chat?
                                </button>
                            </div>
                        </div>
                    ))}
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Onlineusers);
