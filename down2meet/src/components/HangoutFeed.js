import { getHangoutsAsync } from '../redux/user/thunks.js';
import Hangout from './Hangout.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function HangoutFeed() {
  const dispatch = useDispatch();
  useEffect(() => {
      const fetchPostsAndUsers = async () => {
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          await dispatch(getHangoutsAsync(storedUser.user_id));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchPostsAndUsers();
    }, [dispatch]);
    const hangoutList = useSelector((state) => (state.users.hangoutList));

    
    return (
        <div className="HangoutFeed">
            {hangoutList.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div>
            {hangoutList.map((hangoutID) => (
              <div key={hangoutID.indexOf(hangoutID)}>
                <Hangout hangout={hangoutID} /> 
              </div>
            ))}
            </div>
          )}
        </div>
    );
}