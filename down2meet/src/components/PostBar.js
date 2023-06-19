

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import addPost from '../actions/actions';

function PostBar() {
  const posts = useSelector((state) => (state.posts));
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({"name": "John Smith", "profilepic": "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png", "status": postContent}));
    setPostContent('');
  };

  return (
    <div className="PostBar">
        <img className="PostBar-Image" src="https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png" alt=""></img>
      <form className="PostBar-Form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="PostBar-InputBar"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Enter your post"
        />
        <button className="PostBar-Button" type="submit">Post</button>
      </form>
      
    </div>
  );
}

export default PostBar;

