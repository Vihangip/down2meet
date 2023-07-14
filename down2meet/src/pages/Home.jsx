import SocialFeed from '../components/SocialFeed';
import PostBar from '../components/PostBar';
import React from 'react';


function Home() {
  return (
    <div className="Home">
      <div className="Body-Header">
        <h1 className='middle-text'>My Feed</h1>
        <div className='middle-line'></div>
      </div>
        <div className="Body-Middle">
          <PostBar />
          <SocialFeed />
        </div>
    </div>
  );
}

export default Home;