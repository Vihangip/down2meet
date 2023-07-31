import React from 'react';

export default function ProfileInfo() {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="in-line">
      <img className="ProfilePicture" src={user?.picture} alt="profile" /> {/* Use optional chaining to avoid errors if user is null */}
      <div className="column">
        <p> Name: {user?.name} </p> {/* Use optional chaining to avoid errors if user is null */}
        <p> Email: {user?.email} </p> {/* Use optional chaining to avoid errors if user is null */}
      </div>
    </div>
  );
}
