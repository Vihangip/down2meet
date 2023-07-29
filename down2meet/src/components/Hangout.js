import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import service from '../redux/user/service';
import { useState, useEffect } from 'react';
import blankpic from '../assets/blank_profile.jpeg';
import { addParticipantToPost, removeParticipantFromPost } from '../redux/posts/thunks';

const Hangout = ({ hangoutID }) => {
    const post = useSelector((state) => state.posts.postList);
    
    console.log(post);

    if (!post[0]) {
        // Render a loading state or return null while user data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <div>Stuff</div>
    )
  
}
 export default Hangout;
  