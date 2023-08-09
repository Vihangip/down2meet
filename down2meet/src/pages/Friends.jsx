import React from 'react';
import BodyHeader from '../components/BodyHeader';
import { useEffect } from 'react';
import { setUser } from '../redux/user/reducer';
import { useDispatch } from 'react-redux';
import { getSessionUserAsync } from '../redux/user/thunks';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useSelector } from 'react-redux';
import Friend from '../components/Friend';
import { useNavigate } from 'react-router-dom';


function Friends() {
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
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
    <div className="Body-Left">
      <Navbar />
    </div>
    <div className="Body-Middle">
      <div className="Friends">
        <BodyHeader title={"Friends"}/>
        <div className="FriendsPage">
              <Friend/>
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

export default Friends;

