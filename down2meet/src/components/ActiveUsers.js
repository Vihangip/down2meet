import React from 'react';

export default function ActiveUsers(){
    const activeUsers = [
        { id: 1, name: 'Jack Sparrow'},
        { id: 3, name: 'Bob Builder'},
        { id: 5, name: 'Dora Explorer'}
    ]

    const inactiveUsers = [
        { id: 2, name: 'Tony Spark'},
        { id: 4, name: 'Thanos Purpleguy'},
        { id: 6, name: 'Groot'}
    ]

    return (
        <div>
            <h2>Active Users</h2>
            <ul className='activeUsers-list'>
        {activeUsers.map(user => (
          <li className="activeUser" key={user.id}>{user.name}</li>
        ))}
        {inactiveUsers.map(user => (
          <li className="inactiveUser" key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
    );
}