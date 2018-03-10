const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");
const Request = require("./Request");
const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  request: { type: Schema.Types.ObjectId, ref: "Request" }, // id of the request
  content: String
});
module.exports = CommentSchema;
