import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setUser } from '../redux/user/reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function UserProfile() {
  const { userId } = useParams(); // get the userId from the URL
  const [userProfile, setUserProfile] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.user);
  console.log("UserProfile");
  console.log(currentUser);

  useEffect(() => {
    // Only fetch the user's profile if userId is not undefined
    if (userId) {
      fetch(`https://down2meet.onrender.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserProfile(data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  useEffect(() => {
    console.log("UserProfile");
    console.log(currentUser);
    if (currentUser) {
      fetch(`https://down2meet.onrender.com/users/${currentUser.user_id}/friends`)
        .then((response) => response.json())
        .then((data) => setUserFriends(data))
        .catch((error) => console.error(error));
    }
  }, [currentUser]);

  const addFriend = async () => {
    const response = await fetch(`https://down2meet.onrender.com/users/${currentUser.user_id}/addFriend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId: userProfile.user_id })
    });
    const data = await response.json();
    dispatch(setUser(data)); // Use the setUser Redux action to update the current user
  };

  const removeFriend = async () => {
      const response = await fetch(`https://down2meet.onrender.com/users/${currentUser.user_id}/removeFriend`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ friendId: userProfile.user_id })
      });
      const data = await response.json();
      dispatch(setUser(data)); // Use the setUser Redux action to update the current user
  };

  if (!userProfile) {
    return null;
  }

  return (
    
    <div className="UserProfile">
        <h1>{userProfile.name}</h1>
        <img src={userProfile.picture} alt={userProfile.name} />
        {currentUser && userFriends.includes(userProfile.user_id)
            ? <button className="deleteButton" onClick={removeFriend}>Delete Friend</button>
            : <button className="addButton" onClick={addFriend}>Add Friend</button>
        }
    </div>
  );
}
