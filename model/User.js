const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  profilePic: {
    type: String,
  },
  profile: {
    type: Schema.Types.ObjectId,
    reg: "profile",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
