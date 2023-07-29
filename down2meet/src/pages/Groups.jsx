
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { AddGroup } from '../components/addGroup';
import Groups from '../components/Groups';
import { getFriendsAsync, getSessionUserAsync, getUsersAsync } from '../redux/user/thunks';

import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user/reducer';

function Group() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
        await dispatch(getSessionUserAsync());
        await dispatch(getFriendsAsync(JSON.parse(localStorage.getItem('user'))));
        // await dispatch(getPostsAsync());
        }
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
        <div className="Groups">
          <BodyHeader title={"Groups"} />
          <div><AddGroup/></div> 
          <div><Groups/></div>
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

export default Group;