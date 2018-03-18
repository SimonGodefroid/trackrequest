const mongoose = require("mongoose");
const RequestSchema = require("./Request");
const { Schema } = mongoose; // short for const Schema = mongoose.Schema;
const UserSchema = new Schema({
  googleId: String,
  requests:[{ type: Schema.Types.ObjectId, ref: "Request" }],
  votes: {
    upvotes:{ type: Object, default: {} },
    downvotes:{ type: Object, default: {} },
  },
  commentsVotes:{
    upvotes:{ type: Object, default: {} },
    downvotes:{ type: Object, default: {} },
  }
  // keep track of comments
  // keep track of votes on comments
  // keep track on replies
  // credits: { type: Number, default: 0 }
});
module.exports = mongoose.model("users", UserSchema);
