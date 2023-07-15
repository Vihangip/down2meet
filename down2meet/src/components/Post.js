import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Post = ({ post }) => {
  // const user = useSelector((state) => state.users.user);

    const dispatch = useDispatch();

    const handleAccept = () => {
    // Handle accept logic
    // ...
    };

    const handleReject = () => {
    // Handle reject logic
    // ...

    };

    return (
      <div className="Post">
          <div key={post.id} className="Post-UserInfo">
            <img className="Post-UserInfo-Image" src={post.profilepic} alt="" />
            <p>{post.name}</p>
            <p>{post.availability ? 'available' : 'busy'}</p>
          </div>
        <div className="Post-Content">
          <p>{post.status}</p>
          <br></br>
          <p>
            Meet at {post.location} on {post.date} at {post.time}
          </p>
          <div>
            <button className="accept-button" onClick={handleAccept}>
              Accept
            </button>
            <button className="reject-button" onClick={handleReject}>
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Post;
  