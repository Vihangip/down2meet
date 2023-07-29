import Post from './Post.js';
import { useSelector } from 'react-redux';

export default function SocialFeed() {

  const posts = useSelector((state) => (state.posts.postList));

    
  return (
        <div className="SocialFeed">
            {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div>
            {posts.map((post) => (
              <div key={posts.indexOf(post)}>
                <Post post={post} /> 
              </div>
            ))}
            </div>
          )}
        </div>
    );
}