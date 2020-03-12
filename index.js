const Blocks = require("./src/endpoints/blocks");
const Statuses = require("./src/endpoints/statuses");
const Search = require("./src/endpoints/search");

class Twitter {
  constructor(config) {
    this.auth = config;
  }

  get statuses() {
    return new Statuses(this.auth);
  }

  get blocks() {
    return new Blocks(this.auth);
  }

  get search() {
    return new Search(this.auth);
  }
}

module.exports = Twitter;