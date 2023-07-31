import HangoutFeed from '../components/HangoutFeed';
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersAsync } from '../redux/user/thunks';
import { getPostsAsync } from '../redux/posts/thunks';
import { getSessionUserAsync } from '../redux/user/thunks';
import { setUser } from '../redux/user/reducer';


function Hangouts() {

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Check if there is user data in local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
          await dispatch(getSessionUserAsync()); // Fetch user data if it's not in local storage
        }
        await dispatch(getUsersAsync());
        await dispatch(getPostsAsync());
        console.log("user on store: " + storedUser);
        console.log("userrrrrrid on store: " + storedUser.user_id);
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
      <BodyHeader title={"My Accepted Hangouts"} />
        <HangoutFeed />
    </div>
    </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        {/* <ActiveUsers /> */}
        </div>
      </>
  );
}

export default Hangouts;    