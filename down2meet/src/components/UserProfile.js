import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { userId } = useParams(); // get the userId from the URL
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Only fetch the user's profile if userId is not undefined
    if (userId) {
      fetch(`http://localhost:3001/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserProfile(data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  if (!userProfile) {
    return null;
  }

  return (
    <div>
      <h2>{userProfile.name}</h2>
      <img src={userProfile.picture} alt={userProfile.name} />
    </div>
  );
}
