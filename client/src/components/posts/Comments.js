import React, { useState } from "react";
import Replay from "./Replay";

const Comments = () => {
  const [dot, setDot] = useState(false);
  const [replay, setReplay] = useState(false);
  const [showDot, setShowDot] = useState(false);

  return (
    <div className="comments">
      <form className="form">
        <div className="form-group">
          <input type="text" placeholder="Enter your comment" />
        </div>
      </form>
      <div className="comment-body">
        <img
          className="user-head-image"
          src="/uploads/2017-03-20-18-36-07-721.jpg"
          alt=""
        />
        <div className="comment-text">
          <div
            className="flex"
            onMouseEnter={(e) => setShowDot(true)}
            onMouseLeave={(e) => setShowDot(dot ? true : false)}
          >
            <p className="text">
              <b>Sabuj Hasan Sarker</b> Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Quod, molestiae ipsam! Similique sunt, cumque
              ipsum voluptates quisquam saepe, non amet voluptate porro
              reprehenderit, laudantium eligendi deserunt hic ea natus aliquam!
            </p>
            <p className="dot" onClick={(e) => setDot(!dot)}>
              {showDot && "..."}
            </p>
          </div>
          {dot && (
            <div className="dot-body">
              <p>Delete</p>
              <p onClick={(e) => setReplay(true)}>Replay</p>
            </div>
          )}
          <p>just Now</p>
        </div>
      </div>
      {replay && (
        <div className="replay-section">
          <Replay />
        </div>
      )}
    </div>
  );
};

export default Comments;
