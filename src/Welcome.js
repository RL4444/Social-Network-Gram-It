import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

function Welcome() {
    return (
        <div id="welcome">
            <div id="linkcontainerwelcomepage">
                <div id="welcomepagelogo">
                    <img src="/images/gram-it-logo.png" />
                </div>
                <HashRouter>
                    <div id="regform">
                        <div>
                            <Route exact path="/" component={Registration} />
                        </div>
                        <div>
                            <Route exact path="/login" component={Login} />
                        </div>
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}

// <div>
//     <Link to="/"> registration </Link>
// </div>
// <div>
//     <Link to="/login"> login </Link>
// </div>

export default Welcome;
