const { serverError } = require("../utils/errors");

// ? Model
const User = require("../model/User");
const Profile = require("../model/Profile");
const Post = require("../model/Post");
const Comments = require("../model/Comments");
const Repelies = require("../model/Repelies");

// * post
exports.getAllpost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["firstName", "lastName", "username", "profilePic"])
      .sort({ date: -1 });
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
    let newpost = new Post({
      user: req.user.id,
      body,
      thumbnail,
      likes: [],
      comments: [],
      username: user.username,
    });
    newpost.save();

    const posts = await Post.find({ user: req.user.id });
    await Profile.findOneAndUpdate(
      { username: req.user.username },
      { $set: { posts } },
      { new: true }
    );
    newpost = await Post.findById(newpost._id).populate("user", [
      "firstName",
      "lastName",
      "username",
      "profilePic",
    ]);
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
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { body, thumbnail } },
      { new: true }
    );
    const posts = await Post.find()
      .populate("user", ["firstName", "lastName", "username", "profilePic"])
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    serverError(res, err);
  }
};

// * Delete Post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    const post = await Post.find()
      .populate("user", ["firstName", "lastName", "username", "profilePic"])
      .sort({ date: -1 });
    res.json(post);

    const posts = await Post.find({ user: req.user.id });
    await Profile.findOneAndUpdate(
      { username: req.user.username },
      { $set: { posts } },
      { new: true }
    );
  } catch (err) {
    serverError(res, err);
  }
};

// * Like
exports.likePost = async (req, res) => {
  let post = await Post.findById(req.params.postId);
  let profile = await Profile.findOne({ user: req.user.id });
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

      // Profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { likes: { _id: req.params.postId } } },
        { new: true }
      );

      await post.save();
      post = await Post.findById(req.params.postId).populate("user", [
        "firstName",
        "lastName",
        "username",
        "profilePic",
      ]);
      return res.json(post);
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    // Profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { likes: { _id: req.params.postId } } },
      { new: true }
    );
    post = await Post.findById(req.params.postId).populate("user", [
      "firstName",
      "lastName",
      "username",
      "profilePic",
    ]);

    res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};

//  * Comment
exports.commentPost = async (req, res) => {
  const { body } = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ errors: { msg: "Please Enter something to post" } });
  }
  try {
    const newComments = new Comments({
      body,
      user: req.user.id,
      replies: [],
    });
    await newComments.save();
    let comments = await Comments.findById(newComments._id).populate("user", [
      "firstName",
      "lastName",
      "username",
      "profilePic",
    ]);
    let post = await Post.findById(req.params.postId);
    console.log(post);
    post.comments.unshift(comments);
    await post.save();

    // Profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { comments: { _id: req.params.postId } } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    serverError(res, err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    console.log(post);
    let comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
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

    // Profile
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { comments: { _id: req.params.postId } } },
      { new: true }
    );
    await Comments.findByIdAndDelete(req.params.comment_id);
    console.log(profile);
  } catch (err) {
    serverError(res, err);
  }
};

//  * Replays
exports.replayComment = async (req, res) => {
  const { body } = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ errors: { msg: "Please Enter something to post" } });
  }
  try {
    const newRepelies = new Repelies({
      body,
      user: req.user.id,
    });

    await newRepelies.save();
    let replies = await Repelies.findById(newRepelies._id).populate("user", [
      "firstName",
      "lastName",
      "username",
      "profilePic",
    ]);

    let post = await Post.findById(req.params.postId);
    let comments = await Comments.find({ _id: req.params.comment_id });
    console.log(req.params.comment_id);
    comments.replies.unshift(replies);
    // const comment = await comments.save();
    // post.comments.unshift(comment);
    console.log(comments);
    // Profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { comments: { _id: req.params.postId } } },
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

    if (!comment) {
      return res.status(404).json({ msg: "Comment dose not exists" });
    }

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
    comment.replays = comment.replays.filter(
      (re) => re._id.toString() !== req.params.replay_id && re
    );

    let comments = post.comments.filter((comm) =>
      comm._id.toString() === req.params.comment_id ? comment : comm
    );
    post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { comments } },
      { new: true }
    );
    res.json(post);
    // Profile
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { comments: { _id: req.params.postId } } },
      { new: true }
    );
    console.log(profile);
  } catch (err) {
    serverError(res, err);
  }
};

//
exports.getPostByUsername = async (req, res) => {
  try {
    const posts = await Post.find({
      username: req.params.username,
    })
      .populate("user", ["firstName", "lastName", "username", "profilePic"])
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    serverError(res, err);
  }
};

exports.getPostsByLike_Comments = async (req, res) => {
  try {
    const profile = await Profile.find({ username: req.params.username });

    let posts = await Post.find();

    posts = profile[0].posts.filter(
      (post) => post._id === posts.map((p) => p._id)
    );

    res.json(posts);
  } catch (err) {
    serverError(res, err);
  }
};
