import SocialFeed from '../components/SocialFeed';
import { PostBar } from '../components/PostBar';
import BodyHeader from '../components/BodyHeader';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFriendsPostsAsync, getPostsAsync } from '../redux/posts/thunks';
import { getHangoutsAsync, getSessionUserAsync, getAvailabilityAsync } from '../redux/user/thunks';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { setUser } from '../redux/user/reducer';
import { useNavigate, Route, Routes } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { useSelector } from 'react-redux';



function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=> state.users.user);
  const userAvailability = useSelector((state) => state.users.availability);
  const colorSwitch = () => {
    const primaryColor = '#32CD32';
    const secondaryColor = '#FF6347';
    document.documentElement.style.setProperty('--active-color', userAvailability === 'Busy' ? secondaryColor : primaryColor);
  };
  useEffect(() => {
    colorSwitch();
  }, [userAvailability]);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
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
        await dispatch(getPostsAsync());
        await dispatch(getFriendsPostsAsync(storedUser.user_id));
        await dispatch(getHangoutsAsync(storedUser.user_id));
        await dispatch(getAvailabilityAsync(storedUser.user_id));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, [dispatch]);

  if (!user){
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
        <div className="Home">
          <BodyHeader title={"My Feed"} />
          <div className="Body-Middle">
            <PostBar />
            <SocialFeed />
            {/* Conditional rendering of UserProfile component */}
            <Routes>
              <Route
                path="/user/:userId"
                element={<UserProfile />}
              />
            </Routes>
          </div>
        </div>
      </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        </div>
      </>
    
  );
}

export default Home;