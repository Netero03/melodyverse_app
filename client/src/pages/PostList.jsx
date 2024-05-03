import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import PostCard from '../components/PostCard'; // Component for displaying individual posts

const PostList = ({ onLogout }) => { // Receive onLogout prop
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const observer = useRef(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/posts?page=${pageNumber}`);
      const newPosts = response.data.posts;
      if (newPosts.length === 0) {
        // If no new posts are available, set hasMore to false
        setHasMore(false);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPageNumber(pageNumber + 1); // Increment page number
      }
    } catch (err) {
      setError(err.response.data.message || 'Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('melodyverse-token');
    onLogout(); // Call onLogout function received as prop
    navigate('/login'); // Redirect to login page immediately after logout
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMore && !loading) { // Load more only if intersecting, more posts available, and not currently loading
      fetchPosts();
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0 // Trigger when the observer target is fully in view
    });

    observer.current.observe(document.getElementById('observer-target'));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [posts, hasMore, loading]);

  return (
    <div className='w-screen-full flex flex-row'>
      <div id="post-list" className='w-screen-full flex flex-col justify-center items-center px-12 mt-20 mr-20 relative'>
        {posts.map((post, index) => (
          <PostCard key={`${post._id}-${index}`} post={post} />
        ))}
        <div id="observer-target" style={{ height: '10px' }}></div>
        {loading && <p>Loading more posts...</p>}
        {error && <p>{error}</p>}
      </div>
      <div className='fixed top-4 right-4 z-50'>
        <button onClick={handleLogout} className="bg-[] text-white px-3 py-1 rounded">Logout</button>
      </div>
    </div>
  );
};

export default PostList;
