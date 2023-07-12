import React from 'react';
import { useSelector } from 'react-redux';

export default function ActiveUsers({friends}){
    const friendsList = useSelector((state) => state.friendsList);
    const activeUsers = friendsList.filter((friend) => friend);

    return (
        <div>
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