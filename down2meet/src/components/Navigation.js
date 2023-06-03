import React from 'react';
import logo from '../assets/D2MLogo.png';

export default function Navigation() {
  return (
    <nav className="navbar">
      <a href="/" className="brand-logo">
      <img src={logo} alt="Logo" className="logo-image" />
      </a>
      <div className="navigation-menu"> 
        <li><a href="/"><i class="fa-regular fa-user"></i></a></li>
        <li><a href="/"><i class="fa-regular fa-bell"></i></a></li>
      </div>
    </nav>
  );
}

