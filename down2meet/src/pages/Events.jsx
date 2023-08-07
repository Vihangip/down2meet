import BodyHeader from "../components/BodyHeader";
import React from 'react';
import Event from '../components/Event';
import {AddEvent} from "../components/addEvent";
import Calendar from '../components/Calendar';

import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSessionUserAsync } from '../redux/user/thunks';
import { setUser } from '../redux/user/reducer';
import { useSelector } from 'react-redux';

function Events() {
  const dispatch = useDispatch();
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
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
        await dispatch(getSessionUserAsync());
        // await dispatch(getPostsAsync());
        }
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
      <div className='Events'>
        <BodyHeader title={"Availability"}/>
        <div className="Events">
          <div><AddEvent/></div> 
        
          <div className="Calendar"> <Calendar/> </div> 
        <div className="Calendar"> <Event/> </div>

        </div>
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

export default Events;