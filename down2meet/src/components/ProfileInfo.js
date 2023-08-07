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
  const user_id = useSelector(state => state.users.user.user_id);
  
  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Check if there is user data in local storage
        let storedUser = JSON.parse(localStorage.getItem('user'));
        //if (storedUser) {
        //   dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        //   console.log("local");
        //   console.log(storedUser);
        // } else {
        dispatch(getSessionUserAsync()); // Fetch user data if it's not in local storage
        //   storedUser = JSON.parse(localStorage.getItem('user'));
        //   setRenderedUser(storedUser);
        //   console.log("not in local");
        //   console.log(storedUser);

      //console.log("dispatching getSessionUserAsync to get user id")
        //setRenderedUser(editedUser);
          //if (!storedUser){
          //  navigate('/');
          //  return;
          //}
        //}
        //await dispatch(getUsersAsync());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, []);//editedUser]); 

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
    dispatch(setUser(editedUser));
    console.log(user);
    //refresh if necessary
  };

  return (
    <div className="ProfileInfo in-line">
      <img className="ProfilePicture" src={editedUser?.picture} alt="profile" /> {/* Use optional chaining to avoid errors if user is null */}
      <div className="column">
        <p> Name: {editedUser?.name} </p> {/* Use optional chaining to avoid errors if user is null */}
        <p> Email: {editedUser?.email} </p> {/* Use optional chaining to avoid errors if user is null */}
        <button onClick={() => handleEdit()}>Edit</button>
        {view==='Edit' && <EditView onClose={handleClose} user_id={editedUser.user_id}/>}     
      </div>
    </div>
  );
}
