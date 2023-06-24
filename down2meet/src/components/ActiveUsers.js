import React from 'react';
import {userData} from '../tests/usersData'

export default function ActiveUsers(){

    return (
        <div>
            <h2>Active Users</h2>
            <ul className="activeUsers-list">
              {userData
              .sort((a, b) => (a.availability === b.availability ? 0 : a.availability ? -1 : 1))
              .map((user) => (
              <li className={user.availability ? 'activeUser' : 'inactiveUser'} key={user.name}>{user.name}</li>
      ))}
  </ul>
    </div>
    );
}