import React, { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Friendbutton from "./Friendbutton";

class Today extends Component {
  constructor(props) {
    super();
    this.state = {
      news: []
    };

    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.sortDesription = this.sortDesription.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }
  handleChangeTextarea(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  handleChangeInput(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        // console.log(this.state);
      }
    );
  }

  handleSubmitTextarea(e) {
    e.preventDefault();
    axios.post("/uploadBio", this.state).then(resp => {
      if (resp.data.success) {
        this.props.setBio(resp.data.info.bio);
        this.props.toggleShowBio();
      }
    });
  }
  reloadPage() {
    location.reload();
  }
  sortDesription(desc) {
    if (desc == null) {
      return "  more info to follow...";
    } else return `  ${desc}`;
  }

  componentDidMount() {
    var urlNews =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=de485aaf260d449baf20235b3a111b5c";

    var reqNews = new Request(urlNews);
    fetch(reqNews)
      .then(response => response.json())
      .then(json =>
        this.setState({
          news: json.articles
        })
      );
  }
  render(props) {
    console.log("this.state", this.state.news);
    const {
      firstName,
      lastName,
      id,
      imageUrl,
      showBio,
      toggleShowBio,
      bio
    } = this.props;

    if (this.state.news.length > 0) {
      return (
        <div id="newsstreamouter">
          <div id="newsheader">
            <h2>Hey {firstName}, here are the top stories from today!</h2>
          </div>
          <div id="refresh">
            {" "}
            <h1 onClick={this.reloadPage}> Refresh Feed? </h1>{" "}
          </div>
          {this.state.news.map(news => (
            <div key={news.publishedAt}>
              <div id="newsstreamcontainer">
                <div className="newspic">
                  <a href={news.url} target="_blank">
                    <img
                      src={news.urlToImage || "/images/breakingnews.jpg"}
                      alt=""
                    />
                  </a>
                </div>
                <div className="newsinfocontainer">
                  <h2>
                    {news.title}
                    <p id="bynewssource"> article by {news.source.name}</p>
                  </h2>

                  <p className="description">
                    {" "}
                    {this.sortDesription(news.description)}
                  </p>
                  <a id="links" href={news.url} target="_blank">
                    click here to read article
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div id="newsstreamouter">
          <div id="newsheader">
            <h2>
              Gram-it is having trouble loading the news-stream this morning.
              Please check later
            </h2>
          </div>
        </div>
      );
    }
  }
}
export default Today;
