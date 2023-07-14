import SocialFeed from '../components/SocialFeed';
import PostBar from '../components/PostBar';
import React from 'react';


function Home() {

  return (
    <div className="Home">
      <div className="Page-Header">
        <button className='Menu-Popup'><i class="fa-solid fa-bars"></i></button>
        <h1 className='middle-text'>My Feed</h1>
      </div>
        <div className='middle-line'></div>
        <div className="Body-Middle">
          <PostBar />
          <SocialFeed />
        </div>
    </div>
  );
}

export default Home;