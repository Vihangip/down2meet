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

  // Load approved friends from localStorage on mount
  useEffect(() => {
    const storedApprovedFriends = JSON.parse(localStorage.getItem('approvedFriends'));
    if (storedApprovedFriends) {
      setSelectedApprovedFriends(storedApprovedFriends);
    }
  }, []);

  // Save approved friends to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('approvedFriends', JSON.stringify(selectedApprovedFriends));
  }, [selectedApprovedFriends]);

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
    console.log('Selecting friend:', friend);
    if (!selectedApprovedFriends.includes(friend.user_id)) {
      setSelectedApprovedFriends([...selectedApprovedFriends, friend]);
    }
  };

  const handleUnselectFriend = (friend) => {
    console.log('Unselecting friend:', friend);
    setSelectedApprovedFriends(selectedApprovedFriends.filter(f => f !== friend));
  };

  const handleSaveApprovedFriends = async () => {
    try {
      console.log('Saving friends:', selectedApprovedFriends);
      // Mapping selectedApprovedFriends to extract friend IDs
      const friendsIds = selectedApprovedFriends.map(friend => friend.user_id);

      // Debugging output to see the IDs being sent
      console.log("Saving approved friends with IDs:", friendsIds);

      // Save the selected approved friends to the database
      await service.saveApprovedFriends(currentUser.user_id, friendsIds);
    } catch (error) {
      console.error('Error saving approved friends:', error.message);

    }
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
          <button onClick={handleSaveApprovedFriends}>Save</button>
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
