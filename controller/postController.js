const { serverError } = require("../utils/errors");

// ? Model
const User = require("../model/User");
const Profile = require("../model/Profile");
const Post = require("../model/Post");

// * post
exports.getAllpost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    serverError(res, err);
  }
};

// * Create post
exports.createPost = async (req, res) => {
  const { body, thumbnail } = req.body;
  if (!body && !thumbnail) {
    return res
      .status(400)
      .json({ errors: { msg: "Please Enter something to post" } });
  }
  const profile = await Profile.findOne({ user: req.user.id });
  const user = await User.findById(req.user.id);
  if (!profile) {
    return res.status(400).json({ errors: { msg: "Profile dose not found" } });
  }
  try {
    const newpost = new Post({
      user: req.user.id,
      body,
      thumbnail,
      likes: [],
      comments: [],
      username: user.username,
    });
    newpost.save();
    res.json(newpost);
  } catch (err) {
    serverError(res, err);
  }
};

// * Update Pots
exports.editPost = async (req, res) => {
  const { body, thumbnail } = req.body;
  if (!body && !thumbnail) {
    return res
      .status(400)
      .json({ errors: { msg: "Please Enter something to post" } });
  }
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { body, thumbnail } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};

// * Delete Post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    serverError(res, err);
  }
};

// * Like
exports.likePost = async (req, res) => {
  let post = await Post.findById(req.params.postId);
  const user = await User.findById(req.user.id);
  if (!post) {
    return res.status(400).json({ errors: { msg: "Post dose not found" } });
  }
  try {
    // check if the post has already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
      await post.save();
      return res.json(post);
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};

//  * Comment
exports.commentPost = async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.user.id);
  if (!text) {
    return res
      .status(400)
      .json({ errors: { msg: "Please Enter something to post" } });
  }
  try {
    let post = await Post.findById(req.params.postId);
    const newComments = {
      text,
      user: req.user.id,
      username: user.username,
      profilePic: user.profilePic,
    };
    console.log(newComments);
    post.comments.unshift(newComments);
    await post.save();
    res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    let comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
    console.log(comment);
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment dose not exists" });
    }

    // Cheack user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};

//  * Replays
exports.replayComment = async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.user.id);
  if (!text) {
    return res
      .status(400)
      .json({ errors: { msg: "Please Enter something to post" } });
  }
  try {
    let post = await Post.findById(req.params.postId);

    let comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment dose not exists" });
    }
    const newComments = {
      text,
      user: req.user.id,
      username: user.username,
      profilePic: user.profilePic,
    };
    comment.replays.unshift(newComments);

    const comments = post.comments.map((c) =>
      c._id.toString() === req.params.comment_id ? comment : c
    );
    post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { comments } },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};

exports.deleteReplay = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    let comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
    let replay = comment.replays.find(
      (replay) => replay._id.toString() === req.params.replay_id
    );

    // Make sure comment exists
    if (!replay) {
      return res.status(404).json({ msg: "Replay dose not exists" });
    }

    // Cheack user
    if (replay.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const removeIndex = comment.replays
      .map((replay) => replay._id.toString())
      .indexOf(req.params.replayid);
    comment = comment.replays.splice(removeIndex, 1);

    res.json(comment);

    // post.comments.replays.splice(removeIndex, 1);
    // await post.save();
    // res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};
