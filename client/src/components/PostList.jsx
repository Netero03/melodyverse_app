import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard'; // Import the PostCard component

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // For pagination

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          // Add authorization headers for authenticated requests
          title,
          content,
          author
        });
        setPosts(response.data);
      } catch (err) {
        setError(err.response.data.message || 'Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]); // Refetch posts on page change

  const handleLoadMore = async () => {
    setPage(page + 1); // Increase page number for next batch
  };

  return (
    <div className="post-list">
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          {posts.length >= 10 && ( // Show "Load More" button only if there are at least 10 posts
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
