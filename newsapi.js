const request = require("request");
const axios = require("axios");

let secrets;
if (process.env.NODE_ENV == "production") {
  secrets = process.env; // in prod the secrets are environment variables
} else {
  secrets = require("./secrets"); // secrets.json is in .gitignore
}

const newsapikey = secrets.NEWS_API_KEY;

exports.getNewsStream = async function() {
  const { data } = await axios.get(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + newsapikey
  );

  return data.articles;
};
