const { Schema, model } = require("mongoose");

const PostShema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
  thumbnail: {
    type: String,
  },
  body: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("post", PostShema);
