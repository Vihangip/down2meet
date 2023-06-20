
import React, {useState} from 'react';
import {userData} from '../tests/usersData';
import Friend from '../components/Friend';
import SortingComponent from '../components/Sorting';

function Friends() {
  const [sortOrder, setSortOrder] = useState('default');

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedData = [...userData];

  if (sortOrder === 'availability') {
    sortedData.sort((a, b) => {
      return a.availability === b.availability ? 0 : a.availability ? -1 : 1;
    });
  } else if (sortOrder === 'busy') {
    sortedData.sort((a, b) => {
      return a.availability === b.availability ? 0 : a.availability ? 1 : -1;
    });
  }
  
  return (
    <div className="FriendsPage">
        <h1>Friends</h1>
        <SortingComponent sortOrder={sortOrder} handleSortChange={handleSortChange} />
        <div>
      {sortedData.map((friend, index) => (
        <Friend
          key={index}
          name={friend.name}
          profilepic={friend.profilepic}
          availability={friend.availability}
        />
      ))}
    </div>
    </div>
  );
}

export default Friends;

