import HangoutFeed from '../components/HangoutFeed';
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsersAsync } from '../redux/user/thunks';
import { getPostsAsync } from '../redux/posts/thunks';
import { getSessionUserAsync } from '../redux/user/thunks';
import { setUser } from '../redux/user/reducer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Hangouts() {

  const userAvailability = useSelector((state) => state.users.availability);
  const colorSwitch = () => {
    const primaryColor = '#32CD32';
    const secondaryColor = '#FF6347';
    document.documentElement.style.setProperty('--active-color', userAvailability === 'Busy' ? secondaryColor : primaryColor);
  };
  useEffect(() => {
    colorSwitch();
  }, [userAvailability]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Check if there is user data in local storage
        let storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
          await dispatch(getSessionUserAsync()); // Fetch user data if it's not in local storage
          storedUser = JSON.parse(localStorage.getItem('user'));
          if (!storedUser){
            navigate('/');
            return;
          }
        }
        await dispatch(getUsersAsync());
        await dispatch(getPostsAsync());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, [dispatch]);

  
  return (
  <>
    <div className="Body-Left">
      <Navbar />
    </div>
    <div className="Body-Middle">
    <div className="Home">
      <BodyHeader title={"My Accepted Hangouts"} />
        <HangoutFeed />
    </div>
    </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        </div>
      </>
  );
}

export default Hangouts;    