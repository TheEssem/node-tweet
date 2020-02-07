const https = require("https");
const utils = require("./utils");

module.exports = async (parameters, path, auth, method, endpoint = "api.twitter.com") => {
  const oauth = utils.oauth(auth.consumerKey, auth.consumerSecret, auth.accessToken, auth.accessSecret, parameters, path);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: endpoint,
      path: `${path}?${oauth.parameters}`,
      method: method.toUpperCase(),
      headers: {
        "Authorization": oauth.header,
        "User-Agent": "node-tweet",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }, res => {
      res.setEncoding("utf8");
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      });
    });
    req.on("error", (e) => {
      reject(e);
    });
    req.end();
  });
};