import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersAsync } from '../redux/user/thunks';

export default function ActiveUsers({friends}){
  const friendsList = useSelector((state) => (state.users.friendsList));
    const dispatch = useDispatch();

    
  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);


  const activeUsers = friendsList.filter((friend) => friend);
    return (
        <div className='ActiveUsers'>
          <h2>Active Users</h2>
          <ul className="activeUsers-list">
            {activeUsers && activeUsers.length > 0 ? (
              activeUsers
                .sort((a, b) => (a.availability === b.availability ? 0 : a.availability ? -1 : 1))
                .map((user) => (
                  <li className={user.availability ? 'activeUser' : 'inactiveUser'} key={user.name}>
                    {user.name}
                  </li>
                ))
            ) : (
              <li>No active users</li>
            )}
          </ul>
        </div>
      );
}