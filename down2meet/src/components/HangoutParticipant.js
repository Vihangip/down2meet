import React from 'react';
import service from '../redux/user/service';
import { useState, useEffect } from 'react';
import blankpic from '../assets/blank_profile.jpeg';
import { Link } from 'react-router-dom';

const HangoutParticipant = ({ participant }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information when the component mounts
        const fetchUser = async () => {
          try {
            const userData = await service.getOneUser(participant);
            setUser(userData);
          } catch (error) {
            console.error("Error fetching user:", error.message);
          }
        };
    
        fetchUser();
        return () => {
          setUser(null);
        };
      }, [participant]);

      if (!user) {
        // Render a loading state or return null while user data is being fetched
        return <div>...</div>;
      }

    return (
      <Link to={`/user/${user.user_id}`}>
      <img className="Hangouts-Participants-Image" src={user.picture ? user.picture : blankpic} alt="" />
    </Link>
    )
}

export default HangoutParticipant;