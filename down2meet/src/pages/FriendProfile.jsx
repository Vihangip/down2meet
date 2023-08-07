import React, { useEffect, useState } from 'react';
import BodyHeader from '../components/BodyHeader';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import Event from '../components/Event';
import { useDispatch } from 'react-redux';
import { getEventAsync } from '../redux/event/thunks';
import { useLocation, useNavigate } from 'react-router-dom';

function FriendProfile() {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const friendInfo = location?.state?.friendInfo;
  const [isApprovedFriend, setIsApprovedFriend] = useState(false);

  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getEventAsync(friendInfo.user_id));          //////////////////////// 
  },[dispatch]);  

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
        <div className="ProfilePage">
          <BodyHeader title={"Friend's Profile"} />
          <div className="in-line">
            <img className="ProfilePicture" src={friendInfo.picture} alt="profile" />
            <div className="column">
              <p> Name: {friendInfo.name} </p>
              <p> Email: {friendInfo.email} </p>
            </div>
          </div>
          <h3> Schedule</h3>
          {isApprovedFriend ? (
            <div> <Event formLocation="profile" /> </div>
          ) : (
            <div> No availability to show </div>
          )}
        </div>
      </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        {/* <ActiveUsers /> */}
      </div>
    </>
  );
}

export default FriendProfile;
