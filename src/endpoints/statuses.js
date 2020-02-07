const utils = require("../utils");
const request = require("../request");

class Statuses {
  constructor(config) {
    this.auth = config;
  }

  async update(content, settings) {
    if (typeof content !== "string" && typeof content !== "object") throw new TypeError(`Tweet content must be of type string or object, got ${typeof content}`);
    if (typeof content === "object") {
      settings = content;
      content = settings.status;
    }
    if (!settings) settings = {};

    const parameters = [`status=${utils.percentEncode(content)}`];
    const inputParameters = Object.keys(settings);
    for (const p of inputParameters) {
      parameters.push(`${utils.percentEncode(p)}=${utils.percentEncode(settings[p])}`);
    }
    const response = await request(parameters, "/1.1/statuses/update.json", this.auth, "POST");
    return response;
  }

  async show(id, settings) {
    if (typeof id !== "string" && typeof id !== "object") throw new TypeError(`Tweet ID must be of type string or object, got ${typeof content}`);
    if (typeof id === "object") {
      settings = id;
      id = settings.id;
    }
    if (!settings) settings = {};

    const parameters = [`id=${utils.percentEncode(id)}`];
    const inputParameters = Object.keys(settings);
    for (const p of inputParameters) {
      parameters.push(`${utils.percentEncode(p)}=${utils.percentEncode(settings[p])}`);
    }
    const response = await request(parameters, "/1.1/statuses/show.json", this.auth, "GET");
    return response;
  }
}

module.exports = Statuses;