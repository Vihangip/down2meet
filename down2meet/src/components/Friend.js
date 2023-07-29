import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/user/reducer';

function Friends() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [friendsData, setFriendsData] = useState([]);
  const [filterByAvailability, setFilterByAvailability] = useState('All');

  console.log('Friends component rendered');

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/users/${user.user_id}/friendsData`)
        .then((response) => {
          if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
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
        <div key={friend.user_id}>
          <h2>{friend.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Friends;
