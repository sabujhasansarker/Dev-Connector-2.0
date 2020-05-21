import React, { useState, Fragment } from "react";
import { createReplay, deleteReplay } from "../../action/post";
import { connect } from "react-redux";
import moment from "moment";

const Replay = ({
  replies,
  postId,
  commentId,
  userId,
  createReplay,
  deleteReplay,
  profile,
}) => {
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
      createReplay(postId, commentId, fromData);
      setFromData({ body: "" });
    }
  };
  return (
    <div className="comments">
      {profile && (
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your Replay"
              name="body"
              onChange={(e) => onChange(e)}
              value={fromData.body}
            />
          </div>
        </form>
      )}
      {replies &&
        replies.map((replie) => (
          <Fragment key={replie._id}>
            <div className="comment-body" key={replie._id}>
              <img
                className="user-head-image"
                src={replie.user.profilePic}
                alt=""
              />
              <div className="comment-text">
                <div className="flex">
                  <p className="text">
                    <b>{replie.user.firstName + " " + replie.user.lastName}</b>{" "}
                    {replie.body}
                  </p>
                  {replie.user._id === userId && (
                    <div className="dot-container">
                      <p
                        className="dot"
                        onClick={(e) => setDot({ _id: replie._id })}
                      >
                        ...
                      </p>
                      {dot._id === replie._id && (
                        <div className="dot-body">
                          <p
                            onClick={(e) => {
                              deleteReplay(postId, commentId, replie._id);
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
                <p>{moment(replie.date).fromNow()}</p>
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
};
export default connect(null, { createReplay, deleteReplay })(Replay);
