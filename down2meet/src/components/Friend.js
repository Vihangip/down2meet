import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/user/reducer';
import { useNavigate } from "react-router-dom";

function Friends() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const [friendsData, setFriendsData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    if (user) {
      // Fetch friendsData and set it in the component's state
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
  }, []);

  const handleAvailabilityFilter = (availability) => {
    setActiveFilter(availability);
  };

  const navigate = useNavigate(); 
  const handleProfileClick = (friendInfo) => {
    navigate('/FriendProfile', { state: { friendInfo } });
  };

  const filteredFriends = friendsData.filter((friend) => {
    if (activeFilter === 'All') {
      return true;
    } else {
      return friend.availability === activeFilter;
    }
  });

  return (
    <div>
      <div className='Friend-Button-Container'>
        <button className={`Friend-Button${activeFilter === 'All' ? 'active' : ''}`} onClick={() => handleAvailabilityFilter('All')}>All</button>
        <button className={`Friend-Button${activeFilter === 'Available' ? 'active' : ''}`} onClick={() => handleAvailabilityFilter('Available')}>Available</button>
        <button className={`Friend-Button${activeFilter === 'Busy' ? 'active' : ''}`} onClick={() => handleAvailabilityFilter('Busy')}>Busy</button>
      </div>
      {filteredFriends.map((friend) => (
        <div key={friend.user_id}>
          <div className="friend-container">
            <img className="friend-image" src={friend.picture} alt="pfp" />
            <p className="friend-info">{friend.name}</p>
            <div className="friend-container-button">
              <button className="friend-info" onClick={() => handleProfileClick({ user_id: friend.user_id, picture: friend.picture, name: friend.name, email: friend.email })}>See Profile</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Friends;
