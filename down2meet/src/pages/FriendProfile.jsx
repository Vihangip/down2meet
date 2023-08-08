import React, { useEffect, useState } from 'react';
import BodyHeader from '../components/BodyHeader';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import Event from '../components/Event';
import { useDispatch } from 'react-redux';
import { getEventAsync } from '../redux/event/thunks';
import { useLocation } from 'react-router-dom';

function FriendProfile() {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const friendInfo = location?.state?.friendInfo;
  const [isApprovedFriend, setIsApprovedFriend] = useState(false);
  const dispatch = useDispatch();

  console.log(currentUser);
  const fetchFriendProfile = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${userId}/approvedfriends`);
      if (!response.ok) {
        throw new Error('Failed to fetch approved friends');
      }
      const approvedFriends = await response.json();
      console.log("approve", approvedFriends);
      console.log("current", currentUser.user_id )
      setIsApprovedFriend(approvedFriends.includes(currentUser.user_id));
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    if (friendInfo?.user_id) {
      dispatch(getEventAsync(friendInfo.user_id));
      fetchFriendProfile(friendInfo.user_id);
    }
  }, [friendInfo, dispatch]);

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