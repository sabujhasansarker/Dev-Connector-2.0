import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

import Replay from "./Replay";
import { createComment, deleteComment } from "../../action/post";
import { connect } from "react-redux";
import moment from "moment";

const Comments = ({
  comments,
  postId,
  createComment,
  userId,
  deleteComment,
  profile,
}) => {
  const [replaytoggle, setReplaytoggle] = useState(false);
  const [dot, setDot] = useState(false);
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
          <Fragment key={comment.user && comment._id}>
            <div className="comment-body" key={comment.user && comment._id}>
              <img
                className="user-head-image"
                src={comment.user && comment.user.profilePic}
                alt=""
              />
              <div className="comment-text">
                <div className="flex">
                  <p className="text">
                    <Link to={`/${comment.user && comment.user.username}`}>
                      <b>
                        {comment.user && comment.user.firstName}{" "}
                        {comment.user && comment.user.lastName}
                      </b>{" "}
                    </Link>
                    {comment.body}
                  </p>
                  {comment.user && comment.user._id === userId && (
                    <div className="dot-container">
                      <p
                        className="dot"
                        onClick={(e) =>
                          setDot(
                            dot ? false : { _id: comment.user && comment._id }
                          )
                        }
                      >
                        ...
                      </p>
                      {dot._id === comment._id && (
                        <div className="dot-body">
                          <p
                            onClick={(e) => {
                              setReplaytoggle(
                                replaytoggle
                                  ? false
                                  : { _id: comment && comment._id }
                              );
                              setDot(false);
                            }}
                          >
                            Replay
                          </p>
                          <p
                            onClick={(e) => {
                              deleteComment(
                                postId,
                                comment.user && comment._id
                              );
                              setDot(false);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p>{moment(comment.date).fromNow()}</p>
              </div>
            </div>
            {replaytoggle._id === comment._id && (
              <Fragment>
                <div className="replay-section">
                  <Replay
                    replies={comment.replies}
                    postId={postId}
                    commentId={comment._id}
                    userId={userId}
                    profile={profile}
                  />
                </div>
              </Fragment>
            )}
          </Fragment>
        ))}
      {profile && (
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
      )}
    </div>
  );
};

export default connect(null, { createComment, deleteComment })(Comments);
