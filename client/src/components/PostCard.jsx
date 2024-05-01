import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        By: {post.author.username} (optional: show author details like profile picture)
      </p>
      {/* (Optional) Add additional elements like comments, likes, etc. */}
    </div>
  );
};

export default PostCard;