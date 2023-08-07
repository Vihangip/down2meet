import React from 'react';
import BodyHeader from '../components/BodyHeader';
import { useEffect } from 'react';
import { setUser } from '../redux/user/reducer';
import { useDispatch } from 'react-redux';
import { getSessionUserAsync, getFriendsAsync } from '../redux/user/thunks';


import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';

import Friend from '../components/Friend';
import { useNavigate } from 'react-router-dom';


function Friends() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
        await dispatch(getSessionUserAsync());
        storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser){
          navigate('/');
          return;
        }
        }
        // await dispatch(getFriendsAsync(JSON.parse(localStorage.getItem('user')).user_id));
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
    <div className="Body-Left">
      <Navbar />
    </div>
    <div className="Body-Middle">
    <div className="Friends">
    <BodyHeader title={"Friends"}/>

      <div className="FriendsPage">
        <div>
      {/* {sortedData.map((friend, index) => ( */}
        <Friend
          // key={index}
          // name={friend.name}
          // profilepic={friend.profilepic}
          // availability={friend.availability}
          // onRemove={() => handleRemoveFriend(index)}
        />
      {/* ))} */}
      </div>
    </div>
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

