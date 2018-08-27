import React from "react";
import Logo from "./Logo";

function Navbar(props) {
    return (
        <div id="navbarstyling">
            <div id="applogocontainer">
                <Logo />
            </div>
            <div id="eachnavitem">
                <div id="placeholdernavbar" />
                <a id="linkitem" href="/logout">
                    logout
                </a>
            </div>
            <div id="eachnavitem">
                <div id="placeholdernavbar" />
                <a id="linkitem" href="/profile">
                    profile
                </a>
            </div>
            <div id="eachnavitem">
                <div id="placeholdernavbar" />
                <a id="linkitem" href="/friends">
                    friends
                </a>
            </div>

            <div id="eachnavitem">
                <div id="placeholdernavbar" />
                <a id="linkitem" href="/online">
                    online!
                </a>
            </div>
            <div id="eachnavitem">
                <div id="placeholdernavbar" />
                <a id="linkitem" href="/chat">
                    chat
                </a>
            </div>

            <div id="cornerpic-container">
                <img
                    onClick={() => (location.href = "/profile")}
                    id="iconpic"
                    src={props.imageUrl}
                    alt="click to visit your profile!"
                />
            </div>
        </div>
    );
}

export default Navbar;

// <a id="hideme" href="/profile">
// </a>
