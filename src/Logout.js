import React, { Component } from "react";
import { Link } from "react-router-dom";

function Logout() {
    return (
        <div className="logoutlink">
            <Link to="/">Click here to logout</Link>
        </div>
    );
}

export default Logout;
