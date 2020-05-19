const { serverError } = require("../utils/errors");
const { postPopulet, siglePostPopulet } = require("../utils/postPopulet");

// ? Model
const User = require("../model/User");
const Profile = require("../model/Profile");
const Post = require("../model/Post");
const Comments = require("../model/Comments");

// * post
exports.getAllpost = async (req, res) => {
  try {
    postPopulet(Post, res);
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
      siglePostPopulet(Post, req.params.postId, res);
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    // Profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { likes: { _id: req.params.postId } } },
      { new: true }
    );
    siglePostPopulet(Post, req.params.postId, res);
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
    newComments.save();

    await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { comments: newComments._id },
      },
      { new: true }
    );

    // Profile
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { comments: newComments._id },
      },
      { new: true }
    );

    // comment
    postPopulet(Post, res);
  } catch (err) {
    serverError(res, err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);

    // Cheack user

    const removeIndex = post.comments
      .map((comment) => comment._id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    postPopulet(Post, res);

    // Profile
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { comments: req.params.postId } },
      { new: true }
    );
    await Comments.findByIdAndDelete(req.params.comment_id);
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
    const newReplay = {
      body,
      user: req.user.id,
    };

    const comments = await Comments.findById(req.params.comment_id);
    comments.replies.unshift(newReplay);
    comments.save();
    // comment
    postPopulet(Post, res);
  } catch (err) {
    serverError(res, err);
  }
};

exports.deleteReplay = async (req, res) => {
  try {
    let comments = await Comments.findById(req.params.comment_id);

    // Cheack user

    const removeIndex = comments.replies
      .map((replie) => replie._id)
      .indexOf(req.params.replay_id);

    comments.replies.splice(removeIndex, 1);
    await comments.save();
    postPopulet(Post, res);

    // Profile
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { comments: req.params.postId } },
      { new: true }
    );
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

    let posts = await Post.find({ likes: req.params.username });

    res.json(posts);
  } catch (err) {
    serverError(res, err);
  }
};
