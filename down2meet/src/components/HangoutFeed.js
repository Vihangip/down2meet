import { getHangoutsAsync } from '../redux/user/thunks.js';
import Hangout from './Hangout.js';
import Post from './Post.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUpdateState } from '../redux/posts/reducer';
import { useNavigate } from 'react-router-dom';

export default function HangoutFeed() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const setUpdate = useSelector((state) => state.posts.setUpdate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      const fetchPostsAndUsers = async () => {
        try {
          await dispatch(getHangoutsAsync(storedUser.user_id));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      if (setUpdate) {
        //nothing to put in here, but it works
      } else if (!setUpdate){
        //nothing to put in here, but it works
      }
      fetchPostsAndUsers();
    }, [dispatch, setUpdate]);
    const hangoutList = useSelector((state) => (state.users.hangoutList));
    const posts = useSelector((state) => state.posts.postList);
    const filteredPosts = posts.filter((post) => hangoutList.includes(post.post_id));
    console.log(storedUser.user_id);
    console.log("HangoutFeed");
    console.log(hangoutList);
    console.log(filteredPosts);

  

    
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