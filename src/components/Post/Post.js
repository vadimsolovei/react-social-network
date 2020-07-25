import React from 'react';
import './Post.css';

const Post = ({ message, likesCount }) => {
  return (
    <div className="post">
      <span role="img" aria-label="">
        &#129322;
      </span>
      <div>
        <p>{message}</p>
        <p>Likes {likesCount}</p>
      </div>
    </div>
  );
};

export default Post;
