import React, { useState, useEffect } from 'react';
import service from '../redux/user/service';
import BodyHeader from "../components/BodyHeader";
import Event from '../components/Event';
import { AddEvent } from "../components/addEvent";
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useSelector } from 'react-redux';
import UserView from '../components/UserView';
import SetAvailability from '../components/SetAvailability';
import AvailabilitySettings from '../components/AvailabilitySettings';

function Events() {
  const [friends, setFriends] = useState([]);
  const [selectedApprovedFriends, setSelectedApprovedFriends] = useState([]);
  const [approvedFriends, setApprovedFriends] = useState([]);
  const [viewSettings, setViewSettings] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userAvailability = useSelector((state) => state.users.availability);
  const [view, setView] = useState(null);

  const colorSwitch = () => {
    const primaryColor = '#32CD32';
    const secondaryColor = '#FF6347';
    document.documentElement.style.setProperty('--active-color', userAvailability === 'Busy' ? secondaryColor : primaryColor);
  };
  
  useEffect(() => {
    colorSwitch();
  }, [userAvailability]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendIDs = await service.getFriends(currentUser.user_id);
        const friendsPromises = friendIDs.map((friendID) => service.getOneUser(friendID));
        const friendsListData = await Promise.all(friendsPromises);
        setFriends(friendsListData);
      } catch (error) {
        console.error("Error fetching friends:", error.message);
      }
    };    

    fetchFriends();
    loadApprovedFriends();
  }, [currentUser.user_id]);

  const handleSelectFriend = (friend) => {
    if (!selectedApprovedFriends.includes(friend.user_id)) {
      setSelectedApprovedFriends([...selectedApprovedFriends, friend]);
    }
  };

  const handleUnselectFriend = (friend) => {
    setSelectedApprovedFriends(selectedApprovedFriends.filter(f => f !== friend));
  };

  const handleSaveApprovedFriends = async () => {
    try {
      const friendsIds = selectedApprovedFriends.map(friend => friend.user_id);
      await service.saveApprovedFriends(currentUser.user_id, friendsIds);
      loadApprovedFriends();
    } catch (error) {
      console.error('Error saving approved friends:', error.message);

    }
  };

  const loadApprovedFriends = async () => {
    try {
      const friendsIds = await service.getApprovedFriends(currentUser.user_id);
      const friendsPromises = friendsIds.map((friendID) => service.getUserByUserId(friendID));
      const approvedFriendsNames = await Promise.all(friendsPromises);
      setApprovedFriends(approvedFriendsNames);
    } catch (error) {
      console.error('Error saving approved friends:', error.message);
    }
  }

  const handleAvailabilitySettings = () => {
    setView("AvailabilitySettings");
  };

  const handleSetAvailability = (friends) => {
    setView("SetAvailability");
  };

  const handleClose = async () => {
    setView(null);
  };

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
        <div className='Events'>
          <BodyHeader title={"Availability"} />
          <div className='AvailabilityButtons'>

            <button className='AvailabilityButton2' onClick={() => handleAvailabilitySettings()}>Availability Settings</button>
            <button className='AvailabilityButton2' onClick={() => handleSetAvailability()}>Set Availability</button>
            <div> <Calendar /> </div>
          </div>
            <div className='middle-line'></div>

          <div > <Event /> </div>

        </div>
      </div>
      {view==='AvailabilitySettings' && <AvailabilitySettings onClose={handleClose} />}   
      {view==='SetAvailability' && <SetAvailability onClose={handleClose} />}   
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
      </div>
    </>
  );
}

export default Events;