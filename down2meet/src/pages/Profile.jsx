
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
//import ProfileSchedule from '../components/ProfileSchedule';
import Availability from '../components/Availability';
import { useDispatch } from 'react-redux';
import { getUsersAsync } from '../redux/user/thunks';


function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.userList[0]);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);




  return (
    <div className="ProfilePage">
        <h1 className='middle-text'>Profile</h1>
        <div className="in-line">
          <img className="ProfilePicture" src={user.picture} alt="profile"/> 
          <div className="column">
            <p> Name:   {user.name} </p>
            <p> Email:   {user.email} </p>
          </div>
        </div>
        <h3> Schedule</h3>
       
        <div className="Calendar"> <Availability/> </div>

        {/* <div className="Calendar"> <Calendar/> </div> */}


        {/* <div className="Calendar"> <Availability/> </div> */}

    </div>
  );
}

export default Profile;