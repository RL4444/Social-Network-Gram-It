import React from "react";
import Uploader from "./uploader";

function ProfilePic(props) {
    console.log("profile pic:", props);
    return (
        <div id="cornerpic-container">
            <img
                id="iconpic"
                src={props.imageUrl}
                alt={`${props.firstName} ${props.lastName}`}
            />
            <div id="cornerbuttons">
                <div>
                    <a id="logout" href="/logout">
                        Logout!
                    </a>
                </div>
                <div>
                    <a href="/profile">Your profile</a>
                </div>
            </div>
        </div>
    );
}

export default ProfilePic;
