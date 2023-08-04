import SocialFeed from '../components/SocialFeed';
import PostBar from '../components/PostBar';
import BodyHeader from '../components/BodyHeader';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFriendsPostsAsync, getPostsAsync } from '../redux/posts/thunks';
import { getSessionUserAsync } from '../redux/user/thunks';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import ActiveUsers from '../components/ActiveUsers';
import { setUser } from '../redux/user/reducer';
import { useNavigate, Route, Routes } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { useSelector } from 'react-redux';



function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setUpdate = useSelector((state) => state.posts.setUpdate);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        let storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
          await dispatch(getSessionUserAsync()); // Fetch user data if it's not in local storage
          storedUser = JSON.parse(localStorage.getItem('user'));
        }
        await dispatch(getPostsAsync());
        await dispatch(getFriendsPostsAsync(storedUser.user_id));
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

  const handleUserProfileClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to the UserProfile component with the selected userId
  };

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
        {/* <ActiveUsers />  */}
        </div>
      </>
    
  );
}

export default Home;