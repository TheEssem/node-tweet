const Blocks = require("./src/endpoints/blocks");
const Statuses = require("./src/endpoints/statuses");

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
}

module.exports = Twitter;