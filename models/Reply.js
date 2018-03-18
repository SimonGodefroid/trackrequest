const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");
const Request = require("./Request");
const Comment = require("./Comment");
const ReplySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  request: { type: Schema.Types.ObjectId, ref: "Request" }, // id of the request
  comment: { type: Schema.Types.ObjectId, ref: "Comment" }, // id of the request
  content: String,
  votes: {
    upvotes:{ type: Object, default: {} },
    downvotes:{ type: Object, default: {} },
  },
});
module.exports = mongoose.model("Reply", ReplySchema, "replies");
