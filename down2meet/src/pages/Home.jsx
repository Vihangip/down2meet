import SocialFeed from '../components/SocialFeed';
import PostBar from '../components/PostBar';
import BodyHeader from '../components/BodyHeader';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsAsync } from '../redux/posts/thunks';
import { getSessionUserAsync } from '../redux/user/thunks';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import ActiveUsers from '../components/ActiveUsers';
import { setUser } from '../redux/user/reducer';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
          await dispatch(getSessionUserAsync()); // Fetch user data if it's not in local storage
        }
        await dispatch(getPostsAsync());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, [dispatch]);

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
        <div className="Home">
          <BodyHeader title={"My Feed"} />
          <div className="Body-Middle">
            <PostBar />
            <SocialFeed />
          </div>
        </div>
      </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        {/* <ActiveUsers />  */}
        </div>
      </>
    
  );
}

export default Home;