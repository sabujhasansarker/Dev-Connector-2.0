import React, { useState } from "react";
import Replay from "./Replay";
import { createComment, deleteComment } from "../../action/post";
import { connect } from "react-redux";

const Comments = ({
  comments,
  postId,
  createComment,
  userId,
  deleteComment,
}) => {
  const [dot, setDot] = useState(false);
  const [replay, setReplay] = useState(false);
  const [fromData, setFromData] = useState({
    body: "",
  });
  const onChange = (e) => {
    setFromData({ ...fromData, body: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (fromData.body !== "") {
      createComment(postId, fromData);
      setFromData({ body: "" });
    }
  };
  return (
    <div className="comments">
      {comments &&
        comments.map((comment) => (
          <div className="comment-body" key={comment._id}>
            <img
              className="user-head-image"
              src={comment.user.profilePic}
              alt=""
            />
            <div className="comment-text">
              <div className="flex">
                <p className="text">
                  <b>{comment.user.firstName + " " + comment.user.lastName}</b>{" "}
                  {comment.body}
                </p>
                {comment.user._id === userId && (
                  <div className="dot-container">
                    <p
                      className="dot"
                      onClick={(e) => setDot({ _id: comment._id })}
                    >
                      ...
                    </p>
                    {dot._id === comment._id && (
                      <div className="dot-body">
                        <p>Replay</p>
                        <p onClick={(e) => deleteComment(postId, comment._id)}>
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p>just Now</p>
            </div>
          </div>
        ))}
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your comment"
            name="body"
            onChange={(e) => onChange(e)}
            value={fromData.body}
          />
        </div>
      </form>
      {replay && (
        <div className="replay-section">
          <Replay />
        </div>
      )}
    </div>
  );
};

export default connect(null, { createComment, deleteComment })(Comments);
