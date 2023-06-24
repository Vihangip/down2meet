

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPostAsync } from '../redux/posts/thunks';

function PostBar() {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPostAsync({"name": "John Smith", "profilepic": "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png", "status": postContent}));
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

