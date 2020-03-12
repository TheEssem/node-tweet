const https = require("https");
const utils = require("../utils");
const Parser = require("./parser");

module.exports = (parameters, path, auth, method, settings, endpoint = "stream.twitter.com") => {
  const inputParameters = Object.keys(settings);
  for (const p of inputParameters) {
    parameters.push(`${utils.percentEncode(p)}=${utils.percentEncode(settings[p])}`);
  }
  const oauth = utils.oauth(auth.consumerKey, auth.consumerSecret, auth.accessToken, auth.accessSecret, parameters, path, method);
  const event = new Parser();
  const req = https.request({
    hostname: endpoint,
    path: `${path}?${oauth.parameters}`,
    method: method.toUpperCase(),
    headers: {
      "Accept": "*/*",
      "Connection": "close",
      "Authorization": oauth.header,
      "User-Agent": "node-tweet",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }, res => {
    res.setEncoding("utf8");
    if (res.statusCode !== 200) {
      event.emit("error", new Error(`Got a status code of ${res.statusCode}`));
    } else {
      event.emit("response", res);
    }
    
    res.on("data", chunk => {
      event.receive(chunk);
    });

    res.on("error", e => {
      event.emit("error", e);
    });

    res.on("end", () => {
      event.emit("end", res);
    });
  });

  event.destroy = function() {
    if (typeof req.abort === "function") {
      req.abort();
    } else {
      req.socket.destroy();
    }
  };

  req.on("error", (e) => {
    event.emit("error", e);
  });
  req.end();

  return event;
};