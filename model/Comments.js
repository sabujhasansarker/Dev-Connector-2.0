const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  replies: [
    {
      body: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Comment", commentSchema);
