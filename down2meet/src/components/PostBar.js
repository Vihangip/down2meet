import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPostAsync } from '../redux/posts/thunks';
import { addEventAsync } from '../redux/event/thunks';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { addParticipantToPost } from '../redux/user/thunks';
import { handleCreateEvent } from './Calendar'

export const postbarEvent = {
  title: '',
  description: '',
  startingDate: new Date(),
  endingDate: new Date(),
};

export function PostBar() {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState('');
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [time, setTime] = useState('');
  const [time2, setTime2] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption] = useState("Everyone"); // Controls which group
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const calendarSignedIn= useSelector(state => state.reducer.googleCalendar);


  const handleSubmit = (e) => {
    if (user=== null){
      navigate('/');
    }
    const useruser = user;
    e.preventDefault();
    const randomUUID = uuidv4();
    const post = {
      post_id: randomUUID,
      name: useruser.name,
      user_id: useruser.user_id,
      profilepic: useruser.picture,
      status: postContent ? postContent : "Lets meet up!",
      time: time + " - " + time2,
      start: time, 
      end: time2, 
      date: date,
      location: location,
      viewers: [],
      participants: [],
    };
    dispatch(addPostAsync(post));
    dispatch(addParticipantToPost({ postID: post.post_id, userID: useruser.user_id }));
    
    if (time && time2 && date) {
      handleAddEvent(post);
    }
    
    setPostContent('');
    setTime('');
    setTime2('');
    setDate('');
    setLocation('');

  };

  const handleAddEvent = (post) => {
    const useruser = user;
    
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
      date + 'T' + time
    );

    const unformattedEndDate = new Date(
      date + 'T' + time2
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
      "description": postContent ? postContent : "Lets meet up!",  
      "start": formattedStartDate, 
      "end": formattedEndDate,
      "groups": []
    };
    dispatch(addEventAsync(new_event));

    if (calendarSignedIn === true) {
      postbarEvent.title = "down2meet";
      postbarEvent.description = post.status;
      postbarEvent.startingDate = formattedStartDate;
      postbarEvent.endingDate = formattedEndDate;
      handleCreateEvent({origin: "PostBar"});
    }

  }

  const handleDateToggle = () => {
    setShowDateInput(!showDateInput);
    setShowTimeInput(false);
    setShowLocationInput(false);
  };

  const handleTimeToggle = () => {
    setShowTimeInput(!showTimeInput);
    setShowDateInput(false);
    setShowLocationInput(false);
  };

  const handleLocationToggle = () => {
    setShowLocationInput(!showLocationInput);
    setShowDateInput(false);
    setShowTimeInput(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="PostBar">
    {user && user.picture && (
      <img
        className="PostBar-Image"
        src={user.picture}
        alt={user.name}
      />
    )}
      <form className="PostBar-Form" onSubmit={handleSubmit}>
        <div className="PostBar-PostContainer">
          <div className='PostBar-DropdownContainer'>
            <button type="button" className="PostBar-DropdownButton" onClick={handleDropdownToggle}>
              {selectedOption ? <div className='PostBar-DropdownText'>{selectedOption}</div> : <div className='PostBar-DropdownText'>Everyone</div>}
            </button>
          </div>
          <input
            type="text"
            id="postContent"
            className="PostBar-PostInput"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Lets meet up!"
          />
        </div>
        
        <div className='PostBar-BottomPost'>
          <div className="PostBar-IconContainer">
            <button type="button" onClick={handleDateToggle} className='PostBar-AdditionalInfo'>
              <i class="fa-regular fa-calendar-days"></i>
            </button>
            {showDateInput && (
              <input
                type="date"
                id="date"
                className="PostBar-InputBar "
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={() => setShowDateInput(false)}
                placeholder=" Enter the date you're free!"
              />
            )}
            <button type="button" onClick={handleTimeToggle} className='PostBar-AdditionalInfo'>
              <i className="fa-regular fa-clock"></i>
            </button>
            {showTimeInput && (
              <>
                <input
                  type="time"
                  id="time"
                  className="PostBar-InputBar PostBar-SmallTimeInput"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder=" Enter a time to hang out!"
                />
                <p> - </p>
                <input
                  type="time"
                  id="time2"
                  className="PostBar-InputBar PostBar-SmallTimeInput"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  onBlur={() => setShowTimeInput(false)}
                  placeholder=" Enter an end time!"
                />
              </>
            )}
            
            <button type="button" onClick={handleLocationToggle} className='PostBar-AdditionalInfo'>
              <i className="fa-solid fa-location-dot"></i>
            </button>
            {showLocationInput && (
              <input
                type="text"
                id="location"
                className="PostBar-InputBar"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onBlur={() => setShowLocationInput(false)}
                placeholder=" Add a location "
              />
            )} 
            </div>
            <button className="PostBar-Button" type="submit">
              Post
            </button>
        </div>
      </form>
    </div>
  );
}

