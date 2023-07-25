import SocialFeed from '../components/SocialFeed';
import PostBar from '../components/PostBar';
import BodyHeader from '../components/BodyHeader';
import React from 'react';


function Home() {
  return (
    <div className="Home">
      <BodyHeader title={"My Feed"} />
        <div className="Body-Middle">
          <PostBar />
          <SocialFeed />
        </div>
    </div>
  );
}

export default Home;    