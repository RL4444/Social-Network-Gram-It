import React, { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Friendbutton from "./Friendbutton";

class Today extends Component {
  constructor(props) {
    super();
    this.state = {
      news: [],
      apikey: ""
    };

    this.sortDesription = this.sortDesription.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.getNews = this.getNews.bind(this);
  }
  getNews() {
    var urlNews =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=" +
      apikey;

    var reqNews = new Request(urlNews);
    fetch(reqNews)
      .then(response => response.json())
      .then(json =>
        this.setState({
          news: json.articles
        })
      );
  }
  reloadPage() {
    location.reload();
  }
  sortDesription(desc) {
    if (desc == null) {
      return `    more info to follow...`;
    } else return `  ${desc}`;
  }

  componentDidMount() {
    axios
      .get("/today")
      .then(({ data }) => {
        console.log("data", data);
        this.setState({
          apikey: data.api_key
        });
      })
      .then(() => {
        this.getNews();
      });
  }
  render(props) {
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
            <h2>
              Hey {firstName}, here are the <strong>top stories</strong> from
              today!
            </h2>
            <div id="refresh">
              {" "}
              <a href="/">
                <img src="/images/refresh.svg" alt="" />
              </a>
            </div>
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
