const mongoose = require("mongoose");
const { Schema } = mongoose; // short for const Schema = mongoose.Schema;
const CommentSchema = require("./Comment");
const UserSchema = require("./User");
const RequestSchema = new Schema({
  // title: String, // title of the request
  // body: String,
  // comments: [CommentSchema],
  upvotes: { type: Number, default: 0, min: 0 },
  downvotes: { type: Number, default: 0, min: 0 },
  votes: { 
    upvotes:{ type: Object, default: {} },
    downvotes:{ type: Object, default: {} },
  },
  sourceArtist: String,
  sourceTrack: String,
  targetArtist: String,
  // category: String, => mapped to recipe ideally
  status: { type: Number, enum: [0, 1, 2, 3], default: 0 }, // 0 pending 1 accepted 2 in progress 3 done
  recipe: String,
  flavour: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }, // reference field
  created: Date
});
module.exports = mongoose.model("Request", RequestSchema, "requests");
