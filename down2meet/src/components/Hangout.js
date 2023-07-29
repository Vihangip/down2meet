import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';

const Hangout = ({ hangoutID }) => {
    const postList = useSelector((state) => state.posts.postList);
    console.log(hangoutID);
    const post = postList.find((post) => post.post_id === hangoutID);

    if (!post) {
        // Render a loading state or return null while user data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <div className='HangoutCard'>
            <Post post={post}/>
        </div>
    )
  
}
 export default Hangout;
  