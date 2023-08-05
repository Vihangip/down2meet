import React from 'react';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import landingimage from '../assets/landingimage.jpg';
import logo from '../assets/D2MLogo.png';
//require('dotenv').config();


export default function LoginPage() {

  const URL = `${process.env.REACT_APP_URL3001}`;

  const handleLogin = () => {

    window.location.href = `${process.env.REACT_APP_URL3001}/auth/google`;
  }

  return (
    <div className='LoginPage'>
      <img src={landingimage} alt="landingimage" className="landingimage" />

      <img src={logo} alt="logo" className="login-logo" />
      <button onClick={handleLogin} className='google-login-button-front'>Login with Google</button>
      
    </div>
        
  );
}
