import React from 'react';
import logo from '../assets/D2MLogo.png';
import { GoogleLogin } from '@react-oauth/google';
import '../css/navigation.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../actions/actions';

// UNUSED //

export default function Navigation() {

    const dispatch = useDispatch();

    // when users successfully login
    const responseMessage = (response) => {
      const idToken = response.credential;
      const encodedPayload = idToken.split('.')[1];
      const decodedPayload = JSON.parse(atob(encodedPayload));

      const name = decodedPayload.name;
      const email = decodedPayload.email;
      const picture = decodedPayload.picture;

      console.log("Hey, " + name);

      const user = {
        name: name,
        email: email,
        picture: picture
      }
      dispatch(updateUserProfile(user));
      //console.log(response);
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
        <NavLink className="navigation-logo" to="/Profile">
                <i className="fa-regular fa-user"></i>
        </NavLink>
        <NavLink className="navigation-logo" to="">
                <i className="fa-regular fa-bell"></i>
        </NavLink>
       
        {/* using tutorial for GoogleLogin from: https://blog.logrocket.com/guide-adding-google-login-react-app/ */}
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="google-login-button" // Apply the CSS class here
/>
      

      </div>
    </nav>
  );
}

