import React from 'react';
import logo from '../assets/D2MLogo.png';
import { GoogleLogin } from '@react-oauth/google';
import '../css/navigation.css';
import { useState } from 'react';


export default function Navigation() {

    const [username, setUsername] = useState("");

    // when users successfully login
    const responseMessage = (response) => {
      const idToken = response.credential;
      const encodedPayload = idToken.split('.')[1];
      const decodedPayload = JSON.parse(atob(encodedPayload));
      setUsername(decodedPayload.name); //doesn't get updated until outside responseMessage, for rendering page after
      const updated_name = decodedPayload.name;
      console.log("Hey, " + updated_name);
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
        <li><a href="/"><i className="fa-regular fa-user"></i></a></li>
        <li><a href="/"><i className="fa-regular fa-bell"></i></a></li>
       
        {/* using tutorial for GoogleLogin from: https://blog.logrocket.com/guide-adding-google-login-react-app/ */}
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="google-login-button" // Apply the CSS class here
/>
      

      </div>
    </nav>
  );
}

