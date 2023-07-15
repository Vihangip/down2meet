
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
//import ProfileSchedule from '../components/ProfileSchedule';
import Availability from '../components/Availability';
import Calendar from '../components/Calendar';
import { getUsersAsync } from '../redux/user/thunks';


function Profile() {

  const user = useSelector(state => state.reducer.user);


  //there's a problem with HTTP GET picture right now
  return (
    <div className="ProfilePage">
        <h2>Profile</h2>
        <div className="in-line">
          
          {/*<img className="ProfilePicture" src={user.picture} alt="profile"/>   */}
          <div className="column">
            <p> Name:   {user.name} </p> 
            <p> Email:   {user.user_id} </p>

          </div>
        </div>
        <h3> Schedule</h3>
       

       <div className="Calendar"> <Calendar/> </div>


        <div className="Calendar"> <Availability/> </div> 

    </div>
  );
}

export default Profile;