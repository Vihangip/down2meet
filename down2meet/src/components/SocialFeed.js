import Post from './Post.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsAsync } from '../redux/posts/thunks';

export default function SocialFeed() {
    const posts = useSelector((state) => (state.posts.postList));
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPostsAsync());
    }, [dispatch]);
    
    return (
        <div className="SocialFeed">
            {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div>
            {posts.map((post) => (
              <div>
                <Post post={post} /> 
              </div>
            ))}
            </div>
          )}
        </div>
    );
}