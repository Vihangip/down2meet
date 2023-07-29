import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsersAsync } from '../redux/user/thunks';
import { getEventAsync } from '../redux/event/thunks';
import Event from '../components/Event';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import ProfileInfo from '../components/ProfileInfo';
import { setUser } from '../redux/user/reducer';
import { getSessionUserAsync } from '../redux/user/thunks';
import { useSelector } from 'react-redux';


function Profile() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Check if there is user data in local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
          await dispatch(getSessionUserAsync()); // Fetch user data if it's not in local storage
        }
        await dispatch(getUsersAsync());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, [dispatch]); 

  const user = useSelector(state => state.users.user);
  // useEffect(() => {
  //   dispatch(getSessionUserAsync());
  //  }, [dispatch]);

  console.log("profile");
  console.log(user);

  useEffect (() => {
    dispatch(getEventAsync(user.user_id));          //////////////////////// 
  },[dispatch]);  

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
      <div className="ProfilePage">
        <BodyHeader title={"Profile"}/>
          <ProfileInfo />
          <h3> Schedule</h3>
        
          <div > <Event formLocation="profile"/> </div>


        {/* <div className="Calendar"> <Availability/> </div> */}
      </div>
      </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        {/* <ActiveUsers /> */}
        </div>
      </>
  );
}

export default Profile;