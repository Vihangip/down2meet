import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import service from '../redux/user/service';
import { useState, useEffect } from 'react';
import blankpic from '../assets/blank_profile.jpeg';
import { addParticipantToPost, deletePostAsync, removeParticipantFromPost } from '../redux/posts/thunks';
import { removeHangoutsForFriendsAsync
 } from '../redux/user/thunks';
const Post = ({ post }) => {
  const [user, setUser] = useState(null);
  const useruser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const [showuserPost, setuserPost] = useState(false);
  const [hasJoinedHangout, setHasJoinedHangout] = useState(post.participants.includes(useruser.user_id)); // State variable to track if the user has joined the hangout

  useEffect(() => {
    // Fetch user information when the component mounts
    const fetchUser = async () => {
      try {
        const userData = await service.getOneUser(post.user_id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
    if (useruser.user_id === post.user_id) {
      setuserPost(true);
    } else {
      setuserPost(false);
    }
    return () => {
      setUser(null);
    };
  }, [post.user_id]);

  const handleAccept = () => {
    dispatch(addParticipantToPost({ postID: post.post_id, userID: useruser.user_id }));
    setHasJoinedHangout(true);
  };

  const handleReject = () => {
    dispatch(removeParticipantFromPost({ postID: post.post_id, userID: useruser.user_id }));
    setHasJoinedHangout(false);
  };

  const handleDelete = () => {
    dispatch(removeHangoutsForFriendsAsync(post.post_id));
    dispatch(deletePostAsync(post.post_id));
    setHasJoinedHangout(false);
  };


    if (!user) {
      // Render a loading state or return null while user data is being fetched
      return <div>Loading...</div>;
    }

    return (
      <div className="Post">
        <img className="Post-UserInfo-Image" src={post.profilepic ? post.profilepic : blankpic} alt="" />
        <div className="Post-Container">
          <div key={post.id} className="Post-UserInfo">
            {user.availability ? 
            <p className='Post-Username-active'>{user.name}</p> : 
            <p className='Post-Username-inactive'>{user.name}</p>}
            {/* ADD THE TIME WHEN POST WAS POSTED */}
          </div>
          <p className='Post-Status'>{post.status ? post.status : " "}</p>

          {user.availability ? 
            <div className="Post-Invite-Info">
              {post.time ? 
                <div className="Post-Invite-InfoContainer-active">
                  <i class="fa-regular fa-clock"></i>
                  <p>{post.time}</p>
                </div>
              :
                <div className="Post-Invite-InfoContainer-dead">
                  <i class="fa-regular fa-clock"></i>
                </div>
              }
            {post.date ? 
                <div className="Post-Invite-InfoContainer-active">
                  <i class="fa-regular fa-calendar-days"></i>
                  <p>{post.date}</p>
                </div>
              :
                <div className="Post-Invite-InfoContainer-dead">
                  <i class="fa-regular fa-calendar-days"></i>
                </div>
              }
            {post.location ? 
                <div className="Post-Invite-InfoContainer-active">
                  <i class="fa-solid fa-location-dot"></i>
                  <p>{post.location}</p>
                </div>
              :
                <div className="Post-Invite-InfoContainer-dead">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
              }
              {/* { !showuserPost && (
            <div className="Post-InviteButtons-active">
              <button className="accept-button" onClick={handleAccept}>
                Join
              </button>
              <button className="reject-button" onClick={handleReject}>
                Leave
              </button>
            </div>
            )} */}
              {!showuserPost ?(
                <div className="Post-InviteButtons-active">
                  {!hasJoinedHangout && (
                  <button className="accept-button" onClick={handleAccept}>
                    Join
                  </button>
                  )}
                 {hasJoinedHangout && (
                  <button className="reject-button" onClick={handleReject}>
                    Leave
                  </button>
                  )}
                  
                </div>
              ):
              (
                <div className="Post-InviteButtons-active">
                <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
              </div>)}
          </div> 
          : 
          <div className="Post-Invite-Info">
          <div className="Post-Invite-InfoContainer-inactive">
            <i class="fa-regular fa-clock"></i>
            <p>{post.time}</p>
          </div>
          <div className="Post-Invite-InfoContainer-inactive">
            <i class="fa-regular fa-calendar-days"></i>
            <p>{post.date}</p>
          </div>
          <div className="Post-Invite-InfoContainer-inactive">
            <i class="fa-solid fa-location-dot"></i>
            <p>{post.location}</p>
          </div>
          {!showuserPost ?(
                <div className="Post-InviteButtons-inactive">
                  {!hasJoinedHangout && (
                  <button className="accept-button" onClick={handleAccept}>
                    Join
                  </button>
                  )}
                 {hasJoinedHangout && (
                  <button className="reject-button" onClick={handleReject}>
                    Leave
                  </button>
                  )}
                  
                </div>
              ):
              (
                <div className="Post-InviteButtons-active">
                <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
              </div>)}
        </div>
          }
          
        </div>
      </div>
    );
  };
  
  export default Post;
  