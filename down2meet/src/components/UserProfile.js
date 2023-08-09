import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setUser } from '../redux/user/reducer';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar.js';
import ButtonAvailable from './ButtonAvailable.js';
import Search from './Search';
import service from '../redux/user/service';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [friendAdded, setFriendAdded] = useState([]); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const addFriend = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${currentUser.user_id}/addFriend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId: userProfile.user_id })
    });
    const data = await response.json();
    dispatch(setUser(data));
    setFriendAdded(true);
  };

  const removeFriend = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${currentUser.user_id}/removeFriend`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ friendId: userProfile.user_id })
      });
      const data = await response.json();
      dispatch(setUser(data));
      setFriendAdded(false);
  };

  useEffect(() => {
    const fetchFriends = async() => {
      try {
        const friendListData = await service.getFriends(currentUser.user_id);
        setUserFriends(friendListData);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await service.getOneUser(userId);
        setUserProfile(userData);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    if (friendAdded) {
    } else if (!friendAdded){}
      fetchFriends();
      fetchUser();

  }, [userId, currentUser.user_id, friendAdded]);

  useEffect(() => {   
  }, []);

  const handleProfileClick = (friendInfo) => {
    navigate('/FriendProfile', { state: { friendInfo } });   
  };


  if (!userProfile) {
    return null;
  }

  return (
<>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
      <div className="UserProfile">
          <h1>{userProfile.name}</h1>
          <img src={userProfile.picture} alt={userProfile.name} />
          <br></br>
          {currentUser && userFriends.includes(userProfile.user_id) && (
            <button className="addButton" onClick={() => handleProfileClick(userProfile)}>See Profile</button>
          )}
          <br></br>
          {currentUser && userFriends.includes(userProfile.user_id)
              ? <button className="deleteButton" onClick={removeFriend}>Delete Friend</button>
              : <button className="addButton" onClick={addFriend}>Add Friend</button>
          }
      </div>
      </div>
    <div className="Body-Right">
    <ButtonAvailable />
    <Search />
    </div>
  </>
  );
}
