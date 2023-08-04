import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/user/reducer';
import { useNavigate } from "react-router-dom";
//require('dotenv').config();

function Friends() {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.users);
  const user = JSON.parse(localStorage.getItem('user'));
  const [friendsData, setFriendsData] = useState([]);
  const [filterByAvailability, setFilterByAvailability] = useState('All');


  useEffect(() => {
    if (user) {
      fetch(`${process.env.REACT_APP_URL3001}/users/${user.user_id}/friendsData`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setFriendsData(data);
          dispatch(setUser({ ...user, friendsData: data }));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []); // Empty dependency array, so the effect runs only once on mount

  const handleAvailabilityFilter = (availability) => {
    setFilterByAvailability(availability);
  };

  const navigate = useNavigate(); 
  const handleProfileClick = (friendInfo) => {
    navigate('/FriendProfile', { state: { friendInfo } });   ///////
  };


  const filteredFriends = friendsData.filter((friend) => {
    if (filterByAvailability === 'All') {
      return true;
    } else {
      return friend.availability === filterByAvailability;
    }
  });

  return (
    <div>
      <div>
        <button onClick={() => handleAvailabilityFilter('All')}>All</button>
        <button onClick={() => handleAvailabilityFilter('Available')}>Available</button>
        <button onClick={() => handleAvailabilityFilter('Busy')}>Busy</button>
      </div>
      {filteredFriends.map((friend) => (
        <div>
        <div className="friend-container" key={friend.user_id}>
          <img className="friend-image" src={friend.picture} alt="pfp" />
          <p className="friend-info">{friend.name}</p>
          <div className="friend-container-button">
          <button className="friend-info" onClick={() => handleProfileClick({ user_id: friend.user_id, picture: friend.picture, name: friend.name, email: friend.email})}>See Profile</button>
        </div>

        </div>

        </div>
      ))}
    </div>
  );
}

export default Friends;
