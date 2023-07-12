import { NavLink } from "react-router-dom";
import React from 'react';
import logo from '../assets/D2MLogo.png';
import { GoogleLogin } from '@react-oauth/google';
import '../css/navigation.css';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../actions/actions';
import { addUsersAsync, getOneUserAsync } from '../redux/user/thunks';


export default function Navbar() {
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
        user_id: email,
        name: name,
        picture: picture,
        friends: [],
        groups: [],
        events: [],
        availability: "busy",
      }

      dispatch(getOneUserAsync(email));
      dispatch(updateUserProfile(user));
      //console.log(response);
    };
    // when users don't successfully login
    const errorMessage = (error) => {
      console.log(error);
    };

    

    return (
        <nav className="Navbar">
            <a href="/" className="brand-logo">
                <img src={logo} alt="Logo" className="logo-image" />
            </a>

            <div className="Navbar-line">
            </div>

            <div className="Navbar-Links">
            <NavLink className="Social-Option"
            activeClassName="Social-Option-Active"
            exact
            to="/">
                <div className="Social-Icon">
                    <i className="fa-solid fa-house"></i>
                </div>
                <p>Home</p>
            </NavLink>

            <NavLink className="Social-Option"
            activeClassName="Social-Option-Active"
            exact
            to="/Profile">
                <div className="Social-Icon">
                    <i className="fa-solid fa-user"></i>
                </div>
                <p>Profile</p>
            </NavLink>
            
            <NavLink className="Social-Option"
            activeClassName="Social-Option-Active"
            exact
            to="/Friends">
                <div className="Social-Icon">
                <i class="fa-solid fa-user-group"></i>
                </div>
                <p>Friends</p>
            </NavLink>

            <NavLink className="Social-Option"
            activeClassName="Social-Option-Active"
            exact
            to="/Events">
                <div className="Social-Icon">
                    <i className="fa-solid fa-calendar-days"></i>
                </div>
                <p>Events</p> 
            </NavLink>
      
            <NavLink className="Social-Option"
            activeClassName="Social-Option-Active"
            exact
            to="/Groups">
                <div className="Social-Icon">
                    <i className="fa-solid fa-people-group"></i>
                </div>
                <p>Groups</p>
            </NavLink>

            <NavLink className="Social-Option"
            activeClassName="Social-Option-Active"
            exact
            to="">
                <div className="Social-Icon">
                    <i className="fa-solid fa-bell"></i>
                </div>
                <p>Notifications</p>
            </NavLink>
            </div>

       
            {/* using tutorial for GoogleLogin from: https://blog.logrocket.com/guide-adding-google-login-react-app/ */}
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="google-login-button"/>
        </nav>
    );
}