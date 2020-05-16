const router = require("express").Router();

const {
  getAllpost,
  createPost,
  editPost,
  deletePost,
  likePost,
  commentPost,
  deleteComment,
  replayComment,
  deleteReplay,
  getPostByUsername,
  getPostsByLike_Comments,
} = require("../controller/postController");
const auth = require("../middleware/auth");

router.get("/:username", getPostByUsername);

router.get("/:username/activity", getPostsByLike_Comments);

router.get("/", auth, getAllpost);

router.post("/", auth, createPost);

router.put("/edit/:postId", auth, editPost);

router.delete("/delete/:postId", auth, deletePost);

router.put("/like/:postId", auth, likePost);

router.put("/comment/:postId", auth, commentPost);

router.delete("/:postId/comment/:comment_id", auth, deleteComment);

router.put("/:postId/comment/:comment_id/replay", auth, replayComment);

router.delete(
  "/:postId/comment/:comment_id/replay/:replay_id",
  auth,
  deleteReplay
);

module.exports = router;
