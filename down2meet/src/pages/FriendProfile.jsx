
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
import { getSessionUserAsync } from '../redux/user/thunks';

import { getUsersAsync } from '../redux/user/thunks';
import Event from '../components/Event';

function FriendProfile({name, profilepic, friendID, availability}) {

  console.log("friend's profile");
  console.log(name);

  return (
    <div className="ProfilePage">
      <BodyHeader title={"Profile"}/>
        <div className="in-line">
          
          
          <img className="ProfilePicture" src={profilepic} alt="profile"/>   
          <div className="column">
            <p> Name:   {name} </p> 
            <p> ID: {friendID} </p>
            <p> Availability:   {availability} </p> 

          </div>
        </div>
        <h3> Schedule</h3>
       
        <div > <Event formLocation="profile"/> </div>

    </div>

  );
}

export default FriendProfile;