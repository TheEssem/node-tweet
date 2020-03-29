import request from "../request.js";

class Blocks {
  constructor(config) {
    this.auth = config;
  }

  async ids(settings) {
    if (!settings) settings = {};
    const response = await request(["stringify_ids=true"], "/1.1/blocks/ids.json", this.auth, "GET", settings);
    return response;
  }

  async list(settings) {
    if (!settings) settings = {};
    const response = await request([], "/1.1/blocks/list.json", this.auth, "GET", settings);
    return response;
  }
}

export default Blocks;
