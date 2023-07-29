
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
import { getSessionUserAsync } from '../redux/user/thunks';

import { getUsersAsync } from '../redux/user/thunks';
import { useLocation } from 'react-router-dom';

import Event from '../components/Event';

function FriendProfile() {

  const location = useLocation();
  const friendInfo = location?.state?.friendInfo;

  console.log("friend's profile");

  return (
    <div className="ProfilePage">
      <BodyHeader title={"Friend's Profile"}/>
        <div className="in-line">
          
          
          <img className="ProfilePicture" src={friendInfo.picture} alt="profile"/>   
          <div className="column">
            <p> Name:   {friendInfo.name} </p> 
            <p> ID: {friendInfo.user_id} </p>

          </div>
        </div>
        <h3> Schedule</h3>
       
        <div > <Event formLocation="profile"/> </div>

    </div>

  );
}

export default FriendProfile;