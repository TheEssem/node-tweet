// glorious streaming json parser, built specifically for the twitter streaming api
// this version has some changes compared to the other ones
// assumptions:
//   1) ninjas are mammals
//   2) tweets come in chunks of text, surrounded by {}'s, separated by line breaks
//   3) only one tweet per chunk
//
//   p = new parser.instance()
//   p.addListener("object", function...)
//   p.receive(data)
//   p.receive(data)
//   ...

const { EventEmitter } = require("events");

class Parser extends EventEmitter {
  constructor() {
    super();
    this.buffer = "";
  }

  get END() {
    return "\r\n";
  }
  get END_LENGTH() {
    return 2;
  }

  receive(buffer) {
    this.buffer += buffer.toString("utf8");
    let index, json;

    // We have END?
    while ((index = this.buffer.indexOf(this.END)) > -1) {
      json = this.buffer.slice(0, index);
      this.buffer = this.buffer.slice(index + this.END_LENGTH);
      if (json.length > 0) {
        try {
          json = JSON.parse(json);
          // Event message
          if (json.event) {
            // First emit specific event
            this.emit(json.event, json);
            // Now emit catch-all event
            this.emit("event", json);
          }
          // Delete message
          else if (json.delete) {
            this.emit("delete", json);
          }
          // Friends message (beginning of stream)
          else if (json.friends || json.friends_str) {
            this.emit("friends", json);
          }
          // Any other message
          else {
            this.emit("data", json);
          }
        } catch (error) {
          error.source = json;
          this.emit("error", error);
        }
      } else {
        // Keep Alive
        this.emit("ping");
      }
    }
  }
}

module.exports = Parser;
