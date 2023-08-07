import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getOneUserAsync, getUsersAsync } from '../redux/user/thunks';
import { getEventAsync } from '../redux/event/thunks';
import { setUser } from '../redux/user/reducer';
import { getSessionUserAsync } from '../redux/user/thunks';
import { useSelector} from 'react-redux';
import EditView from '../components/EditView';
import { useNavigate } from 'react-router-dom';

export default function ProfileInfo() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const editedUser = useSelector(state => state.users.user);
  
  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        let storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
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
    fetchPostsAndUsers();
  }, [dispatch]);

  useEffect (() => {
    if (!user){
      navigate('/');
      return;
    }
  },[dispatch]);  

  const handleEdit = () => {
    setView('Edit');
  };

  const handleClose = async () => {
    console.log("handleClsoe")
    setView(null);
    console.log(user);
    //refresh if necessary
  };

  return (
    <div className="ProfileInfo in-line">
      <img className="ProfilePicture" src={user?.picture} alt="profile" /> {/* Use optional chaining to avoid errors if user is null */}
      <div className="column">
        <p> Name: {user?.name} </p> {/* Use optional chaining to avoid errors if user is null */}
        <p> Email: {user?.email} </p> {/* Use optional chaining to avoid errors if user is null */}
        <button className="Profile-Edit-Button" onClick={() => handleEdit()}>Edit</button>
        {view==='Edit' && <EditView onClose={handleClose} user_id={user?.user_id}/>}     
      </div>
    </div>
  );
}
