import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUserAsync } from '../redux/loginOut/thunks';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
