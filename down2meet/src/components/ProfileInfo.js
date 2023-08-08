import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setUser } from '../redux/user/reducer';
import { getSessionUserAsync } from '../redux/user/thunks';
import EditView from '../components/EditView';
import { useNavigate } from 'react-router-dom';

export default function ProfileInfo() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    const fetchPostsAndUsers = async () => {
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
    setView(null);
  };

  return (
    <div className="ProfileInfo in-line">
      <img className="ProfilePicture" src={user?.picture} alt="profile" />
      <div className="column">
        <p> Name: {user?.name} </p> 
        <p> Email: {user?.email} </p>
        <button className="Profile-Edit-Button" onClick={() => handleEdit()}>Edit</button>
        {view==='Edit' && <EditView onClose={handleClose} user_id={user?.user_id}/>}     
      </div>
    </div>
  );
}
