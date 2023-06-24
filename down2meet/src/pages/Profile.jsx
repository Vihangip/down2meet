
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileSchedule from '../components/ProfileSchedule';

function Profile() {

  const user = useSelector(state => state.user);

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
        {/*<ProfileSchedule/>*/}

    </div>
  );
}

export default Profile;