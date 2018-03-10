const mongoose = require("mongoose");
const { Schema } = mongoose; // short for const Schema = mongoose.Schema;
const UserSchema = new Schema({
  googleId: String,
  votes: { type: Object, default: {} }
  // credits: { type: Number, default: 0 }
});
module.exports = mongoose.model("users", UserSchema);
