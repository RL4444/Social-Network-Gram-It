import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, interval: f => f };
    this.increaseCount = this.increaseCount.bind(this);
    this.getNewsImg = this.getNewsImg.bind(this);
    this.getFriendsImg = this.getFriendsImg.bind(this);
    this.getVpImg = this.getVpImg.bind(this);
    this.slide1 = React.createRef();
    this.slide2 = React.createRef();
    this.slide3 = React.createRef();
    this.slide4 = React.createRef();
  }
  slideStyler() {
    if (this.state.count == 0) {
      console.log("slide 1 in slide styler");
      return "Chat with friends and connect with new people!";
    } else {
      if (this.state.count == 1) {
        console.log("slide2 in slide styler");
        return "Check out the news from international stories from our news stream";
      } else {
        if (this.state.count == 2) {
          console.log("slide 3 in slide styler");
          return "Let your friends know about your favourite songs in our video box player";
        } else {
          if (this.state.count == 3) {
            console.log("slide 4 in slide styler");
            return "Register to find out more! Let's be uncool together";
          }
        }
      }
    }
  }

  getFriendsImg() {
    if (this.state.count == 0 || this.state.count == 3) {
      return "./images/friends.png";
    } else {
      return null;
    }
  }
  getNewsImg() {
    if (this.state.count == 1 || this.state.count == 3) {
      return "./images/news.png";
    } else {
      return null;
    }
  }
  getVpImg() {
    if (this.state.count == 2 || this.state.count == 3) {
      return "./images/vp.png";
    } else {
      return null;
    }
  }

  increaseCount() {
    const { count } = this.state;
    this.setState({ count: count < 3 ? count + 1 : 0 });
    this.slideStyler();
  }

  componentDidMount() {
    this.slideStyler();
    console.log("mounted");
    this.setState({
      interval: setInterval(this.increaseCount, 5000)
    });
  }
  render() {
    return (
      <div id="homepagecarousel">
        <div id="carousel-icons">
          <div className="each-carousel-icon">
            <img src={this.getFriendsImg()} alt="" />
          </div>
          <div className="each-carousel-icon">
            <img src={this.getNewsImg()} alt="" />
          </div>
          <div className="each-carousel-icon">
            <img src={this.getVpImg()} alt="" />
          </div>
        </div>
        <h2>{this.slideStyler()}</h2>
      </div>
    );
  }
}

export default Home;
