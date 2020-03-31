const utils = require("../utils");
const request = require("../request");
const stream = require("../streaming/stream");

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
    const response = await request([`status=${utils.percentEncode(content)}`], "/1.1/statuses/update.json", this.auth, "POST", settings);
    return response;
  }

  async show(id, settings) {
    if (typeof id !== "string" && typeof id !== "object") throw new TypeError(`Tweet ID must be of type string or object, got ${typeof content}`);
    if (typeof id === "object") {
      settings = id;
      id = settings.id;
    }
    if (!settings) settings = {};
    const response = await request([`id=${utils.percentEncode(id)}`], "/1.1/statuses/show.json", this.auth, "GET", settings);
    return response;
  }

  filter(track, settings) {
    if (typeof track !== "string" && typeof track !== "object") throw new TypeError(`Search query must be of type string or object, got ${typeof track}`);
    if (typeof track === "object") {
      settings = track;
      track = settings.track;
    }
    if (!settings) settings = {};
    const event = stream(track ? [`track=${utils.percentEncode(track)}`] : [], "/1.1/statuses/filter.json", this.auth, "POST", settings);
    return event;
  }
}

module.exports = Statuses;