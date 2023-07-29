import React from 'react';
import { useSelector } from 'react-redux';

export default function ProfileInfo() {

  const user = useSelector(state => state.users.user);

  return (
    <div className="in-line">
      <img className="ProfilePicture" src={user?.picture} alt="profile" /> {/* Use optional chaining to avoid errors if user is null */}
      <div className="column">
        <p> Name: {user?.name} </p> {/* Use optional chaining to avoid errors if user is null */}
        <p> ID: {user?.user_id} </p> {/* Use optional chaining to avoid errors if user is null */}
      </div>
    </div>
  );
}
