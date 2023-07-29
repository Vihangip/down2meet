import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUserAsync } from '../redux/loginOut/thunks';
import { setUser } from '../redux/user/reducer';
import { getSessionUserAsync } from '../redux/user/thunks';



const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUserAsync());
    localStorage.removeItem('user');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
