
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
//import ProfileSchedule from '../components/ProfileSchedule';
//import Availability from '../components/Availability';

import { getUsersAsync } from '../redux/user/thunks';
import Event from '../components/Event';
// import Calendar from '../components/Calendar';



function Profile() {

  const user = useSelector(state => state.reducer.user);

  // todo: remove this img const later
  //const picture = "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60";


  //there's a problem with HTTP GET picture right now
  return (
    <div className="ProfilePage">
      <BodyHeader />
        <div className="in-line">
          
          {/*<img className="ProfilePicture" src={user.picture} alt="profile"/>   */}
          <div className="column">
            <p> Name:   {user.name} </p> 
            <p> Email:   {user.user_id} </p>

          </div>
        </div>
        <h3> Schedule</h3>
       
        <div > <Event formLocation="profile"/> </div>


       {/* <div className="Calendar"> <Availability/> </div> */}

    </div>
  );
}

export default Profile;