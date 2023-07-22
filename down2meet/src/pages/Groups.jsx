
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { AddGroup } from '../components/addGroup';
import Groups from '../components/Groups';

function Group() {
  return (
    <div className="Groups">
   <div><AddGroup/></div> 
   <div><Groups/></div>

    <BodyHeader />
      <div className="Groupspage">

      </div>
    </div>
  );
}

export default Group;