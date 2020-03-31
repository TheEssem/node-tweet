import { randomBytes, createHmac } from "crypto";

export const percentEncode = (string) => {
  return encodeURIComponent(string).replace(/!/g, "%21").replace(/\*/g, "%2A").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
};

export const oauth = (consumer, consumerSecret, access, accessSecret, parameterArray, path, method, endpoint = "api.twitter.com") => {
  const nonce = randomBytes(16).toString("hex");
  const timestamp = Math.round((new Date()).getTime() / 1000.0);
  const parameters = [`oauth_consumer_key=${this.percentEncode(consumer)}`, `oauth_nonce=${nonce}`, "oauth_signature_method=HMAC-SHA1", `oauth_timestamp=${timestamp}`, `oauth_token=${this.percentEncode(access)}`, "oauth_version=1.0", ...parameterArray].sort().join("&");
  const signatureBase = `${method.toUpperCase()}&${this.percentEncode(`https://${endpoint}${path}`)}&${this.percentEncode(parameters)}`;
  const signing = `${consumerSecret}&${accessSecret}`;
  const signature = createHmac("sha1", signing).update(signatureBase).digest("base64");
  const authHeader = `OAuth oauth_consumer_key="${consumer}", oauth_nonce="${nonce}", oauth_signature="${this.percentEncode(signature)}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${timestamp}", oauth_token="${access}", oauth_version="1.0"`;
  return { header: authHeader, parameters: parameters };
};
