
import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {

  const user = useSelector(state => state.user);
  console.log(user);
  console.log(user.name);

  return (
    <div className="ProfilePage">
        <h2>Profile</h2>
        <div className="in-line">
          <img className="ProfilePicture" src={user.picture} alt="profile"/> 
          <div className="column">
            <p> Name:   {user.name} </p>
            <p> Email:   {user.email} </p>
          </div>
        </div>
        <h3> Schedule</h3>

    </div>
  );
}

export default Profile;