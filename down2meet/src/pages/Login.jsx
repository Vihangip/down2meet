import React from 'react';
import landingimage from '../assets/landingimage.jpg';
import logo from '../assets/D2MLogo.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      navigate('/Home');
    }
  }, [navigate]);

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