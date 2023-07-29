import React from 'react';
import BodyHeader from '../components/BodyHeader';
import { useEffect } from 'react';
import { setUser } from '../redux/user/reducer';
import { useDispatch } from 'react-redux';
import { getSessionUserAsync, getFriendsAsync } from '../redux/user/thunks';


import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import FriendList from '../components/FriendList';




function Friends() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
        await dispatch(getSessionUserAsync());
        // await dispatch(getPostsAsync());
        }
        await dispatch(getFriendsAsync(JSON.parse(localStorage.getItem('user'))));
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <>
    <div className="Body-Left">
      <Navbar />
    </div>
    <div className="Body-Middle">
    <div className="Friends">
    <BodyHeader title={"Friends"}/>
    <FriendList />
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

export default Friends;

