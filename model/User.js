const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
