import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../actions/actions';

function PostBar() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      name: 'John Smith',
      profilepic:
        'https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png',
      status: postContent,
      time,
      date,
      location,
    };
    dispatch(addPost(post));
    setPostContent('');
    setTime('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="PostBar">
      <img
        className="PostBar-Image"
        src="https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png"
        alt=""
      />
      <form className="PostBar-Form" onSubmit={handleSubmit}>
        <div className="PostBar-InputContainer">
          <label htmlFor="postContent" className="PostBar-InputLabel">
            Post Content
          </label>
          <input
            type="text"
            id="postContent"
            className="PostBar-InputBar"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder=" Enter your post"
          />
        </div>
        <div className="PostBar-InputContainer">
          <label htmlFor="time" className="PostBar-InputLabel">
            Time
          </label>
          <input
            type="text"
            id="time"
            className="PostBar-InputBar"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder=" Enter the time"
          />
        </div>
        <div className="PostBar-InputContainer">
          <label htmlFor="date" className="PostBar-InputLabel">
            Date
          </label>
          <input
            type="text"
            id="date"
            className="PostBar-InputBar"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder=" Enter the date"
          />
        </div>
        <div className="PostBar-InputContainer">
          <label htmlFor="location" className="PostBar-InputLabel">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="PostBar-InputBar"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder=" Enter the location"
          />
        </div>
        <div>
          <button className="PostBar-Button" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostBar;
