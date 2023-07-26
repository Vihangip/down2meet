import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../assets/D2MLogo.png";
import logo1265 from "../assets/logo-notext.png";
import { GoogleLogin } from "@react-oauth/google";
import "../css/navigation.css";
import { useDispatch} from "react-redux";
import { getOneUserAsync } from "../redux/user/thunks";
import Logout from "./Logout";

export default function Navbar() {
  const dispatch = useDispatch();

  // when users successfully login
  const responseMessage = async (response) => {
    const idToken = response.credential;
    const encodedPayload = idToken.split(".")[1];
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
      availability: false,
    };


    dispatch(getOneUserAsync(email));
  };


  // when users don't successfully login
  const errorMessage = (error) => {
    console.log(error);
    // Show the pop-up when there's an error
  };



    return (
        <nav className="Navbar">
            <div className="topnav">
                        <a href="/Home" className="brand-logo">
                            <img src={logo} alt="Logo" className="logo-image" />
                        </a>
                        <a href="/Home" className="brand-logo2">
                            <img src={logo1265} alt="Logo" className="logo-image2" />
                        </a>
                        

                        <div className="Navbar-line">
                        </div>

                        <div className="Navbar-Links">
                        <NavLink className="Social-Option"
                        activeClassName="Social-Option-Active"
                        exact
                        to="/Home">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-house"></i>
                            </div>
                            <p>Home</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        activeclassname="Social-Option-Active"
                        exact="true"
                        to="/Profile">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <p>Profile</p>
                        </NavLink>
                        
                        <NavLink className="Social-Option"
                        activeclassname="Social-Option-Active"
                        exact="true"
                        to="/Friends">
                            <div className="Social-Icon">
                            <i class="fa-solid fa-user-group"></i>
                            </div>
                            <p>Friends</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        activeclassname="Social-Option-Active"
                        exact="true"
                        to="/Events">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-calendar-days"></i>
                            </div>
                            <p>Events</p> 
                        </NavLink>
                
                        <NavLink className="Social-Option"
                        activeclassname="Social-Option-Active"
                        exact="true"
                        to="/Groups">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-people-group"></i>
                            </div>
                            <p>Groups</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        activeclassname="Social-Option-Active"
                        exact="true"
                        to="">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-bell"></i>
                            </div>
                            <p>Notifications</p>
                        </NavLink>
                        </div>

                            {/* Pop-up */}

            </div>
            <div className="botnav">
                <Logout />
                {/* using tutorial for GoogleLogin from: https://blog.logrocket.com/guide-adding-google-login-react-app/ */}
                {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="google-login-button"/> */}
            </div>
         </nav>
    );
}