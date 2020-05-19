exports.postPopulet = (model, res) => {
  model
    .find()
    .populate("user", ["username", "profilePic", "firstName", "lastName"])
    .populate({
      path: "comments",
      model: "Comment",
      populate: [
        {
          path: "user",
          select: ["username", "profilePic", "firstName", "lastName"],
          model: "User",
        },
        {
          path: "replies.user",
          select: ["username", "profilePic", "firstName", "lastName"],
          model: "User",
        },
      ],
    })
    .sort({ date: -1 })
    .exec(function (err, data) {
      if (!err) {
        res.json(data);
      }
    });
};

exports.siglePostPopulet = (model, postId, res) => {
  model
    .findById(postId)
    .populate("user", ["username", "profilePic", "firstName", "lastName"])
    .populate({
      path: "comments",
      model: "Comment",
      populate: [
        {
          path: "user",
          select: ["username", "profilePic", "firstName", "lastName"],
          model: "User",
        },
        {
          path: "replies.user",
          select: ["username", "profilePic", "firstName", "lastName"],
          model: "User",
        },
      ],
    })
    .sort({ date: -1 })
    .exec(function (err, data) {
      if (!err) {
        res.json(data);
      }
    });
};
