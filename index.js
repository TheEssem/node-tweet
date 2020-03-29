import Blocks from "./src/endpoints/blocks.js";
import Statuses from "./src/endpoints/statuses.js";
import Search from "./src/endpoints/search.js";

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

export default Twitter;
