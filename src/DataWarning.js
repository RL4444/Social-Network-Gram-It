import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: "",
      warning: true
    };
    this.closeWarning = this.closeWarning.bind(this);
  }
  closeWarning() {
    this.setState({
      warning: false
    });
  }
  modalpopup() {
    setTimeout(function() {
      console.log("is it getting here?");
      return ` `;
    }, 2000);
  }
  componentDidMount(props) {
    // if (this.state.warning) {
    //     showWarning == true;
    // }
  }
  render() {
    if (this.state.warning) {
      return (
        <div className="black-background">
          <div id="warningmodalimagecontainer">
            <div className="warning-text-container">
              <p className="warning-text">
                This page is for demo purposes only. DO NOT USE real
                information, such as passwords or email addresses, that you use
                wth other sites.
              </p>
            </div>

            <div className="divButton">
              <button onClick={this.closeWarning}>
                <h3>ACCEPT</h3>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Welcome;
