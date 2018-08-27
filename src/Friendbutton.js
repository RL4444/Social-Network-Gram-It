import React, { Component } from "react";
import axios from "./axios";

class Friendbutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonVal: ""
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.initFriendReq = this.initFriendReq.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.getButtonVal = this.getButtonVal.bind(this);
    }
    componentDidMount() {
        console.log("props", this.props.oppId);
        axios.get("/friendship/" + this.props.oppId + ".json").then(resp => {
            this.setState({
                loggedInUserId: resp.data.loggedInUserId,
                receiverId: resp.data.reciever_id,
                senderId: resp.data.sender_id,
                status: resp.data.status,
                oppId: this.props.oppId
            });
        });
    }

    initFriendReq() {
        if (this.state.status == 2) {
            this.cancelRequest();
        } else if (this.state.status == 1) {
            console.log("this ", this.state.receiverId, this.props.oppId);
            if (this.state.receiverId == this.props.oppId) {
                this.cancelRequest();
            } else {
                this.acceptRequest();
            }
        } else {
            this.makeRequest();
        }
    }
    makeRequest() {
        console.log("this will change the friendship sql status to 1");
        axios
            .post("/friendshippending/" + this.props.oppId + ".json")
            .then(resp => {
                this.setState({
                    status: 1,
                    buttonVal: "cancel request"
                });
            });
    }

    cancelRequest() {
        axios
            .post("/endfriendship/" + this.props.oppId + ".json")
            .then(resp => {
                this.setState({
                    status: null,
                    buttonVal: "cancel request"
                });
            });

        console.log("this will clear the row");
    }
    acceptRequest() {
        console.log("this will change upsert 2 into the sql table");
        axios
            .post("/acceptfriendship/" + this.props.oppId + ".json")
            .then(resp => {
                this.setState({
                    status: 2
                });
            });
    }
    getButtonVal(status) {
        if (this.state.status == 2) {
            return "unfriend";
        } else if (this.state.status == 1) {
            console.log("this ", this.state.receiverId, this.props.oppId);
            if (this.state.receiverId == this.props.oppId) {
                return "cancel";
            } else {
                return "accept";
            }
        } else {
            return "send friend request";
        }
    }
    //     if (this.state.status == 2) {
    //         this.setState({
    //             buttonVal: "remove friend"
    //         });
    //     } else {
    //     }
    //     if (this.state.status == 1) {
    //         this.setState({
    //             buttonVal: "cancel request"
    //         });
    //     } else {
    //     }
    //     if (this.state.status == null) {
    //         this.setState({ buttonVal: "add friend" });
    //     }
    // }

    render() {
        console.log("this.state in friendship button: ", this.state);
        const buttonVal = this.state.buttonVal;

        return (
            <div id="friendButtonwrap">
                <button id="friendreqbutton" onClick={this.initFriendReq}>
                    {this.getButtonVal()}
                </button>
            </div>
        );
    }
}

export default Friendbutton;
