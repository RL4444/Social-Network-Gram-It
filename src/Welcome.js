import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Home from "./Home";

function Welcome() {
  return (
    <HashRouter>
      <div id="welcome">
        <div id="welcome-links">
          <Link to="/reg"> Registration </Link>
          <Link to="/"> Welcome </Link>
          <Link to="/login"> Login </Link>
        </div>

        <div id="linkcontainerwelcomepage">
          <div id="welcomepagelogo">
            <a href="/">
              <img src="/images/gram-it-logo.png" />
            </a>
          </div>

          <div id="regform">
            <div>
              <Route exact path="/" component={Home} />
            </div>
            <div>
              <Route exact path="/reg" component={Registration} />
            </div>
            <div>
              <Route exact path="/login" component={Login} />
            </div>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default Welcome;
