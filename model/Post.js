const { Schema, model } = require("mongoose");

const PostShema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
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
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      username: {
        type: String,
      },
      profilePic: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      replays: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
          text: {
            type: String,
            required: true,
          },
          username: {
            type: String,
          },
          profilePic: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("post", PostShema);
