import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setUser, addFriendAsync, removeFriendAsync } from '../redux/user/thunks';
import { useDispatch, useSelector } from 'react-redux';

export default function UserProfile() {
  const { userId } = useParams(); // get the userId from the URL
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.user); 

  // Loading check
  useEffect(() => {
    if (currentUser) {
        setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    // Only fetch the user's profile if userId is not undefined
    if (userId) {
      fetch(`http://localhost:3001/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserProfile(data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  // Use the loading state to conditionally render the UserProfile component
  if (loading) {
    return <div>Loading...</div>
  }

  if (!userProfile) {
    return null;
  }

  const addFriend = () => {
    dispatch(addFriendAsync({ userId: currentUser.user_id, friendId: userProfile.user_id }));
  };

  const removeFriend = () => {
    dispatch(removeFriendAsync({ userId: currentUser.user_id, friendId: userProfile.user_id }));
  };

  console.log("Current User:", currentUser);
  console.log("User Profile:", userProfile);

  return (
    <div className="UserProfile">
        <h1>{userProfile.name}</h1>
        <img src={userProfile.picture} alt={userProfile.name} />
        {currentUser && currentUser.friends && (currentUser.friends.includes(userProfile.user_id)
    ? <button className="deleteButton" onClick={removeFriend}>Delete Friend</button>
    : <button className="addButton" onClick={addFriend}>Add Friend</button>
)}
    </div>
  );
}
