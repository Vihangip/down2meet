import React from 'react';
import logo from '../assets/D2MLogo.png';
import { GoogleLogin } from '@react-oauth/google';

export default function Navigation() {
    // when users successfully login
    const responseMessage = (response) => {
      console.log(response);
    };
    // when users don't successfully login
    const errorMessage = (error) => {
      console.log(error);
    };
  return (
    <nav className="navbar">
      <a href="/" className="brand-logo">
      <img src={logo} alt="Logo" className="logo-image" />
      </a>
      <div className="navigation-menu"> 
        <li><a href="/"><i class="fa-regular fa-user"></i></a></li>
        <li><a href="/"><i class="fa-regular fa-bell"></i></a></li>
       
        {/* using tutorial for GoogleLogin from: https://blog.logrocket.com/guide-adding-google-login-react-app/ */}
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />


      </div>
    </nav>
  );
}

