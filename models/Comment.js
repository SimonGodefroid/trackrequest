const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");
const Request = require("./Request");
const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  request: { type: Schema.Types.ObjectId, ref: "Request" }, // id of the request
  content: String,
  votes: {
    upvotes:{ type: Object, default: {} },
    downvotes:{ type: Object, default: {} },
  },
  createdAt: Date,
},{
  timestamps: true
});
// module.exports = CommentSchema;
module.exports = mongoose.model("Comment", CommentSchema, "comments");
