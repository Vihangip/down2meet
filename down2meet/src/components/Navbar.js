
import { NavLink } from "react-router-dom";
import React from 'react';
import logo from '../assets/D2MLogo.png';
import logo1265 from '../assets/logo-notext.png';
import '../css/navigation.css';

import Logout from "./Logout";

export default function Navbar() {

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
                        exact="true"
                        to="/Home">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-house"></i>
                            </div>
                            <p>Home</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        exact="true"
                        to="/Profile">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <p>Profile</p>
                        </NavLink>
                        
                        <NavLink className="Social-Option"
                        exact="true"
                        to="/Friends">
                            <div className="Social-Icon">
                            <i className="fa-solid fa-user-group"></i>
                            </div>
                            <p>Friends</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        exact="true"
                        to="/Events">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-calendar-days"></i>
                            </div>
                            <p>Availability</p> 
                        </NavLink>
                
                        <NavLink className="Social-Option"
                        exact="true"
                        to="/Groups">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-people-group"></i>
                            </div>
                            <p>Groups</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        exact="true"
                        to="/Hangouts">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-map-marker"></i>
                            </div>
                            <p>Hangouts</p>
                        </NavLink>
                        </div>

            </div>
            <div className="botnav">
                <Logout />
            </div>
         </nav>
    );
}