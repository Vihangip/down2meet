import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { AddGroup } from '../components/addGroup';
import Groups from '../components/Groups';
import { getFriendsAsync, getSessionUserAsync } from '../redux/user/thunks';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user/reducer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Group() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const fetchUsers = async () => {
      try {
        let storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser));
        } else {
        await dispatch(getSessionUserAsync());
        storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser){
          navigate('/');
          return;
        }
        await dispatch(getFriendsAsync(JSON.parse(localStorage.getItem('user'))));
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
        <div className="Groups">
          <BodyHeader title={"Groups"} />
          <div><AddGroup/></div> 
          <div><Groups/></div>
        </div>
      </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        </div>
      </>
  );
}

export default Group;