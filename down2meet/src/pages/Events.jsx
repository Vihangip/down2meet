import React, { useState, useEffect } from 'react';
import service from '../redux/user/service';
import BodyHeader from "../components/BodyHeader";
import Event from '../components/Event';
import { AddEvent } from "../components/addEvent";
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';

function Events() {
  const [loading, setLoading] = useState(true);
  const [approvedFriends, setApprovedFriends] = useState([]);
  const [selectedApprovedFriends, setSelectedApprovedFriends] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendIDs = await service.getFriends(currentUser.user_id);
        console.log("Friend IDs:", friendIDs);
    
        const friendsPromises = friendIDs.map((friendID) => service.getOneUser(friendID));
        const friendsListData = await Promise.all(friendsPromises);
    
        console.log("Friend Details:", friendsListData);
        setApprovedFriends(friendsListData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error.message);
        setLoading(false);
      }
    };    

    fetchFriends();
  }, [currentUser.user_id]);

  const handleSelectFriend = (friend) => {
    setSelectedApprovedFriends([...selectedApprovedFriends, friend]);
  };

  const handleUnselectFriend = (friend) => {
    setSelectedApprovedFriends(selectedApprovedFriends.filter(f => f !== friend));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
        <div className='Events'>
          <BodyHeader title={"Availability"} />
          <h2>Choose who you want to share your availability with:</h2>
          {approvedFriends.map((friend) => (
      <div key={friend.id}>
        <label>
          <input
            type="checkbox"
            checked={selectedApprovedFriends.includes(friend)}
            onChange={() =>
              selectedApprovedFriends.includes(friend)
                ? handleUnselectFriend(friend)
                : handleSelectFriend(friend)
            }
          />
          {friend.name}
        </label>
      </div>
    ))}
          <div>
            <h2>Friends that can see your availability:</h2>
            <ul>
              {selectedApprovedFriends.map((friend) => (
                <li key={friend.id}>{friend.name}</li>
              ))}
            </ul>
          </div>
          <div><AddEvent /></div>
          <div className="Calendar"> <Calendar /> </div>
          <div className="Calendar"> <Event /> </div>
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

export default Events;
