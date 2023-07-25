import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../actions/actions';
import { addPostAsync } from '../redux/posts/thunks';
import { addUserPostAsync } from '../redux/user/thunks';
import { v4 as uuidv4 } from 'uuid';

function PostBar() {
  // const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState('');
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Everyone"); // Controls which group
  const user = useSelector((state) => state.users.user);

  console.log(user.picture);
  const handleSubmit = (e) => {
    const useruser = user;
    e.preventDefault();
    const randomUUID = uuidv4();
    const post = {
      post_id: randomUUID,
      name: useruser.name,
      user_id: useruser.user_id,
      profilepic: useruser.picture,
      status: postContent ? postContent : "Lets meet up!",
      time: time,
      date: date,
      location: location
    };
    console.log(post);
    dispatch(addPostAsync(post));
    // dispatch(addUserPostAsync(user.user_id, post.post_id));
    setPostContent('');
    setTime('');
    setDate('');
    setLocation('');
  };

  const handleTimeToggle = () => {
    setShowTimeInput(!showTimeInput);
  };

  const handleDateToggle = () => {
    setShowDateInput(!showDateInput);
  };

  const handleLocationToggle = () => {
    setShowLocationInput(!showLocationInput);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    if (selectedOption === option) {
      setSelectedOption('');
    } else {
      setSelectedOption(option);
    }
    setShowDropdown(false);
  };

  return (
    <div className="PostBar">
    {user && user.picture && (
      <img
        className="PostBar-Image"
        src={user.picture}
        alt="profile picture"
      />
    )}
      <form className="PostBar-Form" onSubmit={handleSubmit}>
        <div className="PostBar-PostContainer">
          <div className='PostBar-DropdownContainer'>
            <button type="button" className="PostBar-DropdownButton" onClick={handleDropdownToggle}>
              {selectedOption ? <div className='PostBar-DropdownText'>{selectedOption}<i class="fa-solid fa-arrow-right"></i></div> : <div className='PostBar-DropdownText'>Everyone<i class="fa-solid fa-arrow-right"></i></div>}
              
            </button>
            {showDropdown && (
              <div className="PostBar-Dropdown">
                <button type="button" className="PostBar-DropdownButtonSelect" onClick={() => handleOptionSelect('Everyone')}>
                  Everyone
                </button>
                <button type="button" className="PostBar-DropdownButtonSelect" onClick={() => handleOptionSelect('Group 1')}>
                  Group 1
                </button>
                <button type="button" className="PostBar-DropdownButtonSelect" onClick={() => handleOptionSelect('Group 2')}>
                  Group 2
                </button>
                {/* Add more options as needed */}
              </div>
            )}
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
            <button type="button" onClick={handleTimeToggle} className='PostBar-AdditionalInfo'>
              <i class="fa-regular fa-clock"></i>
            </button>
            {showTimeInput && (
              <input
                type="text"
                id="time"
                className="PostBar-InputBar"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onBlur={() => setShowTimeInput(false)}
                placeholder=" Enter a time to hang out!"
              />
            )}
            <button type="button" onClick={handleDateToggle} className='PostBar-AdditionalInfo'>
              <i class="fa-regular fa-calendar-days"></i>
            </button>
            {showDateInput && (
              <input
                type="date"
                id="date"
                className="PostBar-InputBar"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={() => setShowDateInput(false)}
                placeholder=" Enter the date you're free!"
              />
            )}
            <button type="button" onClick={handleLocationToggle} className='PostBar-AdditionalInfo'>
              <i class="fa-solid fa-location-dot"></i>
            </button>
            {showLocationInput && (
              <input
                type="text"
                id="location"
                className="PostBar-InputBar"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onBlur={() => setShowLocationInput(false)}
                placeholder=" Enter a location you'd want to go to!"
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

export default PostBar;