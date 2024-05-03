import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="card mt-10 border rounded p-5 px-5 flex flex-col gap-5 w-96 h-[400px] justify-center items-center text-center mx bg-gradient-to-br from-[#0C1036] via-[#6A10D4] to-[#ffffff] shadow-md">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        By: {post.author}
      </p>
      {/* (Optional) Add additional elements like comments, likes, etc. */}
    </div>
  );
};

export default PostCard;