import React from 'react';
import { useNavigate } from "react-router-dom";


const UserView = ({user}) => {
    const navigate = useNavigate(); 
    const handleProfileClick = (friendInfo) => {
        navigate('/FriendProfile', { state: { friendInfo } });
      };
    return (
        <div className="UserView"
        onClick={() => handleProfileClick({ user_id: user.user_id, 
        picture: user.picture, name: user.name, email: user.email })}>
            <img src={user.picture} alt="user" />
            {user.availability === "Available" ? 
            <h2 className="UserViewNameActive">{user.name}</h2> : 
            <h2 className="UserViewNameInactive">{user.name}</h2>}
        </div>
    )
}

export default UserView;