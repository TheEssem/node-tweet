const request = require("../request");
const utils = require("../utils");

class Search {
  constructor(config) {
    this.auth = config;
  }

  async tweets(query, settings) {
    if (typeof query !== "string" && typeof query !== "object") throw new TypeError(`Search query must be of type string or object, got ${typeof query}`);
    if (typeof content === "object") {
      settings = query;
      query = settings.status;
    }
    if (!settings) settings = {};
    const response = await request([`q=${utils.percentEncode(query)}`], "/1.1/search/tweets.json", this.auth, "GET", settings);
    return response;
  }
}

module.exports = Search;