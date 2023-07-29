import React, {useState} from 'react';
import Friend from '../components/Friend';
import BodyHeader from '../components/BodyHeader';
import SortingComponent from '../components/Sorting';
import {useDispatch, useSelector} from 'react-redux';
import { removeFriend } from '../actions/actions';
import { useEffect } from 'react';
import { getUsersAsync } from '../redux/user/thunks';




function Friends() {
  const [sortOrder, setSortOrder] = useState('default');
  const friendsList = useSelector((state) => (state.users.friendsList));
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleRemoveFriend = (index) => {
    dispatch(removeFriend(index));
  };

  const sortedData = [...friendsList];

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
    <div className="Friends">
    <BodyHeader title={"Friends"}/>

      <div className="FriendsPage">
        <div>
      {sortedData.map((friend, index) => (
        <Friend
          key={index}
          name={friend.name}
          profilepic={friend.profilepic}
          availability={friend.availability}
          onRemove={() => handleRemoveFriend(index)}
        />
      ))}
      </div>
    </div>
    </div>
  );
}

export default Friends;

