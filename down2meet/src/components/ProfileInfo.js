import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUsersAsync } from '../redux/user/thunks';
import { getEventAsync } from '../redux/event/thunks';
import { setUser } from '../redux/user/reducer';
import { getSessionUserAsync } from '../redux/user/thunks';
import { useSelector} from 'react-redux';
import EditView from '../components/EditView';

export default function ProfileInfo() {

  const dispatch = useDispatch();
  const [view, setView] = useState(null);
  
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

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect (() => {
    dispatch(getEventAsync(user.user_id));          //////////////////////// 
  },[dispatch]);  

  const handleEdit = (id) => {
    setView('Edit');
  };

  const handleClose = () => {
    setView(null);
    //refresh if necessary
  };


  return (
    <div className="ProfileInfo in-line">
      <img className="ProfilePicture" src={user?.picture} alt="profile" /> {/* Use optional chaining to avoid errors if user is null */}
      <div className="column">
        <p> Name: {user?.name} </p> {/* Use optional chaining to avoid errors if user is null */}
        <p> Email: {user?.email} </p> {/* Use optional chaining to avoid errors if user is null */}
        <button className="Profile-Edit-Button" onClick={() => handleEdit()}>Edit</button>
        {view==='Edit' && <EditView onClose={handleClose} />}     
      </div>
    </div>
  );
}
