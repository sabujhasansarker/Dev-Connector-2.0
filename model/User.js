const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    maxlength: 15,
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
    maxlength: 9,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
