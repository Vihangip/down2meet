import './App.css';
import SocialGroups from './components/Navbar';
import Navigation from './components/Navigation';
import ButtonAvailable from './components/ButtonAvailable';
import SocialFeed from './components/SocialFeed';
import ActiveUsers from './components/ActiveUsers';
import PostBar from './components/PostBar';
import SearchBar from './components/SearchBar';
import React from 'react';
import Event from './components/Event';
import {store} from './redux/store';
import { userData } from './tests/usersData';





/////////////////////  THIS FILE IS NOT USED, USE INDEX.JS
function App() {
  return (

 
    <div className="App">
      <div className="Body">
        <div className="Body-Left">
        </div>
        <div className="Body-Middle">
          <PostBar />
          <SocialFeed />
          <Event/>
        </div>
        <div className="Body-Right">
          <ButtonAvailable />
          <SearchBar />
          <ActiveUsers friends={userData}/>
        </div>
      </div>
    </div>
  );
}

export default App;
