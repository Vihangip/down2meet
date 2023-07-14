
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
//import ProfileSchedule from '../components/ProfileSchedule';
import Availability from '../components/Availability';
// import Calendar from '../components/Calendar';


function Profile() {

  const user = useSelector(state => state.user);



  return (
    <div className="ProfilePage">
      <div className="Body-Header">
        <h1 className='middle-text'>My Feed</h1>
        <div className='middle-line'></div>
      </div>
        <div className="in-line">
          <img className="ProfilePicture" src={user.picture} alt="profile"/> 
          <div className="column">
            <p> Name:   {user.name} </p>
            <p> Email:   {user.user_id} </p>
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