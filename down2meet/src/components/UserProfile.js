import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setUser } from '../redux/user/reducer';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar.js';
import ButtonAvailable from './ButtonAvailable.js';
import Search from './Search';
import { current } from '@reduxjs/toolkit';
import service from '../redux/user/service';

//require('dotenv').config();


export default function UserProfile() {
  const { userId } = useParams(); // get the userId from the URL
  const [userProfile, setUserProfile] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log("UserProfile");
  console.log(currentUser);

  const addFriend = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${currentUser.user_id}/addFriend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId: userProfile.user_id })
    });
    const data = await response.json();
    dispatch(setUser(data)); // Use the setUser Redux action to update the current user
  };

  const removeFriend = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${currentUser.user_id}/removeFriend`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ friendId: userProfile.user_id })
      });
      const data = await response.json();
      dispatch(setUser(data)); // Use the setUser Redux action to update the current user
  };

  useEffect(() => { //VIHANGI
    // Only fetch the user's profile if userId is not undefined
    const fetchFriends = async() => {
      try {
        const friendListData = await service.getFriends(currentUser.user_id);
        setUserFriends(friendListData);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await service.getOneUser(userId);
        setUserProfile(userData);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    // if (userId) {
    //   fetch(`${process.env.REACT_APP_URL3001}/users/${userId}`)
    //     .then((response) => response.json())
    //     .then((data) => setUserProfile(data))
    //     .catch((error) => console.error(error));
    // }
    fetchFriends();
    fetchUser();
  }, [userId, currentUser.user_id]);

  useEffect(() => { //LUCY
    // if (currentUser) {
    //   fetch(`${process.env.REACT_APP_URL3001}/users/${currentUser.user_id}/friends`)
    //     .then((response) => response.json())
    //     .then((data) => setUserFriends(data))
    //     .catch((error) => console.error(error));
    // }
    
  // }, [addFriend, removeFriend]);
  }, []);



  if (!userProfile) {
    return null;
  }

  return (
<>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
      <div className="UserProfile">
          <h1>{userProfile.name}</h1>
          <img src={userProfile.picture} alt={userProfile.name} />
          {currentUser && userFriends.includes(userProfile.user_id)
              ? <button className="deleteButton" onClick={removeFriend}>Delete Friend</button>
              : <button className="addButton" onClick={addFriend}>Add Friend</button>
          }
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
