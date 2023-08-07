import { getHangoutsAsync } from '../redux/user/thunks.js';
import Hangout from './Hangout.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HangoutFeed() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const hangoutList = useSelector((state) => (state.users.hangoutList));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
      const fetchPostsAndUsers = async () => {
        try {
          if (!storedUser){
            navigate('/');
            return;
          }
          await dispatch(getHangoutsAsync(storedUser.user_id));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchPostsAndUsers();
    }, [dispatch]);
    const posts = useSelector((state) => state.posts.postList);
    const filteredPosts = posts.filter((post) => hangoutList.includes(post.post_id));

  

    
    return (
        <div className="HangoutFeed">
            {filteredPosts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div>
            {filteredPosts.map((post) => (
              <div key={filteredPosts.indexOf(post)}>
                <Hangout post={post} /> 
              </div>
            ))}
            </div>
          )}
        </div>
    );
}