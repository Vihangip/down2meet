
import UserView from "./UserView";
import service from '../redux/user/service';
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";

const AvailabilitySettings = ({onClose}) => {

  const [friends, setFriends] = useState([]);
  const [selectedApprovedFriends, setSelectedApprovedFriends] = useState([]);
  const [approvedFriends, setApprovedFriends] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userAvailability = useSelector((state) => state.users.availability);

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

    return (
        <>
        <div className="dialog-overlay">
            <div className="dialog-box">
              <span id="dialogClose" className="dialog-close" onClick={onClose}>&times;</span>
                <h2>Choose who you want to share your availability with</h2>
                {friends.map((friend) => (
                <div key={friend.id}>
                    <label className='AvailabilityFriend'>
                    <input
                        type="checkbox"
                        checked={selectedApprovedFriends.includes(friend)}
                        onChange={() =>
                        selectedApprovedFriends.includes(friend)
                            ? handleUnselectFriend(friend)
                            : handleSelectFriend(friend)
                        }
                    />
                    <UserView user={friend} />
                    </label>
                </div>
                ))}
                <button className='AvailabilityButton' onClick={handleSaveApprovedFriends}>Save</button>
                <h2>Friends that can see your availability</h2>
                <ul>
                    {approvedFriends.map((friend) => (
                    <UserView user={friend}/>
                    ))}
                </ul>
                <button className='AvailabilityButton' onClick={onClose}>Done</button>
            </div> 
        </div> 

        </>

            );      

};
export default AvailabilitySettings;