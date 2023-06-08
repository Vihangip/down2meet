import Post from './Post.js';
import { useSelector } from 'react-redux';

export default function SocialFeed() {
    const posts = useSelector((state) => (state.posts));
    
    return (
        <div>
            {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div>
            {posts.map((post, index) => (
              <div key={index}>
                <Post post={post} /> 
              </div>
            ))}
            </div>
          )}
        </div>
    );
}