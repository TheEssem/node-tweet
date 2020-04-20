# node-tweet
A simple, zero-dependency, promise-based module for interacting with the Twitter API.

Currently it only supports OAuth 1.0a authentication, however pull requests are welcome to implement other types.

## Install
You can install this module using either npm or yarn.
```bash
$ npm install node-tweet
```
or
```bash
$ yarn install node-tweet
```

## Usage
```js
const Twitter = require("node-tweet");

const client = new Twitter({
  consumerKey: "<PUT CONSUMER KEY HERE>",
  consumerSecret: "<PUT CONSUMER SECRET HERE>",
  accessToken: "<PUT ACCESS TOKEN HERE>",
  accessSecret: "<PUT ACCESS SECRET HERE>"
});

// Tweet a message
client.statuses.update("This is a Tweet!").then(response => {
  console.log(response);
  /*{
    created_at: 'Thu Feb 20 16:39:01 +0000 2020',
    id: 1230532316528771000,
    id_str: '1230532316528771074',
    text: 'This is a Tweet!',
    ...
  }*/
});

// Reply to someone
await client.statuses.update("@TheEssem This is a reply!", { in_reply_to_status_id: "1229773297115652096" });

// Get a Tweet by its ID
const tweet = await client.statuses.show("603384079044759552");

// Get a list of people that you are blocking
client.blocks.list();
```

## Roadmap
node-tweet is still in the early stages of development, so here are some things that need to be implemented:

+ Finish every REST endpoint (starting with /statuses/*)
+ Add other types of authentication
+ Add media upload
+ Improve documentation

Pull requests are welcome to implement these and more.