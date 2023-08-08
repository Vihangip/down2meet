import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import service from '../redux/user/service';
import { useState, useEffect } from 'react';
import blankpic from '../assets/blank_profile.jpeg';
import { addParticipantToPost, removeParticipantFromPost } from '../redux/user/thunks';
import { deletePostAsync } from '../redux/posts/thunks';
import { removeHangoutsForFriendsAsync} from '../redux/user/thunks';
import { addEventAsync, deleteEventAsync, getEventAsync, removeEventParticipant } from '../redux/event/thunks';
import { handleCreateEvent } from './Calendar'

export const postEvent = {
  title: '',
  description: '',
  startingDate: new Date(),
  endingDate: new Date(),
};

export const Post = ({ post }) => {
  const [user, setUser] = useState(null);
  const useruser = JSON.parse(localStorage.getItem('user'));
  const hangoutList = useSelector((state) => state.users.hangoutList);
  const dispatch = useDispatch();
  const [showuserPost, setuserPost] = useState(false);
  const [hasJoinedHangout, setHasJoinedHangout] = useState(hangoutList.includes(post.post_id));
  const calendarSignedIn= useSelector(state => state.reducer.googleCalendar);

  useEffect(() => {
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
    if (hangoutList.includes(post.post_id)){
      setHasJoinedHangout(true);
    } else {
      setHasJoinedHangout(false);
    }
    return () => {
      setUser(null);
    };
  }, [post.user_id]);

  useEffect (() => {
    dispatch(getEventAsync(useruser.user_id));        
  },[dispatch]);

  const handleAccept = () => {
    dispatch(addParticipantToPost({ postID: post.post_id, userID: useruser.user_id }));
    setHasJoinedHangout(true);
    handleAddEvent();
  };

  const handleReject = () => {
    dispatch(removeParticipantFromPost({ postID: post.post_id, userID: useruser.user_id }));
    setHasJoinedHangout(false);
    dispatch(removeEventParticipant({ eventID: post.post_id, userID: useruser.user_id }));
  };

  const handleDelete = () => {
    dispatch(removeHangoutsForFriendsAsync(post.post_id));
    dispatch(deletePostAsync(post.post_id));
    setHasJoinedHangout(false);
    dispatch(deleteEventAsync(post.post_id));
  };

  const handleAddEvent = () => {    
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Vancouver',
    };
    const unformattedStartDate = new Date(
      post.date + 'T' + post.start
    );
    const unformattedEndDate = new Date(
      post.date + 'T' + post.end
    );

    const vancouverStartDate = new Intl.DateTimeFormat('en-US', options).format(unformattedStartDate);
    const vancouverEndDate = new Intl.DateTimeFormat('en-US', options).format(unformattedEndDate);

    const formattedStartDate = new Date(vancouverStartDate);
    const formattedEndDate = new Date(vancouverEndDate);

    const new_event = {
      "id": post.post_id, 
      "email": useruser.email,
      "userID": useruser.user_id,
      "user_id": useruser.user_id,
      "title": "down2meet",
      "description": post.status, 
      "start": formattedStartDate, 
      "end": formattedEndDate,
      "groups": post.participants
    };
    dispatch(addEventAsync(new_event));

    if (calendarSignedIn === true) {
      postEvent.title = "down2meet";
      postEvent.description = post.status;
      postEvent.startingDate = formattedStartDate;
      postEvent.endingDate = formattedEndDate;
      handleCreateEvent({origin: "Post"});
    }

  }

    if (!user) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Post">
       <img className="Post-UserInfo-Image" src={user.picture ? user.picture : blankpic} alt="" />
        <div className="Post-Container">
          <div key={post.id} className="Post-UserInfo">
            {user.availability ? 
            <p className='Post-Username-active'>{user.name}</p> : 
            <p className='Post-Username-inactive'>{user.name}</p>}
          </div>
          <p className='Post-Status'>{post.status ? post.status : " "}</p>

          {user.availability ? 
            <div className="Post-Invite-Info">
              {post.time ? 
                <div className="Post-Invite-InfoContainer-active">
                  <i className="fa-regular fa-clock"></i>
                  <p>{post.time}</p>
                </div>
              :
                <div className="Post-Invite-InfoContainer-dead">
                  <i className="fa-regular fa-clock"></i>
                </div>
              }
            {post.date ? 
                <div className="Post-Invite-InfoContainer-active">
                  <i className="fa-regular fa-calendar-days"></i>
                  <p>{post.date}</p>
                </div>
              :
                <div className="Post-Invite-InfoContainer-dead">
                  <i className="fa-regular fa-calendar-days"></i>
                </div>
              }
            {post.location ? 
                <div className="Post-Invite-InfoContainer-active">
                  <i className="fa-solid fa-location-dot"></i>
                  <p>{post.location}</p>
                </div>
              :
                <div className="Post-Invite-InfoContainer-dead">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
              }
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
            <i className="fa-regular fa-clock"></i>
            <p>{post.time}</p>
          </div>
          <div className="Post-Invite-InfoContainer-inactive">
            <i className="fa-regular fa-calendar-days"></i>
            <p>{post.date}</p>
          </div>
          <div className="Post-Invite-InfoContainer-inactive">
            <i className="fa-solid fa-location-dot"></i>
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
  

  