import React from "react";
import { connect } from "react-redux";
import { newMessageSocket } from "./socket";

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
        this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    }
    handleChangeTextarea(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {}
        );
    }
    handleSubmitTextarea(e) {
        e.preventDefault();
        newMessageSocket(this.state.chatMessage);
        document.getElementById("chatTextArea").value = "";
    }

    render() {
        const { chatMessages } = this.props;
        if (!chatMessages) {
            return null;
        }
        let chatMsgs = chatMessages.slice(-10);
        const chatDiv = (
            <div>
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                <h1>chat page</h1>
                <div id="placeholdernavbar" />
                <div id="placeholdernavbar" />
                <div className="chatMessages">
                    {chatMsgs.map(message => (
                        <div
                            key={message.date}
                            className="acceptedfriendslayout"
                        >
                            <img
                                className="profile-pic-chat"
                                src={
                                    message.profilePic || "/images/default.png"
                                }
                            />{" "}
                            <div className="acceptedfriendstextlayout">
                                <div id="biostyler">
                                    <div id="message-content">
                                        <h3 id="chattextstyling">
                                            "{message.content}"
                                        </h3>
                                    </div>
                                    <div className="userName">
                                        <h4>
                                            {message.firstName}{" "}
                                            {message.lastName}
                                        </h4>
                                    </div>
                                    <div>
                                        <p>{message.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

        return (
            <div id="chatflex">
                <div>{chatDiv}</div>
                <form id="chattextenter" onSubmit={this.handleSubmitTextarea}>
                    <h3> Type something!</h3>
                    <textarea
                        id="chatTextArea"
                        name="chatMessage"
                        onChange={this.handleChangeTextarea}
                    />
                    <button type="submit">Send Message</button>
                </form>
            </div>
        );
    }
}
export default connect(state => {
    return {
        chatMessages: state.chatMessages
    };
})(Chat);
