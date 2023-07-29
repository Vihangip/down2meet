import SocialFeed from '../components/SocialFeed';
import PostBar from '../components/PostBar';
import BodyHeader from '../components/BodyHeader';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsAsync } from '../redux/posts/thunks';
import { getSessionUserAsync } from '../redux/user/thunks';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        await dispatch(getSessionUserAsync());
        await dispatch(getPostsAsync());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, [dispatch]);

  return (
    <div className="Home">
      <BodyHeader title={"My Feed"} />
      <div className="Body-Middle">
        <PostBar />
        <SocialFeed />
      </div>
    </div>
  );
}

export default Home;