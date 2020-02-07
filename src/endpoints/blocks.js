const utils = require("../utils");
const request = require("../request");

class Blocks {
  constructor(config) {
    this.auth = config;
  }

  async ids(settings) {
    if (!settings) settings = {};
    const parameters = ["stringify_ids=true"];
    const inputParameters = Object.keys(settings);
    for (const p of inputParameters) {
      parameters.push(`${utils.percentEncode(p)}=${utils.percentEncode(settings[p])}`);
    }
    const response = await request(parameters, "/1.1/blocks/ids.json", this.auth, "GET");
    return response;
  }

  async list(settings) {
    if (!settings) settings = {};
    const parameters = [];
    const inputParameters = Object.keys(settings);
    for (const p of inputParameters) {
      parameters.push(`${utils.percentEncode(p)}=${utils.percentEncode(settings[p])}`);
    }
    const response = await request(parameters, "/1.1/blocks/list.json", this.auth, "GET");
    return response;
  }
}

module.exports = Blocks;