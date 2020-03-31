import {request} from "https";
import * as utils from "./utils.js";

export default (parameters, path, auth, method, settings, endpoint = "api.twitter.com") => {
  const inputParameters = Object.keys(settings);
  for (const p of inputParameters) {
    parameters.push(`${utils.percentEncode(p)}=${utils.percentEncode(settings[p])}`);
  }
  const oauth = utils.oauth(auth.consumerKey, auth.consumerSecret, auth.accessToken, auth.accessSecret, parameters, path, method);
  return new Promise((resolve, reject) => {
    const req = request({
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
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        const parsedData = JSON.parse(data);
        if (parsedData.errors) {
          reject(new Error(parsedData.errors[0].message));
        } else {
          resolve(parsedData);
        }
      });
    });
    req.on("error", (e) => {
      reject(e);
    });
    req.end();
  });
};
